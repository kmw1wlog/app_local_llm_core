"use client";

import { BrainCircuit, ChartColumnIncreasing, Coins, ShieldCheck, Sparkles } from "lucide-react";
import { AreaChartCard } from "@/components/charts/AreaChartCard";
import { CostComparisonChart } from "@/components/charts/CostComparisonChart";
import { LineChartCard } from "@/components/charts/LineChartCard";
import { RecommendationCard } from "@/components/domain/RecommendationCard";
import { SecurityGradeBadge } from "@/components/domain/SecurityGradeBadge";
import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { agents, dashboardTimeseries, organization, roleHighlights, workflows } from "@/lib/demo-data";
import { formatCurrency, formatHours, formatNumber, formatPercent } from "@/lib/format";
import {
  calculateActiveRate,
  calculateQualityApprovalRate,
  calculateRoutingSavings,
  calculateSavedHours,
  getAgentsNeedingAttention,
  getTopWorkflowsByImpact,
} from "@/lib/metrics";

export default function DashboardPage() {
  const { selectedRole } = useDemoConsole();
  const routing = calculateRoutingSavings();
  const topWorkflows = getTopWorkflowsByImpact();
  const agentsNeedingAttention = getAgentsNeedingAttention();
  const rolePanel = roleHighlights[selectedRole];

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-[radial-gradient(circle_at_top_left,rgba(52,109,255,0.16),transparent_30%),linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] p-8 shadow-soft">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Overview</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">사내 LLM 도입 이후 성과와 운영 상태를 한 화면에서 관리합니다.</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              중요한 업무는 Secure Core에서, 반복 업무는 Cheap Edge에서 처리합니다. 민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다.
            </p>
          </div>
          <Card className="bg-slate-950 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">{selectedRole} 시점</p>
            <h2 className="mt-3 text-2xl font-semibold">{rolePanel.focusMetric}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{rolePanel.headline}</p>
            <div className="mt-5 space-y-3">
              {rolePanel.actions.map((action) => (
                <div key={action} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                  {action}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="월 절감시간"
          value={formatHours(calculateSavedHours())}
          delta="+14.8%"
          helper="도입 전 Baseline 대비"
          icon={<ChartColumnIncreasing className="h-5 w-5" />}
          highlight={selectedRole === "대표/임원" || selectedRole === "현업 팀장"}
        />
        <MetricCard
          title="월 절감비용"
          value={formatCurrency(organization.monthlySavedCost)}
          delta="+11.2%"
          helper="보수적 추정"
          icon={<Coins className="h-5 w-5" />}
          highlight={selectedRole === "대표/임원" || selectedRole === "재무/구매 담당자"}
        />
        <MetricCard
          title="AI 처리 업무 수"
          value={`${formatNumber(organization.monthlyTasks)}건`}
          delta="+18.6%"
          helper="이번 달 누적"
          icon={<BrainCircuit className="h-5 w-5" />}
          highlight={selectedRole === "AI 도입 담당자" || selectedRole === "일반 사용자"}
        />
        <MetricCard
          title="모델 비용 절감률"
          value={formatPercent(routing.savingsRate)}
          delta="+7.3%"
          helper="SOTA 단독 대비"
          icon={<ShieldCheck className="h-5 w-5" />}
          highlight={selectedRole === "IT/보안 담당자" || selectedRole === "재무/구매 담당자"}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <AreaChartCard
          title="도입 전후 업무 처리시간 변화"
          description="평균 처리시간이 도입 후 꾸준히 감소하고 있습니다."
          data={dashboardTimeseries.processingTime}
          dataKey="baseline"
          secondaryKey="current"
        />
        <CostComparisonChart
          title="SOTA 단독 대비 라우팅 비용 절감"
          description="업무별 모델 라우팅으로 비용이 안정적으로 절감됩니다."
          data={dashboardTimeseries.costComparison}
        />
        <LineChartCard
          title="사용자 활성률 추이"
          description="활성 사용자 비율이 목표치에 근접하고 있습니다."
          data={dashboardTimeseries.adoptionTrend}
          lines={[
            { dataKey: "activeRate", color: "#346dff", name: "활성률" },
            { dataKey: "target", color: "#10b981", name: "목표" },
          ]}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <SectionHeader
            eyebrow="Impact"
            title="효과가 큰 Workflow Top 5"
            description="업무량과 평균 절감시간을 함께 반영했습니다."
          />
          <div className="mt-6 space-y-4">
            {topWorkflows.map((workflow) => {
              const hours = Math.round((workflow.avgSavedMinutes * workflow.monthlyVolume) / 60);
              return (
                <div key={workflow.id} className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-950">{workflow.name}</h3>
                      <SecurityGradeBadge grade={workflow.securityGrade} />
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{workflow.modelRoute}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-slate-950">{hours}시간 절감</p>
                    <p className="text-sm text-slate-500">승인률 {formatPercent(workflow.approvalRate)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionHeader
            eyebrow="Attention"
            title="개선이 필요한 Agent Top 5"
            description="수정률과 재질문률을 기준으로 우선 정렬했습니다."
          />
          <div className="mt-6 space-y-4">
            {agentsNeedingAttention.map((agent) => (
              <div key={agent.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-950">{agent.name}</h3>
                      <SecurityGradeBadge grade={agent.securityGrade} />
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{agent.recommendation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-950">수정률 {formatPercent(agent.editRate)}</p>
                    <p className="text-sm text-slate-500">재질문률 {formatPercent(agent.rerunRate)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <RecommendationCard title="이번 달 추천 조치" items={rolePanel.actions} />
        <Card className="bg-slate-950 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3">
              <Sparkles className="h-5 w-5 text-brand-200" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">운영 스냅샷</h3>
              <p className="mt-1 text-sm text-slate-300">이 수치는 도입 전 Baseline과 사용 로그를 바탕으로 한 보수적 추정입니다.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-slate-300">활성 사용자</p>
              <p className="mt-2 text-2xl font-semibold">{organization.activeUsers}명 / {organization.eligibleUsers}명</p>
              <p className="mt-1 text-sm text-brand-200">활성률 {formatPercent(calculateActiveRate())}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-slate-300">품질 승인률</p>
              <p className="mt-2 text-2xl font-semibold">{formatPercent(calculateQualityApprovalRate())}</p>
              <p className="mt-1 text-sm text-emerald-300">로컬 LLM 대체율 {organization.localLlmReplacementRate}%</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-slate-300">정책 위반 차단</p>
              <p className="mt-2 text-2xl font-semibold">{organization.securityBlocks}건</p>
              <p className="mt-1 text-sm text-amber-300">외부 라우팅 차단 {organization.externalRoutingBlocks}건</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-slate-300">Cheap Edge 처리 비율</p>
              <p className="mt-2 text-2xl font-semibold">{organization.cheapEdgeShare}%</p>
              <p className="mt-1 text-sm text-slate-300">민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다.</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
