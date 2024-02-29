import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SkillBadge from "@/components/project/skill-badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star } from "lucide-react";

interface ProjectCardProps {
  title: string;
  username: string;
  description: string;
  stars: number;
  imageUrl: string | null;
  skills: string[];
}

export default function ProjectCard({
  title,
  username,
  description,
  stars,
  imageUrl,
  skills,
}: ProjectCardProps) {
  return (
    <Card className="w-full shadow-md bg-violet-400 border-purple-900">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between font-semibold text-3xl w-full">
          <div className="flex">
            <Link className="hover:underline" href={`/${username}`}>
              {username}
            </Link>
            <span>&nbsp;/&nbsp;</span>
            <Link className="hover:underline" href={`/${username}/${title}`}>
              {title}
            </Link>
          </div>
          <div className="bg-primary text-xl rounded-lg text-white font-normal p-2 flex items-center gap-2">
            <Star />
            <span>{stars}</span>
          </div>
        </div>
        <div className="flex">
          <Avatar>
            <AvatarImage src={imageUrl!} alt="avatar" />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
        </div>
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
