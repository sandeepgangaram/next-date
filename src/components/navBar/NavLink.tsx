"use client";

import useMessageStore from "@/src/hooks/useMessageStore";
import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  href: string;
  label: string;
}
const NavLink = ({ href, label }: Props) => {
  const path = usePathname();
  const { unreadCount } = useMessageStore((state) => ({
    unreadCount: state.unreadCount,
  }));
  return (
    <NavbarItem isActive={path === href} as={Link} href={href}>
      <span>{label}</span>
      {href === "/messages" && unreadCount > 0 && (
        <span className="ml-1">({unreadCount})</span>
      )}
    </NavbarItem>
  );
};

export default NavLink;
