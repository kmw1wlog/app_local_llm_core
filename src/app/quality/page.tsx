"use client";

import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { LineChartCard } from "@/components/charts/LineChartCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { agents, qualityMetrics } from "@/lib/demo-data";
import { formatPercent } from "@/lib/format";
import { QualityMetric } from "@/lib/types";

export default function QualityPage() {
  const { createToast } = useDemoConsole();
  const featured = qualityMetrics[0];

  const columns: TableColumn<QualityMetric>[] = [
    { key: "agent", header: "Agent", cell: (row) => agents.find((agent) => agent.id === row.agentId)?.name ?? row.agentId },
    { key: "approval", header: "답변 승인률", cell: (row) => formatPercent(row.approvalRate) },
    { key: "edit", header: "수정률", cell: (row) => formatPercent(row.editRate) },
    { key: "reask", header: "재질문률", cell: (row) => formatPercent(row.reaskRate) },
    { key: "hallucination", header: "환각 의심률", cell: (row) => formatPercent(row.hallucinationRate) },
    { key: "citation", header: "근거 문서 인용률", cell: (row) => formatPercent(row.citationRate) },
    { key: "eval", header: "평가셋 통과율", cell: (row) => formatPercent(row.evalPassRate) },
    { key: "status", header: "상태", cell: (row) => <Badge>{row.status}</Badge> },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Quality"
        title="품질·평가 관리"
        description="승인률, 수정률, 환각 의심률을 함께 보며 배포 기준을 관리합니다."
        action={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => createToast("평가셋 업데이트", "평가셋을 최신 데이터로 교체했습니다.")}>평가셋 업데이트</Button>
            <Button onClick={() => createToast("재평가 실행", "전체 Agent 재평가를 시작했습니다.")}>재평가 실행</Button>
          </div>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="답변 승인률" value={formatPercent(92.4)} helper="전사 평균" />
        <MetricCard title="사용자 수정률" value={formatPercent(18.5)} helper="낮을수록 좋음" />
        <MetricCard title="환각 의심률" value={formatPercent(3.1)} helper="평가셋 기준" />
        <MetricCard title="근거 문서 인용률" value={formatPercent(89.8)} helper="문서형 Agent 평균" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <LineChartCard
          title="품질 추이 차트"
          description={`${agents.find((agent) => agent.id === featured.agentId)?.name} 기준`}
          data={featured.trend}
          lines={[
            { dataKey: "approvalRate", color: "#346dff", name: "승인률" },
            { dataKey: "editRate", color: "#f59e0b", name: "수정률" },
            { dataKey: "hallucinationRate", color: "#ef4444", name: "환각 의심률" },
          ]}
        />
        <Card>
          <h3 className="text-lg font-semibold text-slate-950">사용자 피드백 목록</h3>
          <div className="mt-5 space-y-3">
            {agents.flatMap((agent) => agent.feedback).slice(0, 8).map((feedback) => (
              <div key={feedback.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{feedback.type}</p>
                    <p className="mt-1 text-sm text-slate-600">{feedback.comment}</p>
                  </div>
                  <span className="text-xs text-slate-500">{feedback.user}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <DataTable columns={columns} data={qualityMetrics} rowKey={(row) => row.agentId} />
    </div>
  );
}
