import { getAuthUserIdFromSession } from "@/src/actions/authActions";
import { getMemberPhotosByUserId } from "@/src/actions/memberActions";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const EditMemberPhotos = async () => {
  const userId = await getAuthUserIdFromSession();
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Update Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id} className="relative">
                <Image
                  width={220}
                  height={220}
                  src={photo.url}
                  alt="Image of user"
                />
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
};

export default EditMemberPhotos;
