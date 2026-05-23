"use client";

import { Bell, CalendarRange, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { dateRanges, roleHighlights, roles } from "@/lib/demo-data";
import { useDemoConsole, useOrganization } from "@/components/providers/DemoConsoleProvider";

export const Topbar = () => {
  const organization = useOrganization();
  const { selectedRole, setSelectedRole, selectedRange, setSelectedRange, createToast } = useDemoConsole();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-shell/90 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 md:px-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Enterprise Demo</p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{organization.name}</h2>
              <Badge tone="blue">Demo Mode</Badge>
              <Badge tone="slate">{organization.aiStage}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {organization.industry} · 임직원 {organization.employeeCount}명 · 도입 기간 {organization.periodStart} ~ {organization.periodEnd}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex min-w-[200px] items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-soft">
              <span className="font-medium">역할</span>
              <select
                className="w-full bg-transparent text-sm outline-none"
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value as (typeof roles)[number])}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-soft">
              <CalendarRange className="h-4 w-4 text-slate-400" />
              <select
                className="bg-transparent text-sm outline-none"
                value={selectedRange}
                onChange={(event) => setSelectedRange(event.target.value)}
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
            </label>
            <button className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-soft hover:bg-slate-50">
              <Bell className="h-4 w-4" />
            </button>
            <Button
              className="gap-2"
              onClick={() =>
                createToast("월간 리포트 생성", `${roleHighlights[selectedRole].focusMetric} 기준으로 리포트를 다시 생성했습니다.`)
              }
            >
              <FileText className="h-4 w-4" />
              월간 리포트 생성
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
