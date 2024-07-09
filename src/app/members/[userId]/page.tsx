import { getMemberByUserId } from "@/src/actions/memberActions";
import CardInnerWrapper from "@/src/components/CardInnerWrapper";
import { notFound } from "next/navigation";
import React from "react";

const MemberDetailPage = async ({ params }: { params: { userId: string } }) => {
  const member = await getMemberByUserId(params.userId);

  if (!member) return notFound();

  return (
    <CardInnerWrapper header="Profile" body={<div>{member.description}</div>} />
  );
};

export default MemberDetailPage;
