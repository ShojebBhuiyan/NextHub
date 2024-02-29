import { getProjectFiles } from "@/actions/project/get-project-files";
import Explorer from "@/components/explorer/explorer";

export default async function ProjectPage({
  params,
}: {
  params: { profileId: string; projectId: string };
}) {
  const username = decodeURIComponent(params.profileId);
  const directory = await getProjectFiles(username, params.projectId);

  console.log(directory);

  return (
    <div>
      <Explorer fileTree={directory!} />
    </div>
  );
}
