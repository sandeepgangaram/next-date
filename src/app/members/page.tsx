import { getMembers } from "@/src/actions/memberActions";
import Link from "next/link";
import MemberCard from "./MemberCard";

const Members = async () => {
  const members = await getMembers();
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.map((member) => {
          return <MemberCard member={member} key={member.id} />;
        })}
    </div>
  );
};

export default Members;
