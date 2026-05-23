import { cn } from "@/lib/utils";

export const StatusDot = ({ tone = "slate" }: { tone?: "slate" | "green" | "amber" | "red" | "blue" }) => (
  <span
    className={cn(
      "inline-flex h-2.5 w-2.5 rounded-full",
      tone === "slate" && "bg-slate-400",
      tone === "green" && "bg-emerald-500",
      tone === "amber" && "bg-amber-500",
      tone === "red" && "bg-rose-500",
      tone === "blue" && "bg-brand-500",
    )}
  />
);
