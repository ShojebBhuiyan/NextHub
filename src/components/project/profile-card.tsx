import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SkillBadge from "@/components/project/skill-badge";
import Link from "next/link";

interface ProfileCardProps {
  username: string;
  title: string;
  description: string;
  skills: string[];
}

export default function ProfileCard({
  username,
  title,
  description,
  skills,
}: ProfileCardProps) {
  return (
    <Card className="w-full shadow-md bg-violet-400">
      <CardHeader className="flex justify-between">
        <Link className="hover:underline" href={`/${username}/${title}`}>
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
