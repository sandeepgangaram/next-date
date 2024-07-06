import { getAuthUserIdFromSession } from "@/src/actions/authActions";
import { getMemberByUserId } from "@/src/actions/memberActions";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React from "react";
import EditForm from "./EditForm";

const MemberEditPage = async () => {
  const userId = await getAuthUserIdFromSession();
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
};

export default MemberEditPage;
