import React from "react";
import MessageSidebar from "./MessageSidebar";
import { getMessageByContainer } from "@/src/actions/messageActions";
import MessageTable from "./MessageTable";

const Messages = async ({
  searchParams,
}: {
  searchParams: { container: string };
}) => {
  const { messages, nextCursor } = await getMessageByContainer(
    searchParams.container
  );
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSidebar />
      </div>
      <div className="col-span-10">
        <MessageTable initialMessages={messages} nextCursor={nextCursor} />
      </div>
    </div>
  );
};

export default Messages;
