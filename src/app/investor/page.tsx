"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { customerAccounts, gpuNodes } from "@/lib/demo-data";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/format";

export default function InvestorPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Investor View"
        title="투자자/지원사업 리포트"
        description="고객별 구축이 아니라, 업무 템플릿과 튜닝 레시피가 축적되는 구조입니다."
        action={<Badge tone="blue">Demo aggregated data</Badge>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="PoC 기업 수" value={`${customerAccounts.length}개`} helper="익명화 데모 집계" />
        <MetricCard title="누적 처리 업무 수" value={`${formatNumber(148320)}건`} helper="최근 누적 기준" />
        <MetricCard title="평균 비용 절감률" value={formatPercent(44.8)} helper="하이브리드 라우팅 기준" />
        <MetricCard title="평균 생산성 개선률" value={formatPercent(28.6)} helper="도입 고객 평균" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">GPU 파트너 수</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{gpuNodes.length}개</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">월 반복매출</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{formatCurrency(customerAccounts.reduce((sum, account) => sum + account.mrr, 0))}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">고객 유지율</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{formatPercent(91.2)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">템플릿 누적 수</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">43개</p>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-slate-950">플랫폼 해석</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">사내 데이터를 넣으면 업무별 AI Agent가 자동 생성됩니다.</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Secure Core / Cheap Edge 이원화로 비용과 보안을 동시에 관리합니다.</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">고객별 구축이 아니라, 업무 템플릿과 튜닝 레시피가 축적되는 구조입니다.</div>
          </div>
        </Card>
      </section>
    </div>
  );
}
