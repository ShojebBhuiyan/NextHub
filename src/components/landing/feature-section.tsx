import { BookCopy, Box, Users } from "lucide-react";
import FeatureCard from "./feature-card";

export default function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex-col items-center gap-4 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none lg:text-6xl/none xl:text-7xl/none">
              Explore Our Repositories
            </h1>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Discover a wide range of projects. Contribute to open source,
              learn new languages, and explore innovative tools.
            </p>
          </div>
          <div className="flex items-center gap-6 justify-center">
            <Box /><FeatureCard name={"Build Faster, Together"} description={"Collaborate with built in merge requests, Code review and CI/CD."} />
            <Users /><FeatureCard name={"Skill Sorting"} description={"Search and Contribute to Projects that match your skillset."} />
            <BookCopy /><FeatureCard name={"Repository Creation"} description={"Create Repos based on your preference."} />
          </div>
        </div>
      </div>
    </section>
  );
}
