import React from "react";
import ListsTab from "./ListsTab";
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "@/src/actions/likeActions";

export const dynamic = "force-dynamic";

const ListsPage = async ({
  searchParams,
}: {
  searchParams: { type: string };
}) => {
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParams.type);
  return (
    <div>
      <ListsTab likeIds={likeIds} members={members} />
    </div>
  );
};

export default ListsPage;
