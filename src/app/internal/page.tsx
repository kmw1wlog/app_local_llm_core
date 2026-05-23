"use client";

import { BarChartCard } from "@/components/charts/BarChartCard";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { customerAccounts } from "@/lib/demo-data";
import { formatCurrency, formatPercent } from "@/lib/format";
import { CustomerAccount } from "@/lib/types";

export default function InternalPage() {
  const columns: TableColumn<CustomerAccount>[] = [
    { key: "name", header: "고객", cell: (row) => row.name },
    { key: "mrr", header: "MRR", cell: (row) => formatCurrency(row.mrr) },
    { key: "active", header: "활성 사용자", cell: (row) => `${row.activeUsers}명` },
    { key: "growth", header: "사용량 증가율", cell: (row) => formatPercent(row.usageGrowth) },
    { key: "margin", header: "비용 마진", cell: (row) => formatPercent(row.costMargin) },
    { key: "quality", header: "품질 불만", cell: (row) => `${row.qualityComplaints}건` },
    { key: "security", header: "보안 경고", cell: (row) => `${row.securityAlerts}건` },
    { key: "tuning", header: "튜닝 필요", cell: (row) => row.tuningNeed },
    { key: "risk", header: "재계약 위험도", cell: (row) => <Badge>{row.renewalRisk}</Badge> },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Internal Ops" title="우리 내부 운영자용 고객관리 콘솔" description="고객별 확장 기회, 이탈 위험, 템플릿화 가능 업무를 추적합니다." />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="관리 고객 수" value={`${customerAccounts.length}개`} helper="활성 계정 기준" />
        <MetricCard title="월 반복매출" value={formatCurrency(customerAccounts.reduce((sum, account) => sum + account.mrr, 0))} helper="MRR 합계" />
        <MetricCard title="확장 가능 계정" value={`${customerAccounts.filter((account) => account.renewalRisk === "확장 가능").length}개`} helper="업셀 우선순위" />
        <MetricCard title="긴급 대응 계정" value={`${customerAccounts.filter((account) => account.renewalRisk === "긴급 대응" || account.renewalRisk === "이탈 위험").length}개`} helper="CS/보안 추적" />
      </section>

      <BarChartCard
        title="고객별 MRR"
        description="울산정밀부품과 포항소재연구소가 상위 계정입니다."
        data={customerAccounts.map((account) => ({ label: account.name, value: account.mrr }))}
        dataKey="value"
      />

      <DataTable columns={columns} data={customerAccounts} rowKey={(row) => row.id} />
    </div>
  );
}
