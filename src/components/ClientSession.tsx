"use client";
import { useSession } from "next-auth/react";

const ClientSession = () => {
  const session = useSession();

  return (
    <div className="bg-blue-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
      <h3 className="text-2xl font-semibold">Client session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div className="text-2xl font-semibold">User Not Signed In</div>
      )}
    </div>
  );
};
export default ClientSession;
