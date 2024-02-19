import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  skill: string;
}
export default function SkillBadge({ skill }: SkillBadgeProps) {
  return <Badge className="text-lg shadow-md border-purple-900">{skill}</Badge>;
}
