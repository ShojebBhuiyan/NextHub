import { getProjectFiles } from "@/actions/project/get-project-files";
import RepoInfoController from "@/components/repo-info/repo-info-controller";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ProjectPage({
  params,
}: {
  params: { profileId: string; projectId: string };
}) {
  const username = decodeURIComponent(params.profileId);
  const directory = await getProjectFiles(username, params.projectId);

  console.log(directory);

  return (
    <div className="container">
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
    </div>
  );
}
