"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";

export const AreaChartCard = <T extends object>({
  title,
  description,
  data,
  dataKey,
  secondaryKey,
}: {
  title: string;
  description?: string;
  data: T[];
  dataKey: string;
  secondaryKey?: string;
}) => (
  <Card>
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
    </div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#346dff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#346dff" stopOpacity={0.04} />
            </linearGradient>
            <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.24} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip />
          <Area type="monotone" dataKey={dataKey} stroke="#346dff" fill="url(#colorPrimary)" strokeWidth={2} />
          {secondaryKey ? (
            <Area type="monotone" dataKey={secondaryKey} stroke="#10b981" fill="url(#colorSecondary)" strokeWidth={2} />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Card>
);
