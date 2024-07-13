"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { usePresenceChannel } from "../hooks/usePresenceChannel";
import { useNotificationChannel } from "../hooks/useNotificationChannel";
import useMessageStore from "../hooks/useMessageStore";
import { getUnreadMessageCount } from "../actions/messageActions";

const Providers = ({
  userId,
  children,
}: {
  userId: string | null;
  children: ReactNode;
}) => {
  const isUnreadCountSet = useRef(false);
  const { updateUnreadCount } = useMessageStore((state) => ({
    updateUnreadCount: state.updateUnreadCount,
  }));

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });

      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId]);

  usePresenceChannel(userId);
  useNotificationChannel(userId);
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
