import { Badge } from "@/components/ui/Badge";
import { SecurityGrade } from "@/lib/types";

const toneMap: Record<SecurityGrade, "red" | "amber" | "blue" | "green" | "violet"> = {
  P0: "red",
  P1: "amber",
  P2: "blue",
  P3: "green",
  P4: "violet",
};

export const SecurityGradeBadge = ({ grade }: { grade: SecurityGrade }) => (
  <Badge tone={toneMap[grade]}>{grade}</Badge>
);
