import Link from "next/link";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-4 text-center lg:grid-cols-2 lg:text-left">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none lg:text-6xl/none xl:text-7xl/none">
              Welcome to <span className="text-primary">NextHub</span>
            </h1>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              The platform for collaborating on code. Connect with your team,
              manage your repositories, and ship better code with ease.
            </p>
          </div>
          <Button
            variant="link"
            className="w-fit justify-self-center border-primary border-2"
          >
            <Link href={"/explore"}>Explore Repos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
