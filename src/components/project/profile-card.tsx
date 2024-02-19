import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SkillBadge from "@/components/project/skill-badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfileCardProps {
  title: string;
  description: string;
  skills: string[];
}

export default function ProfileCard({
  title,
  description,
  skills,
}: ProfileCardProps) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex justify-between">
        <Link
          className="hover:underline"
          href={``} /// when clicked it should redirect me to project detail page.
        >
          {title}
        </Link>
      </CardHeader>
      <CardContent className="flex-col space-y-4">
        <p className="text-2xl">{description}</p>
        <div className="flex-wrap space-x-4">
          {skills.map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
