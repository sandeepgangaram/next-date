"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { toggleLikeMember } from "../actions/likeActions";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  targetId: string;
  hasLiked: boolean;
}
const LikeButton = ({ targetId, hasLiked }: Props) => {
  const router = useRouter();

  async function toggleLike() {
    console.log("on heart click");
    await toggleLikeMember(targetId, hasLiked);
    router.refresh();
  }
  return (
    <div
      onClick={toggleLike}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-2[px]"
      />
      <AiFillHeart
        size={24}
        className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default LikeButton;
