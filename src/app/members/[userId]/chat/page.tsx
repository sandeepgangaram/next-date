"use client";

import CardInnerWrapper from "@/src/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";

const ChatPage = () => {
  return (
    <CardInnerWrapper
      header="Chats"
      body={<div>Chats go here</div>}
      footer={<ChatForm />}
    />
  );
};

export default ChatPage;
