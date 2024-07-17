"use client";

import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

interface Props {
  loading: boolean;
  hasLiked: boolean;
  toggleLike: () => void;
}
const LikeButton = ({ loading, hasLiked, toggleLike }: Props) => {
  return (
    <>
      {loading ? (
        <PiSpinnerGap size={32} className="fill-white animate-spin" />
      ) : (
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
      )}
    </>
  );
};

export default LikeButton;
