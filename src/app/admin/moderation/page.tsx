import { getUnapprovedPhotos } from "@/src/actions/adminActions";
import MemberPhotos from "@/src/components/MemberPhotos";
import { Divider } from "@nextui-org/react";

export const dynamic = "force-dynamic";

const PhotoModerationPage = async () => {
  const photos = await getUnapprovedPhotos();

  return (
    <div className="flex flex-col mt-10 gap-3">
      <h3 className="text-2xl">Photos awaiting moderation</h3>
      <Divider />
      <MemberPhotos photos={photos} />
    </div>
  );
};
export default PhotoModerationPage;
