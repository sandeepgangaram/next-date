import { getMembers } from "@/src/actions/memberActions";
import Link from "next/link";
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIds } from "@/src/actions/likeActions";

const Members = async () => {
  const members = await getMembers();
  const likeIds = await fetchCurrentUserLikeIds();
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.map((member) => {
          return (
            <MemberCard member={member} key={member.id} likeIds={likeIds} />
          );
        })}
    </div>
  );
};

export default Members;
