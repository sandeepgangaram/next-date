import { GiRose } from "react-icons/gi";
import { auth } from "../auth";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-6 text-secondary">
      <GiRose size={100} />
      <h1 className="text-4xl font-semibold">
        Welcome! Let us find your NextDate
      </h1>
      {session ? (
        <Button
          as={Link}
          href="/members"
          size="lg"
          color="secondary"
          variant="bordered"
        >
          Continue
        </Button>
      ) : (
        <div className="flex flex-row gap-4">
          <Button
            as={Link}
            href="/login"
            size="lg"
            color="secondary"
            variant="bordered"
          >
            Sign in
          </Button>
          <Button
            as={Link}
            href="/register"
            size="lg"
            color="secondary"
            variant="bordered"
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
