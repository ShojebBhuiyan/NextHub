import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SkillBadge from "@/components/project/skill-badge";

interface ProjectCardProps {
  name: string;
  description: string;
  skills: string[];
}

export default function ProjectCard({
  name,
  description,
  skills,
}: ProjectCardProps) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="font-bold text-3xl">{name}</CardHeader>
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
