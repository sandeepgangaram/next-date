"use client";
import React, { useCallback, useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { MessageDto } from "@/src/types";
import { pusherClient } from "@/src/lib/pusher";
import { formatShortDateTime } from "@/src/actions/util";

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

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prev) =>
      prev.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: formatShortDateTime(new Date()) }
          : message
      )
    );
  }, []);
  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMessage);
    channel.bind("messages:read", handleReadMessages);

    return () => {
      channel.unsubscribe();
      channel.unbind("message:new", handleNewMessage);
      channel.unbind("messages:read", handleReadMessages);
    };
  }, [chatId, handleNewMessage, handleReadMessages]);

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
