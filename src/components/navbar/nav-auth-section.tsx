"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavAuthSection() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <Link href={`/${session.user?.name}`}>
            <Button
              variant="outline"
              className="w-[8rem] text-lg text-primary border-primary border-2"
            >
              Profile
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-[8rem] text-lg"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Link href={`/auth/login`}>
            <Button variant="outline" className="w-[8rem] text-lg">
              Login
            </Button>
          </Link>
          <Link href={`/auth/register`}>
            <Button
              variant="outline"
              className="w-[8rem] text-lg text-primary border-primary border-2"
            >
              Register
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
