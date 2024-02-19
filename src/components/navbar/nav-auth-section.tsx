"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileOptions from "./profile-options";

export default function NavAuthSection() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <ProfileOptions
          imageUrl={session.user?.image!}
          name={session.user?.name!}
        />
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
