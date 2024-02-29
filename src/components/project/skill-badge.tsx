import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface SkillBadgeProps {
  skill: string;
}
export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <Link href={`/explore/${skill}`}>
      <Badge className="text-lg shadow-md border-purple-900">{skill}</Badge>;
    </Link>
  );
}
