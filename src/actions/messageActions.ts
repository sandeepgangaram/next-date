"use server";

import { MessageSchema, messageSchema } from "../lib/schemas/messageSchema";
import { ActionResult, MessageDto } from "../types";
import { getAuthUserIdFromSession } from "./authActions";
import { prisma } from "../lib/prisma";
import { mapMessageToMessageDto } from "../lib/mappings";
import { pusherServer } from "../lib/pusher";
import { createChatId } from "./util";

export async function createMessage(
  recipientId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserIdFromSession();
    const validated = messageSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const message = await prisma.message.create({
      data: {
        text: validated.data.text,
        recipientId: recipientId,
        senderId: userId,
      },
      select: messageSelect,
    });

    const messageDto = mapMessageToMessageDto(message);

    await pusherServer.trigger(
      createChatId(userId, recipientId),
      "message:new",
      messageDto
    );

    await pusherServer.trigger(
      `private-${recipientId}`,
      "message:new",
      messageDto
    );

    return { status: "success", data: messageDto };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserIdFromSession();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: messageSelect,
    });

    if (messages.length > 0) {
      const readMessageIds = messages
        .filter(
          (m) =>
            m.dateRead === null &&
            m.recipient?.userId === userId &&
            m.sender?.userId === recipientId
        )
        .map((m) => m.id);

      await prisma.message.updateMany({
        where: {
          id: { in: readMessageIds },
        },
        data: { dateRead: new Date() },
      });

      await pusherServer.trigger(
        createChatId(recipientId, userId),
        "messages:read",
        readMessageIds
      );
    }

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMessageByContainer(container: string) {
  try {
    const userId = await getAuthUserIdFromSession();

    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };
    const messages = await prisma.message.findMany({
      where: conditions,
      orderBy: {
        created: "desc",
      },
      select: messageSelect,
    });

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";

  try {
    const userId = await getAuthUserIdFromSession();

    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const messageSelect = {
  id: true,
  text: true,
  created: true,
  dateRead: true,
  sender: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
};
