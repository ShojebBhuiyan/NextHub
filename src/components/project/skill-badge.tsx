import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  skill: string;
}
export default function SkillBadge({ skill }: SkillBadgeProps) {
  return <Badge className="text-lg shadow-md">{skill}</Badge>;
}
