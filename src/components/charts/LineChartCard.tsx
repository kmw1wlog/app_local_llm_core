"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/Card";

export const LineChartCard = <T extends object>({
  title,
  description,
  data,
  lines,
}: {
  title: string;
  description?: string;
  data: T[];
  lines: { dataKey: string; color: string; name?: string }[];
}) => (
  <Card>
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
    </div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name={line.name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
);
