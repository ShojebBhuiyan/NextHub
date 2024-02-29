import ProjectListings from "@/components/project/project-listings";

export default async function ExplorePage() {
  return (
    <main className="flex">
      <div className="w-full">
        <ProjectListings />
      </div>
    </main>
  );
}
