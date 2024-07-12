import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";
import { pusherClient } from "../lib/pusher";
import { usePathname, useSearchParams } from "next/navigation";
import useMessageStore from "./useMessageStore";
import { MessageDto } from "../types";
import { newLikeToast, newMessageToast } from "../components/NewMessageToast";
import { Member } from "@prisma/client";

export const useNotificationChannel = (userId: string | null) => {
  const channelRef = useRef<Channel | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { add, updateUnreadCount } = useMessageStore((state) => ({
    add: state.add,
    updateUnreadCount: state.updateUnreadCount,
  }));

  const handleNewMessage = useCallback(
    (message: MessageDto) => {
      if (
        pathname === "/messages" &&
        searchParams.get("container") === "inbox"
      ) {
        add(message);
        updateUnreadCount(1);
      } else if (pathname !== `/members/${message.senderId}/chat`) {
        newMessageToast(message);
        updateUnreadCount(1);
      }
    },
    [add, updateUnreadCount, pathname, searchParams]
  );

  const handleNewLike = useCallback(
    ({
      name,
      image,
      userId,
    }: {
      name: string;
      image: string | null;
      userId: string;
    }) => {
      newLikeToast(name, userId, image);
    },
    []
  );

  useEffect(() => {
    if (!userId) return;

    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`);

      channelRef.current.bind("message:new", handleNewMessage);
      channelRef.current.bind("like:new", handleNewLike);
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind("message:new", handleNewMessage);
        channelRef.current = null;
      }
    };
  }, [userId, handleNewMessage, handleNewLike]);
};
