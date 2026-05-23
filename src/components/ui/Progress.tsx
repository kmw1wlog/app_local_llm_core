import { cn } from "@/lib/utils";

export const Progress = ({
  value,
  className,
  tone = "blue",
}: {
  value: number;
  className?: string;
  tone?: "blue" | "green" | "amber" | "red";
}) => (
  <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}>
    <div
      className={cn(
        "h-full rounded-full transition-all",
        tone === "blue" && "bg-brand-500",
        tone === "green" && "bg-emerald-500",
        tone === "amber" && "bg-amber-500",
        tone === "red" && "bg-rose-500",
      )}
      style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
    />
  </div>
);
