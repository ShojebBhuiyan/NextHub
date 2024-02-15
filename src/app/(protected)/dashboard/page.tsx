import { auth, signOut } from "@/auth";
import ProjectListings from "@/components/project/project-listings";

export default async function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="flex-col">
        <ProjectListings />
      </div>
    </main>
  );
}
