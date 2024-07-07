"use client";

import { Photo } from "@prisma/client";
import React, { useState } from "react";
import MemberImage from "./MemberImage";
import StarButton from "./StarButton";
import DeleteButton from "./DeleteButton";
import { useRouter } from "next/navigation";
import { setMainImage } from "../actions/userActions";

interface Props {
  photos?: Photo[] | null;
  editing?: boolean;
  mainImageUrl?: string | null;
}
const MemberPhotos = ({ photos, editing, mainImageUrl }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState({
    type: "",
    isLoading: false,
    id: "",
  });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({ isLoading: true, id: photo.id, type: "main" });
    await setMainImage(photo);
    router.refresh();
    setLoading({ isLoading: false, id: "", type: "s" });
  };

  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative">
            <MemberImage photo={photo} />
            {editing && (
              <>
                <div
                  className="absolute top-3 left-3 z-50"
                  onClick={() => onSetMain(photo)}
                >
                  <StarButton
                    selected={photo.url === mainImageUrl}
                    loading={
                      loading.isLoading &&
                      loading.type === "main" &&
                      loading.id === photo.id
                    }
                  />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={false} />
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default MemberPhotos;
