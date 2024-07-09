import CardInnerWrapper from "@/src/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/src/actions/messageActions";
import MessageBox from "./MessageBox";
import { getAuthUserIdFromSession } from "@/src/actions/authActions";

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const currentUserId = await getAuthUserIdFromSession();
  const messages = await getMessageThread(params.userId);

  const body =
    messages.length === 0 ? (
      "No messages to display"
    ) : (
      <div>
        {messages.map((message) => (
          <MessageBox
            key={message.id}
            message={message}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    );
  return <CardInnerWrapper header="Chats" body={body} footer={<ChatForm />} />;
};

export default ChatPage;
