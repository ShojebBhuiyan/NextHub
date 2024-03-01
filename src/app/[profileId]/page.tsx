import ProfileProjectListing from "@/components/project/profile-project-listings";

export default function ProfilePage({
  params,
}: {
  params: { profileId: string };
}) {
  return (
    <div className="flex flex-col gap-5">
      <ProfileProjectListing params={params} />
    </div>
  );
}
