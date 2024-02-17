import { getProjects } from "@/actions/project/get-projects";
import ProjectCard from "./project-card";
import { Separator } from "../ui/separator";

export default async function ProjectListings() {
  const projects = await getProjects();

  console.log(projects);

  return (
    <div className="container flex-col space-y-6 w-full">
      <div className="space-y-4">
        <h1 className="font-bold text-4xl">Project Listings</h1>
        <Separator />
      </div>
      <div className="flex-col space-y-4 w-full">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            username={project.user.name!}
            title={project.title}
            description={project.description}
            imageUrl={project.user.image}
            skills={project.skills}
          />
        ))}
      </div>
    </div>
  );
}
