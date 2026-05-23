"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/Card";

const COLORS = ["#346dff", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#0f172a"];

export const PieChartCard = <T extends { label: string | number }>({
  title,
  description,
  data,
  dataKey,
}: {
  title: string;
  description?: string;
  data: T[];
  dataKey: string;
}) => (
  <Card>
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
    </div>
    <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey={dataKey} nameKey="label" innerRadius={70} outerRadius={100} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={`cell-${String(entry.label)}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {data.map((entry, index) => (
          <div key={String(entry.label)} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-sm font-medium text-slate-700">{String(entry.label)}</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{String(entry[dataKey as keyof T])}</span>
          </div>
        ))}
      </div>
    </div>
  </Card>
);
