import { getProjectsByUserName } from "@/actions/project/get-projects-by-user-name";
import ProjectCard from "@/components/project/project-card";
import ProfileCard from "./profile-card";

export default async function ProfilePrjectListing({
  params,
}: {
  params: { profileId: string };
}) {
  console.log(params.profileId);
  const projects = await getProjectsByUserName(params.profileId);
  console.log(projects);
  return (
    <div className="container flex-col space-y-6 w-full">
      <h1 className="font-bold text-4xl">Projects by Profile</h1>
      <div className="flex-col space-y-4 w-full">
        {projects?.map((project) => (
          <ProfileCard
            key={project.id}
            title={project.title}
            description={project.description}
            skills={project.skills}
          />
        ))}
      </div>
    </div>
  );
}
