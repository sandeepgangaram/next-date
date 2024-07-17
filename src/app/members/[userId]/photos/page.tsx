import { getMemberPhotosByUserId } from "@/src/actions/memberActions";
import MemberPhotos from "@/src/components/MemberPhotos";
import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import React from "react";

const PhotosPage = async ({ params }: { params: { userId: string } }) => {
  const photos = await getMemberPhotosByUserId(params.userId);

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotos photos={photos} />
      </CardBody>
    </>
  );
};

export default PhotosPage;
