"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { usePresenceChannel } from "../hooks/usePresenceChannel";

const Providers = ({ children }: { children: ReactNode }) => {
  usePresenceChannel();
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
