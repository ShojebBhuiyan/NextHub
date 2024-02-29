import { getProjectFiles } from "@/actions/project/get-project-files";
import { getProjectInfo } from "@/actions/project/get-project-info";
import ProjectInstructions from "@/components/project/project-instructions";
import StarButton from "@/components/project/star-button";
import RepoInfoController from "@/components/repo-info/repo-info-controller";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ProjectPage({
  params,
}: {
  params: { profileId: string; projectId: string };
}) {
  const username = decodeURIComponent(params.profileId);
  const directory = await getProjectFiles(username, params.projectId);

  const project = await getProjectInfo(username, params.projectId);

  console.log(directory);

  return (
    <div className="container flex flex-col gap-5">
      <div className="flex justify-between">
        <Tabs defaultValue="repo">
          <TabsList>
            <TabsTrigger value="repo">Repository</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="repo" className="w-full">
            <RepoInfoController
              fileTree={directory!}
              username={username}
              projectId={params.projectId}
            />
          </TabsContent>
        </Tabs>
        <StarButton stars={project?.stars!} projectId={project?.id!} />
      </div>
      <p className="text-lg">{project?.description}</p>
    </div>
  );
}
