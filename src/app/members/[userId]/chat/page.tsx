import CardInnerWrapper from "@/src/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/src/actions/messageActions";
import { getAuthUserIdFromSession } from "@/src/actions/authActions";
import MessageList from "./MessageList";
import { createChatId } from "@/src/actions/util";

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const currentUserId = await getAuthUserIdFromSession();
  const messages = await getMessageThread(params.userId);
  const chatId = createChatId(currentUserId, params.userId);

  return (
    <CardInnerWrapper
      header="Chats"
      body={
        <MessageList
          initialMessages={messages}
          currentUserId={currentUserId}
          chatId={chatId}
        />
      }
      footer={<ChatForm />}
    />
  );
};

export default ChatPage;
