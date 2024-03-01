import Link from "next/link";
import NavAuthSection from "@/components/navbar/nav-auth-section";

export default function Navbar() {
  return (
    <nav className="flex w-full justify-between items-center gap-6 md:gap-10">
      <Link className="font-bold text-4xl" href="/">
        NextHub
      </Link>
      <div className="flex justify-end items-center gap-x-6">
        <Link href={"/explore"} className="text-2xl font-normal">
          Explore
        </Link>
        <NavAuthSection />
      </div>
    </nav>
  );
}
