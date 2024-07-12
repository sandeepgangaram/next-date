import { Button } from "@nextui-org/react";
import { FaRegSmile } from "react-icons/fa";
import { auth, signOut } from "../auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1 className="text-3xl">Hello World!</h1>
      <h3 className="text-2xl font-semibold">User session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button
              type="submit"
              color="secondary"
              variant="bordered"
              startContent={<FaRegSmile />}
            >
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <h3 className="text-2xl font-semibold">User Not Signed In</h3>
      )}
    </div>
  );
}
