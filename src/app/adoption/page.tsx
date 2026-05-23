"use client";

import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { PieChartCard } from "@/components/charts/PieChartCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { adoptionMetrics, organization } from "@/lib/demo-data";
import { formatPercent } from "@/lib/format";
import { AdoptionMetric } from "@/lib/types";

export default function AdoptionPage() {
  const { createToast } = useDemoConsole();

  const columns: TableColumn<AdoptionMetric>[] = [
    { key: "dept", header: "부서", cell: (row) => organization.departments.find((department) => department.id === row.departmentId)?.name ?? row.departmentId },
    { key: "active", header: "부서별 활성률", cell: (row) => formatPercent((row.activeUsers / row.totalUsers) * 100) },
    { key: "agent", header: "주요 Agent", cell: (row) => row.primaryAgent },
    { key: "repeat", header: "반복 사용자 비율", cell: (row) => formatPercent(row.repeatUserRate) },
    { key: "dropoff", header: "이탈 수", cell: (row) => `${row.dropOffCount}명` },
    { key: "satisfaction", header: "만족도", cell: (row) => `${row.satisfaction.toFixed(1)} / 5` },
    { key: "pain", header: "저조 원인", cell: (row) => row.painPoint },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Adoption"
        title="사용자 도입률 관리"
        description="부서별 활성률과 이탈 원인을 함께 보며 교육 우선순위를 정합니다."
        action={<Button onClick={() => createToast("온보딩 메일 발송 예약", "선택 부서 대상으로 온보딩 메일 예약을 등록했습니다.")}>온보딩 메일 발송 예약</Button>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="전체 사용자 수" value={`${organization.eligibleUsers}명`} helper="사용 대상" />
        <MetricCard title="주간 활성 사용자" value={`${organization.activeUsers}명`} helper="최근 7일" />
        <MetricCard title="반복 사용자 비율" value={formatPercent(67.8)} helper="월 기준" />
        <MetricCard title="미사용자 수" value={`${organization.eligibleUsers - organization.activeUsers}명`} helper="교육 후보" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <BarChartCard
          title="부서별 사용률 차트"
          description="영업팀과 생산기술팀이 교육 우선 대상입니다."
          data={adoptionMetrics.map((metric) => ({
            label: organization.departments.find((department) => department.id === metric.departmentId)?.name ?? metric.departmentId,
            value: Number(((metric.activeUsers / metric.totalUsers) * 100).toFixed(1)),
          }))}
          dataKey="value"
        />
        <PieChartCard
          title="도입 저조 원인 분류"
          description="교육과 UX 개선 포인트를 요약했습니다."
          data={[
            { label: "로그인했지만 사용 안 함", value: 9 },
            { label: "한 번 사용 후 이탈", value: 6 },
            { label: "특정 Agent만 사용", value: 11 },
            { label: "품질 불만 피드백", value: 7 },
            { label: "권한 문제로 실패", value: 4 },
          ]}
          dataKey="value"
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          "영업팀은 견적서 AI 교육이 필요합니다.",
          "생산팀은 모바일 접근성이 부족해 사용률이 낮습니다.",
          "개발팀은 코드보조 AI보다 문서검색 AI 사용률이 높습니다.",
        ].map((item) => (
          <Card key={item} className="p-5 text-sm text-slate-700">{item}</Card>
        ))}
      </div>

      <DataTable columns={columns} data={adoptionMetrics} rowKey={(row) => row.departmentId} />
    </div>
  );
}
