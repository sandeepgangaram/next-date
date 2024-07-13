import { getMembers } from "@/src/actions/memberActions";
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIds } from "@/src/actions/likeActions";
import PaginationComponent from "@/src/components/PaginationComponent";
import { GetMemberParams, UserFilters } from "@/src/types";
import EmptyState from "@/src/components/EmptyState";

const Members = async ({ searchParams }: { searchParams: GetMemberParams }) => {
  const { items: members, totalCount } = await getMembers(searchParams);
  const likeIds = await fetchCurrentUserLikeIds();
  return (
    <>
      {!members || members.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
            {members &&
              members.map((member) => {
                return (
                  <MemberCard
                    member={member}
                    key={member.id}
                    likeIds={likeIds}
                  />
                );
              })}
          </div>
          <PaginationComponent totalCount={totalCount} />
        </>
      )}
    </>
  );
};

export default Members;
