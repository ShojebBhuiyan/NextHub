import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  name: string;
  description: string;
  icon: ReactNode;
}

export default function FeatureCard({
  name,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="flex-col gap-2">
        {icon}
        {name}
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
}
