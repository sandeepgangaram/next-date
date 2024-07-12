import { useRouter, useSearchParams } from "next/navigation";
import { Key, useCallback, useEffect, useState } from "react";
import { MessageDto } from "../types";
import { deleteMessage } from "../actions/messageActions";
import useMessageStore from "./useMessageStore";

export const useMessages = (initialMessages: MessageDto[]) => {
  const { messages, set, remove } = useMessageStore((state) => ({
    set: state.set,
    remove: state.remove,
    messages: state.messages,
  }));
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOutBox = searchParams.get("container") === "outbox";
  const [isDeleting, setIsDeleting] = useState({
    id: "",
    loading: false,
  });

  useEffect(() => {
    set(initialMessages);

    return () => {
      set([]);
    };
  }, [initialMessages, set]);

  const columns = [
    {
      key: isOutBox ? "recipientName" : "senderName",
      label: isOutBox ? "Recipient" : "Sender",
    },
    { key: "text", label: "Message" },
    { key: "created", label: isOutBox ? "Date sent" : "Date received" },
    { key: "actions", label: "Actions" },
  ];

  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setIsDeleting({ id: message.id, loading: true });
      await deleteMessage(message.id, isOutBox);
      router.refresh();
      setIsDeleting({ id: "", loading: false });
    },
    [isOutBox, router]
  );

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutBox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;

    router.push(url + "/chat");
  };

  return {
    isOutBox,
    columns,
    isDeleting,
    messages,
    deleteMessage: handleDeleteMessage,
    selectRow: handleRowSelect,
  };
};
