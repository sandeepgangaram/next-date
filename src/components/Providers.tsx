"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { usePresenceChannel } from "../hooks/usePresenceChannel";
import { useNotificationChannel } from "../hooks/useNotificationChannel";

const Providers = ({
  userId,
  children,
}: {
  userId: string | null;
  children: ReactNode;
}) => {
  usePresenceChannel();
  useNotificationChannel(userId);
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
