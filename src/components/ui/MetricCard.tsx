import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export const MetricCard = ({
  title,
  value,
  delta,
  helper,
  icon,
  highlight = false,
}: {
  title: string;
  value: string;
  delta?: string;
  helper?: string;
  icon?: ReactNode;
  highlight?: boolean;
}) => (
  <Card
    className={cn(
      "relative overflow-hidden",
      highlight && "border-brand-200 bg-gradient-to-br from-white via-white to-brand-50",
    )}
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
      </div>
      {icon ? <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">{icon}</div> : null}
    </div>
    {delta ? (
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className={cn("inline-flex items-center gap-1 font-semibold", delta.startsWith("-") ? "text-rose-600" : "text-emerald-600")}>
          {delta.startsWith("-") ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
          {delta}
        </span>
        {helper ? <span className="text-slate-500">{helper}</span> : null}
      </div>
    ) : helper ? (
      <p className="mt-4 text-sm text-slate-500">{helper}</p>
    ) : null}
  </Card>
);
