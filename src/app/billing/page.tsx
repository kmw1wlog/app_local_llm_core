"use client";

import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { PieChartCard } from "@/components/charts/PieChartCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { costMetrics, organization } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/format";
import { calculateNetEffect } from "@/lib/metrics";

export default function BillingPage() {
  const { createToast } = useDemoConsole();

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Billing"
        title="비용·구독·사용량 관리"
        description="모델 비용, 인프라 비용, 절감 추정액을 한 화면에서 관리합니다."
        action={<Button onClick={() => createToast("플랜 업그레이드 상담", "Business 플랜 업그레이드 상담 요청을 남겼습니다.")}>플랜 업그레이드 상담</Button>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="현재 플랜" value="Business Pilot" helper="Pilot → Business 검토" />
        <MetricCard title="월 구독료" value={formatCurrency(4200000)} helper="기준 플랜" />
        <MetricCard title="절감 추정액" value={formatCurrency(8730000)} helper="보수적 추정" />
        <MetricCard title="구독료 대비 순효과" value={formatCurrency(calculateNetEffect())} helper="구독료·인프라비 반영" />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <BarChartCard
          title="비용 항목별 차트"
          description="실제 라우팅 비용 기준"
          data={[
            { label: "SOTA API", value: 516000 },
            { label: "로컬 LLM", value: 188000 },
            { label: "사내 GPU", value: 332000 },
            { label: "Cheap Edge", value: 120000 },
            { label: "문서 인덱싱", value: 98000 },
            { label: "파인튜닝", value: 82000 },
          ]}
          dataKey="value"
        />
        <PieChartCard
          title="부서별 비용 배분"
          description="영업팀과 개발팀 비중이 높습니다."
          data={organization.departments.map((department) => ({ label: department.name, value: department.monthlyCost }))}
          dataKey="value"
        />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-slate-950">모델별 비용 비교</h3>
        <div className="mt-5 space-y-3">
          {costMetrics.map((metric) => (
            <div key={metric.category} className="grid gap-3 rounded-[24px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-4">
              <div>
                <p className="text-sm font-semibold text-slate-950">{metric.category}</p>
                <p className="mt-1 text-xs text-slate-500">사용 비중 {metric.usageShare}%</p>
              </div>
              <div className="text-sm text-slate-700">SOTA 단독: {formatCurrency(metric.sotaOnlyCost)}</div>
              <div className="text-sm text-slate-700">실제 비용: {formatCurrency(metric.actualCost)}</div>
              <div className="text-sm font-semibold text-emerald-700">절감: {formatCurrency(metric.savings)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
