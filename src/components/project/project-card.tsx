import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

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
    <Card className="w-[400px] shadow-md">
      <CardHeader>{name}</CardHeader>
      <CardContent>
        <p>{description}</p>
        <div>
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs bg-gray-200 dark:bg-gray-800 rounded-md px-2 py-1 mr-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
