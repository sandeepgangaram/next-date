"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { MessageDto } from "@/src/types";
import { pusherClient } from "@/src/lib/pusher";
import { formatShortDateTime } from "@/src/actions/util";
import { Channel } from "pusher-js";

interface Props {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
}
const MessageList = ({ initialMessages, currentUserId, chatId }: Props) => {
  const channelRef = useRef<Channel | null>(null);
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
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(chatId);
      channelRef.current.bind("message:new", handleNewMessage);
      channelRef.current.bind("messages:read", handleReadMessages);
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind("message:new", handleNewMessage);
        channelRef.current.unbind("messages:read", handleReadMessages);
      }
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
