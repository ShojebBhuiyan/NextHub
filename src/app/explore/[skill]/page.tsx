import ProjectListings from "@/components/project/project-listings";
import QueryProjectListings from "@/components/project/query-project-listings";

export default async function QueryExplorePage({
  params,
}: {
  params: { skill: string };
}) {
  return (
    <main className="flex">
      <div className="w-full">
        <QueryProjectListings skill={params.skill} />
      </div>
    </main>
  );
}
