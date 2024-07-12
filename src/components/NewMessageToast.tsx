import React from "react";
import { MessageDto } from "../types";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { transformImageUrl } from "../actions/util";
import { toast } from "react-toastify";
import { Member } from "@prisma/client";

interface Props {
  href: string;
  image?: string | null;
  notificationMessage: string;
  notificationClickLabel: string;
}
const NewNotificationToast = ({
  href,
  image,
  notificationMessage,
  notificationClickLabel,
}: Props) => {
  return (
    <Link href={href} className="flex items-center">
      <div className="mr-2">
        <Image
          src={transformImageUrl(image) || "/images/user.png"}
          height={50}
          width={50}
          alt="Sender image"
        />
      </div>
      <div className="flex flex-grow flex-col justify-center">
        <div className="font-semibold">{notificationMessage}</div>
        <div className="text-sm">{notificationClickLabel}</div>
      </div>
    </Link>
  );
};

export const newMessageToast = (message: MessageDto) => {
  return toast(
    <NewNotificationToast
      href={`/members/${message.senderId}/chat`}
      image={message.senderImage}
      notificationMessage={`${message.senderName} sent you a message`}
      notificationClickLabel="Click to view"
    />
  );
};

export const newLikeToast = (
  name: string,
  userId: string,
  image?: string | null
) => {
  return toast(
    <NewNotificationToast
      href={`/members/${userId}`}
      image={image}
      notificationMessage={`You have been liked by${name}`}
      notificationClickLabel="Click to view their profile"
    />
  );
};
