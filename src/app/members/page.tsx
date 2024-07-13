import { getMembers } from "@/src/actions/memberActions";
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIds } from "@/src/actions/likeActions";
import PaginationComponent from "@/src/components/PaginationComponent";
import { UserFilters } from "@/src/types";

const Members = async ({ searchParams }: { searchParams: UserFilters }) => {
  const members = await getMembers(searchParams);
  const likeIds = await fetchCurrentUserLikeIds();
  return (
    <>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
        {members &&
          members.map((member) => {
            return (
              <MemberCard member={member} key={member.id} likeIds={likeIds} />
            );
          })}
      </div>
      <PaginationComponent />
    </>
  );
};

export default Members;
