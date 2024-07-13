import { Spinner } from "@nextui-org/react";
import React from "react";

interface Props {
  label?: string;
}
const LoadingComponent = ({ label }: Props) => {
  return (
    <div className="flex justify-center items-center vertical-center">
      <Spinner
        label={label || "Loading..."}
        color="secondary"
        labelColor="secondary"
      />
    </div>
  );
};

export default LoadingComponent;
