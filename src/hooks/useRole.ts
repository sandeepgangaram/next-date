"use client";
import { useSession } from "next-auth/react";

const useRole = () => {
  const session = useSession();

  return session.data?.user.role;
};

export default useRole;
