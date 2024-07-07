import { getAuthUserIdFromSession } from "@/src/actions/authActions";
import { getMemberPhotosByUserId } from "@/src/actions/memberActions";
import DeleteButton from "@/src/components/DeleteButton";
import StarButton from "@/src/components/StarButton";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberImage from "@/src/components/MemberImage";

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
        <MemberPhotoUpload />
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id} className="relative">
                <MemberImage photo={photo} />
                <div className="absolute top-3 left-3 z-50">
                  <StarButton selected={false} loading={false} />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
};

export default EditMemberPhotos;
