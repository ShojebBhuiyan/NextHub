"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SkillBadge from "@/components/project/skill-badge";
import Link from "next/link";
import { Star } from "lucide-react";

interface ProfileCardProps {
  username: string;
  title: string;
  stars: number;
  description: string;
  skills: string[];
}

export default function ProfileCard({
  username,
  title,
  stars,
  description,
  skills,
}: ProfileCardProps) {
  const maxLength = 100;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const trimmedDescription =
    description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;

  return (
    <Card className="w-full shadow-md bg-violet-400 border-purple-900">
      <CardHeader className="flex justify-between w-full">
        <div className="flex justify-between items-center">
          <Link
            className="hover:underline font-semibold text-3xl w-fit"
            href={`/${username}/${title}`}
          >
            {title}
          </Link>
          <div className="bg-primary rounded-lg text-white font-normal p-2 flex items-center gap-2">
            <Star />
            <span>{stars}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-col space-y-4">
        <p className="text-2xl">
          {showFullDescription ? description : trimmedDescription}
        </p>
        {description.length > maxLength && (
          <button
            className="text-violet-900 hover:underline"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show less" : "Show more"}
          </button>
        )}
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
