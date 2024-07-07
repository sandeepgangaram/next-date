import { getAuthUserIdFromSession } from "@/src/actions/authActions";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/src/actions/memberActions";
import DeleteButton from "@/src/components/DeleteButton";
import StarButton from "@/src/components/StarButton";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberImage from "@/src/components/MemberImage";
import MemberPhotos from "@/src/components/MemberPhotos";

const EditMemberPhotos = async () => {
  const userId = await getAuthUserIdFromSession();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="text-2xl font-semibold text-secondary">
          Update Photos
        </div>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotos photos={photos} editing mainImageUrl={member?.image} />
      </CardBody>
    </>
  );
};

export default EditMemberPhotos;
