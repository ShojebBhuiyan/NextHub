import { getProjectsByUserName } from "@/actions/project/get-projects-by-user-name";
import ProfileCard from "./profile-card";
import { Button } from "../ui/button";
import { PackagePlus } from "lucide-react";
import Link from "next/link";

export default async function ProfileProjectListing({
  params,
}: {
  params: { profileId: string };
}) {
  const username = decodeURIComponent(params.profileId);
  const projects = await getProjectsByUserName(username);

  return (
    <div className="mt-5 container flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl col-span-2">Projects</h1>
        <Link href={"/project-form"} className="no-underline">
          <Button className="flex gap-2">
            <PackagePlus />
            <span>Create New Project</span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {projects?.map((project) => (
          <ProfileCard
            username={username}
            stars={project.stars}
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
