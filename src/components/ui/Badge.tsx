import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Badge = ({
  className,
  tone = "slate",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "slate" | "blue" | "green" | "amber" | "red" | "violet";
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
      tone === "slate" && "bg-slate-100 text-slate-700",
      tone === "blue" && "bg-brand-50 text-brand-700",
      tone === "green" && "bg-emerald-50 text-emerald-700",
      tone === "amber" && "bg-amber-50 text-amber-700",
      tone === "red" && "bg-rose-50 text-rose-700",
      tone === "violet" && "bg-indigo-50 text-indigo-700",
      className,
    )}
    {...props}
  />
);
