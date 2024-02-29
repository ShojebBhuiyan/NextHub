import Link from "next/link";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="w-full py-12">
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
            type="button"
            className=" justify-self-center w-fit text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <Link href={"/explore"}>Explore Repos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
