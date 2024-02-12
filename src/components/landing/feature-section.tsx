import { BookCopy, Box, Users } from "lucide-react";
import FeatureCard from "./feature-card";

export default function FeatureSection() {
  return (
    <section className="w-full py-12">
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
          <div className="flex items-center gap-6 justify-between mt-10">
            <FeatureCard
              icon={<BookCopy />}
              name={"Repository Creation"}
              description={
                "Create and publish repositories based on your preference."
              }
            />

            <FeatureCard
              icon={<Users />}
              name={"Skill Sorting"}
              description={
                "Search and Contribute to Projects that match your skillset."
              }
            />
            <FeatureCard
              icon={<Box />}
              name={"Build Faster, Together"}
              description={"Collaborate with others with chat and whiteboards."}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
