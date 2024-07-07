"use server";

import { Member, Photo } from "@prisma/client";
import {
  MemberEditSchema,
  memberEditSchema,
} from "../lib/schemas/memberEditSchema";
import { ActionResult } from "../types";
import { getAuthUserIdFromSession } from "./authActions";
import { prisma } from "../lib/prisma";

export async function updateMemberProfile(
  data: MemberEditSchema
): Promise<ActionResult<Member>> {
  try {
    const userId = await getAuthUserIdFromSession();

    const validated = memberEditSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, description, city, country } = validated.data;

    const member = await prisma.member.update({
      where: {
        userId,
      },
      data: {
        name,
        description,
        city,
        country,
      },
    });

    return { status: "success", data: member };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong!" };
  }
}

export async function addImage(url: string, publicId: string) {
  try {
    const userId = await getAuthUserIdFromSession();

    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          create: [
            {
              url,
              publicId,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function setMainImage(photo: Photo) {
  try {
    const userId = await getAuthUserIdFromSession();

    await prisma.user.update({
      where: { id: userId },
      data: { image: photo.url },
    });

    await prisma.member.update({
      where: { userId },
      data: { image: photo.url },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
