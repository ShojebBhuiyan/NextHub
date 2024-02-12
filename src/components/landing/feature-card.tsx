import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface FeatureCardProps {
  name: string;
  description: string;
}

export default function FeatureCard({ name, description }: FeatureCardProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="font-bold text-xl">{name}</CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
}
