import { getProjectsByUserName } from "@/actions/project/get-projects-by-user-name";
import ProfileCard from "./profile-card";

export default async function ProfileProjectListing({
  params,
}: {
  params: { profileId: string };
}) {
  const username = decodeURIComponent(params.profileId);
  const projects = await getProjectsByUserName(username);

  return (
    <div className="container grid grid-cols-2 gap-4">
      <h1 className="font-bold text-4xl col-span-2">Projects by Profile</h1>
      {projects?.map((project) => (
        <ProfileCard
          username={username}
          key={project.id}
          title={project.title}
          description={project.description}
          skills={project.skills}
        />
      ))}
    </div>
  );
}
