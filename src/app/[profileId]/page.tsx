import ProfilePrjectListing from "@/components/project/profile-project-listings";

export default function ProfilePage({
  params,
}: {
  params: { profileId: string };
}) {
  return (
    <div>
      <ProfilePrjectListing params={params} />
    </div>
  );
}
