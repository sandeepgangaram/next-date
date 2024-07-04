import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";

const ChatPage = () => {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Chat
      </CardHeader>
      <Divider />
      <CardBody>Chats Go here</CardBody>
    </>
  );
};

export default ChatPage;
