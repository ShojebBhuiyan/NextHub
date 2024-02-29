import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface ProfileOptionsProps {
  imageUrl: string;
  name: string;
}
export default function ProfileOptions({
  imageUrl,
  name,
}: ProfileOptionsProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full w-fit">
            <Avatar>
              <AvatarImage src={imageUrl} alt="avatar" />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={`/${name}`} className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/explore`} className="w-full">
                Explore
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/settings`} className="w-full">
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}
            className="w-full"
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
