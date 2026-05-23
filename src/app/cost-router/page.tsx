"use client";

import { useState } from "react";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { RoutingFlowDiagram } from "@/components/domain/RoutingFlowDiagram";
import { SecurityGradeBadge } from "@/components/domain/SecurityGradeBadge";
import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { costMetrics, executionLogs, routingPolicies, routingSimulationOptions, securityEvents } from "@/lib/demo-data";
import { formatCurrency, formatPercent } from "@/lib/format";

export default function CostRouterPage() {
  const { createToast } = useDemoConsole();
  const [selectedTask, setSelectedTask] = useState(routingSimulationOptions[0].task);

  const simulation = routingSimulationOptions.find((item) => item.task === selectedTask) ?? routingSimulationOptions[0];

  const columns: TableColumn<(typeof executionLogs)[number]>[] = [
    { key: "time", header: "시간", cell: (row) => row.time },
    { key: "task", header: "작업", cell: (row) => row.task },
    { key: "grade", header: "민감도", cell: (row) => <SecurityGradeBadge grade={row.sensitivityGrade} /> },
    { key: "path", header: "처리 경로", cell: (row) => row.path },
    { key: "result", header: "정책 결과", cell: (row) => row.policyResult },
    { key: "risk", header: "위험도", cell: (row) => <Badge>{row.riskLevel}</Badge> },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Cost Router"
        title="Secure Core / Cheap Edge 비용 라우팅 관리"
        description="민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다."
      />

      <RoutingFlowDiagram />

      <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <Card>
          <h3 className="text-lg font-semibold text-slate-950">P0~P4 정책 테이블</h3>
          <div className="mt-5 space-y-3">
            {routingPolicies.map((policy) => (
              <div key={policy.grade} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <SecurityGradeBadge grade={policy.grade} />
                      <p className="font-semibold text-slate-950">{policy.route}</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{policy.examples.join(", ")}</p>
                  </div>
                  <Badge tone={policy.externalAllowed ? "green" : "red"}>{policy.externalAllowed ? "외부 허용" : "외부 금지"}</Badge>
                </div>
                <p className="mt-3 text-sm text-slate-700">{policy.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-slate-950 text-white">
          <h3 className="text-lg font-semibold">라우팅 시뮬레이션</h3>
          <p className="mt-2 text-sm text-slate-300">예시 업무를 선택하면 실행 위치와 정책 결과를 보여줍니다.</p>
          <select
            className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
          >
            {routingSimulationOptions.map((option) => (
              <option key={option.task} value={option.task} className="text-slate-900">
                {option.task}
              </option>
            ))}
          </select>
          <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2">
              <SecurityGradeBadge grade={simulation.grade as never} />
              <span className="font-semibold">{simulation.route}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-200">{simulation.result}</p>
          </div>
          <div className="mt-5 flex gap-2">
            <Button onClick={() => createToast("라우팅 시뮬레이션", `${simulation.task} → ${simulation.route}`)}>라우팅 시뮬레이션</Button>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <BarChartCard
          title="모델별 비용 사용량"
          description="실제 라우팅 비용 기준 사용 분포입니다."
          data={costMetrics.map((metric) => ({ label: metric.category, value: metric.actualCost }))}
          dataKey="value"
        />
        <BarChartCard
          title="라우팅으로 절감된 비용"
          description="모델군별 절감 효과를 확인할 수 있습니다."
          data={costMetrics.map((metric) => ({ label: metric.category, value: metric.savings }))}
          dataKey="value"
          color="#10b981"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <h3 className="text-lg font-semibold text-slate-950">최근 실행 로그</h3>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            중요한 업무는 Secure Core에서, 반복 업무는 Cheap Edge에서 처리합니다.
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={executionLogs} rowKey={(row) => row.id} />
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-slate-950">차단된 외부 라우팅 이벤트</h3>
          <div className="mt-5 space-y-3">
            {securityEvents
              .filter((event) => event.type.includes("차단") || event.result.includes("차단"))
              .map((event) => (
                <div key={event.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-950">{event.action}</p>
                        <SecurityGradeBadge grade={event.sensitivity} />
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{event.description}</p>
                    </div>
                    <Badge tone="red">{event.severity}</Badge>
                  </div>
                </div>
              ))}
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
              민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다. Cheap Edge는 P3/P4 비민감 반복 작업에만 사용됩니다.
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">비용 비교</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between"><span>SOTA 단독 예상비용</span><span>{formatCurrency(2480000)}</span></div>
                <div className="flex items-center justify-between"><span>실제 라우팅 비용</span><span>{formatCurrency(1336000)}</span></div>
                <div className="flex items-center justify-between"><span>절감액</span><span>{formatCurrency(1144000)}</span></div>
                <div className="flex items-center justify-between"><span>절감률</span><span>{formatPercent(46.1)}</span></div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
