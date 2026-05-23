"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { AreaChartCard } from "@/components/charts/AreaChartCard";
import { organization, workflows } from "@/lib/demo-data";
import { formatCurrency, formatHours, formatPercent } from "@/lib/format";
import { calculateNetEffect, calculateRoutingSavings } from "@/lib/metrics";
import { Workflow } from "@/lib/types";

const modeFactor = {
  "보수적": 0.92,
  "기준": 1,
  "공격적": 1.08,
};

export default function ImpactPage() {
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [workflowFilter, setWorkflowFilter] = useState("all");
  const [estimateMode, setEstimateMode] = useState<keyof typeof modeFactor>("보수적");
  const [hourlyRate, setHourlyRate] = useState(21200);

  const filtered = useMemo(
    () =>
      workflows.filter(
        (workflow) =>
          (departmentFilter === "all" || workflow.departmentId === departmentFilter) &&
          (workflowFilter === "all" || workflow.id === workflowFilter),
      ),
    [departmentFilter, workflowFilter],
  );

  const factor = modeFactor[estimateMode];
  const savedHours = filtered.reduce(
    (sum, workflow) => sum + ((workflow.beforeAvgMinutes - workflow.afterAvgMinutes) * workflow.monthlyVolume) / 60,
    0,
  ) * factor;
  const laborSavings = savedHours * hourlyRate;
  const routing = calculateRoutingSavings();
  const modelSavings = routing.savings * factor;
  const netEffect = laborSavings + modelSavings - 4200000 - 386000;

  const columns: TableColumn<Workflow>[] = [
    { key: "name", header: "업무", cell: (row) => row.name },
    { key: "before", header: "도입 전", cell: (row) => `${row.beforeAvgMinutes.toFixed(2)}분` },
    { key: "after", header: "도입 후", cell: (row) => `${row.afterAvgMinutes.toFixed(2)}분` },
    {
      key: "saving",
      header: "절감률",
      cell: (row) => formatPercent(((row.beforeAvgMinutes - row.afterAvgMinutes) / row.beforeAvgMinutes) * 100),
    },
    { key: "throughput", header: "처리량 증가", cell: (row) => `${row.throughputGrowth}%` },
    {
      key: "labor",
      header: "인건비 절감액",
      cell: (row) =>
        formatCurrency((((row.beforeAvgMinutes - row.afterAvgMinutes) * row.monthlyVolume) / 60) * hourlyRate * factor),
    },
  ];

  const chartData = filtered.map((workflow) => ({
    label: workflow.name,
    before: Number(workflow.beforeAvgMinutes.toFixed(2)),
    after: Number(workflow.afterAvgMinutes.toFixed(2)),
  }));

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="AI Impact"
        title="도입 전후 생산성·비용 효과 분석"
        description="이 수치는 도입 전 Baseline과 사용 로그를 바탕으로 한 보수적 추정입니다."
        action={<Badge tone="amber">보수적 추정</Badge>}
      />

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <h3 className="text-lg font-semibold text-slate-950">Baseline 입력 카드</h3>
          <p className="mt-2 text-sm text-slate-600">부서와 업무를 바꿔보면 추정치가 즉시 갱신됩니다.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <span className="mb-2 block font-medium text-slate-700">부서</span>
              <select className="w-full bg-transparent outline-none" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                <option value="all">전체 부서</option>
                {organization.departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <span className="mb-2 block font-medium text-slate-700">업무</span>
              <select className="w-full bg-transparent outline-none" value={workflowFilter} onChange={(e) => setWorkflowFilter(e.target.value)}>
                <option value="all">전체 업무</option>
                {workflows.map((workflow) => (
                  <option key={workflow.id} value={workflow.id}>
                    {workflow.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <span className="mb-2 block font-medium text-slate-700">추정 방식</span>
              <select
                className="w-full bg-transparent outline-none"
                value={estimateMode}
                onChange={(e) => setEstimateMode(e.target.value as keyof typeof modeFactor)}
              >
                {Object.keys(modeFactor).map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </label>
            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <span className="mb-2 block font-medium text-slate-700">시간당 인건비 추정치</span>
              <input
                type="number"
                className="w-full bg-transparent outline-none"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
              />
            </label>
          </div>
        </Card>

        <Card className="bg-slate-950 text-white">
          <h3 className="text-lg font-semibold">산식 안내</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <div className="rounded-2xl bg-white/5 p-4">월 절감시간 = Σ(도입 전 평균시간 - 도입 후 평균시간) × 처리건수</div>
            <div className="rounded-2xl bg-white/5 p-4">월 절감비용 = 월 절감시간 × 시간당 인건비 추정치</div>
            <div className="rounded-2xl bg-white/5 p-4">모델비용 절감액 = SOTA 단독 예상비용 - 실제 라우팅 비용</div>
            <div className="rounded-2xl bg-white/5 p-4">순효과 = 인건비 절감 추정 + 모델비용 절감 - 구독료 - 인프라비</div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="월 절감시간" value={formatHours(Math.round(savedHours))} helper={`${estimateMode} 추정`} />
        <MetricCard title="인건비 환산 절감액" value={formatCurrency(Math.round(laborSavings))} helper="시간당 인건비 기준" />
        <MetricCard title="모델 비용 절감액" value={formatCurrency(Math.round(modelSavings))} helper="SOTA 단독 대비" />
        <MetricCard title="순효과 추정" value={formatCurrency(Math.round(netEffect))} helper="구독료·인프라비 반영" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <AreaChartCard
          title="업무별 처리시간 변화"
          description="도입 후 평균 소요시간이 어떻게 줄었는지 비교합니다."
          data={chartData}
          dataKey="before"
          secondaryKey="after"
        />
        <Card>
          <h3 className="text-lg font-semibold text-slate-950">도입 요약</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">모델 비용 절감률</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{formatPercent(routing.savingsRate)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">활성 사용자</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{organization.activeUsers}명</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">구독료</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{formatCurrency(4200000)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">기준 순효과</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{formatCurrency(calculateNetEffect())}</p>
            </div>
          </div>
        </Card>
      </section>

      <DataTable columns={columns} data={filtered} rowKey={(row) => row.id} />
    </div>
  );
}
