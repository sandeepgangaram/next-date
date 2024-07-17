"use client";
import { toggleLikeMember } from "@/src/actions/likeActions";
import { calculateAge, transformImageUrl } from "@/src/actions/util";
import LikeButton from "@/src/components/LikeButton";
import PresenceDot from "@/src/components/PresenceDot";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  member: Member;
  likeIds: string[];
}
const MemberCard = ({ member, likeIds }: Props) => {
  const [hasLiked, setHasLiked] = useState(likeIds.includes(member.userId));
  const [loading, setLoading] = useState(false);

  const preventLikeAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  async function toggleLike() {
    setLoading(true);
    try {
      await toggleLikeMember(member.userId, hasLiked);
      setHasLiked(!hasLiked);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
      <Image
        isZoomed
        alt={member.name}
        width={300}
        src={transformImageUrl(member.image) || "/images/user.png"}
        className="aspect-square object-cover"
      />
      <div onClick={preventLikeAction}>
        <div className="absolute top-3 right-3 z-50">
          <LikeButton
            loading={loading}
            toggleLike={toggleLike}
            hasLiked={hasLiked}
          />
        </div>
        <div className="absolute top-2 left-3 z-50">
          <PresenceDot member={member} />
        </div>
      </div>
      <CardFooter className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
