import ProfileProjectListing from "@/components/project/profile-project-listings";

export default function ProfilePage({
  params,
}: {
  params: { profileId: string };
}) {
  return (
    <div>
      <ProfileProjectListing params={params} />
    </div>
  );
}
