"use client";

import { timeAgo, transformImageUrl } from "@/src/actions/util";
import PresenceAvatar from "@/src/components/PresenceAvatar";
import { MessageDto } from "@/src/types";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";

interface Props {
  message: MessageDto;
  currentUserId: string;
}
const MessageBox = ({ message, currentUserId }: Props) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageEndRef]);

  const isCurrentUserSender = message.senderId === currentUserId;

  const renderAvatar = () => (
    <div className="self-end">
      <PresenceAvatar
        userId={message.senderId}
        src={transformImageUrl(message.senderImage) || "/images/user.png"}
      />
    </div>
  );

  const renderMessageHeader = () => (
    <div
      className={clsx("flex items-center w-full", {
        "justify-between": isCurrentUserSender,
      })}
    >
      {message.dateRead && message.recipientId !== currentUserId ? (
        <span className="text-xs text-black text-italic">
          Read {timeAgo(message.dateRead)}
        </span>
      ) : (
        <div></div>
      )}
      <div className="flex">
        <span className="text-sm font-semibold text-gray-900">
          {message.senderName}
        </span>
        <span className="text-sm text-gray-500 ml-2">{message.created}</span>
      </div>
    </div>
  );

  const messageContentClasses = clsx("flex flex-col w-[50%] px-2 py-1", {
    "rounded-l-xl rounded-tr-xl text-white bg-blue-100": isCurrentUserSender,
    "rounded-r-xl rounded-tl-xl border-grap-200 bg-green-100":
      !isCurrentUserSender,
  });

  const renderMessageContent = () => (
    <div className={messageContentClasses}>
      {renderMessageHeader()}
      <p className="text-sm py-3 text-gray-900">{message.text}</p>
    </div>
  );
  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageBox;
