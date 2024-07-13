"use client";
import { usePathname } from "next/navigation";
import Filters from "./Filters";

const FiltersWrapper = () => {
  const pathname = usePathname();

  if (pathname !== "/members") return null;
  return <Filters />;
};

export default FiltersWrapper;
