"use client";

import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React from "react";
import { HiPhoto } from "react-icons/hi2";

interface Props {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
}
const ImageUploadButton = ({ onUploadImage }: Props) => {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onUploadImage}
      signatureEndpoint="/api/sign-image"
      uploadPreset="next-match"
      className="flex items-center gap-2 bg-secondary text-white rounded-lg py-2 px-4 hover:bg-secondary/70"
    >
      <HiPhoto size={28} />
      Upload new image
    </CldUploadButton>
  );
};

export default ImageUploadButton;
