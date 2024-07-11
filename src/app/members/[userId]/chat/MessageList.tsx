"use client";
import React, { useCallback, useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { MessageDto } from "@/src/types";
import { pusherClient } from "@/src/lib/pusher";

interface Props {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
}
const MessageList = ({ initialMessages, currentUserId, chatId }: Props) => {
  const [messages, setMessages] = useState(initialMessages);

  const handleNewMessage = useCallback((newMessage: MessageDto) => {
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMessage);

    return () => {
      channel.unsubscribe();
      channel.unbind("message:new", handleNewMessage);
    };
  }, [chatId, handleNewMessage]);

  return (
    <>
      {messages.length === 0 ? (
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
      )}
    </>
  );
};

export default MessageList;
