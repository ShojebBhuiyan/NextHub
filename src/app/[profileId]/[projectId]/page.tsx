import FileViewer from "@/components/project/file-viewer";

export default function ProjectPage({
  params,
}: {
  params: {
    profileId: string;
    projectId: string;
  };
}) {
  return (
    <div>
      <h1>Project Page</h1>
      <FileViewer
        reponame={decodeURIComponent(params.projectId)}
        username={decodeURIComponent(params.profileId)}
      />
    </div>
  );
}
