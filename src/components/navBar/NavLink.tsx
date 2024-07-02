"use client";

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
  return (
    <NavbarItem isActive={path === href} as={Link} href={href}>
      {label}
    </NavbarItem>
  );
};

export default NavLink;
