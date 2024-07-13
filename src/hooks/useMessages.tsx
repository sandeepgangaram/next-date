import { useRouter, useSearchParams } from "next/navigation";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import { MessageDto } from "../types";
import {
  deleteMessage,
  getMessageByContainer,
} from "../actions/messageActions";
import useMessageStore from "./useMessageStore";

export const useMessages = (
  initialMessages: MessageDto[],
  nextCursor?: string
) => {
  const cursorRef = useRef(nextCursor);
  const { messages, set, remove, updateReadCount, resetMessages } =
    useMessageStore((state) => ({
      set: state.set,
      remove: state.remove,
      updateReadCount: state.updateUnreadCount,
      resetMessages: state.resetMessages,
      messages: state.messages,
    }));
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOutBox = searchParams.get("container") === "outbox";
  const container = searchParams.get("container");
  const [isDeleting, setIsDeleting] = useState({
    id: "",
    loading: false,
  });
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    set(initialMessages);
    cursorRef.current = nextCursor;

    return () => {
      resetMessages();
    };
  }, [initialMessages, set, resetMessages, nextCursor]);

  const loadMore = useCallback(async () => {
    if (cursorRef.current) {
      setLoadingMore(true);
      const { messages, nextCursor } = await getMessageByContainer(
        container,
        cursorRef.current
      );

      set(messages);
      cursorRef.current = nextCursor;
      setLoadingMore(false);
    }
  }, [container, set]);

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
      remove(message.id);
      if (!message.dateRead) {
        updateReadCount(-1);
      }
      setIsDeleting({ id: "", loading: false });
    },
    [isOutBox, remove, updateReadCount]
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
    loadMore,
    loadingMore,
    hasMore: !!cursorRef.current,
  };
};
