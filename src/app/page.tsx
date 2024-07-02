import { Button } from "@nextui-org/react";
import Providers from "../components/Providers";
import { FaRegSmile } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <Providers>
      <div>
        <h1 className="text-3xl">Hello World!</h1>
        <Button
          as={Link}
          href="/members"
          color="secondary"
          variant="bordered"
          startContent={<FaRegSmile />}
        >
          Click Me!
        </Button>
      </div>
    </Providers>
  );
}
