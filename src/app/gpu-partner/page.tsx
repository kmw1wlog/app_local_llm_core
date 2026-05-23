"use client";

import { useState } from "react";
import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { gpuNodes } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/format";
import { GpuNode } from "@/lib/types";

export default function GpuPartnerPage() {
  const { createToast } = useDemoConsole();
  const [nodes, setNodes] = useState(gpuNodes);

  const updateNode = (id: string, key: keyof GpuNode, value: string | number | boolean) => {
    setNodes((current) => current.map((node) => (node.id === id ? { ...node, [key]: value } : node)));
    createToast("GPU 파트너 설정 변경", "설정이 저장되었습니다.");
  };

  const columns: TableColumn<GpuNode>[] = [
    { key: "partner", header: "파트너", cell: (row) => row.partnerName },
    { key: "registered", header: "등록 GPU 수", cell: (row) => `${row.totalGpu}대` },
    { key: "active", header: "현재 가동 GPU 수", cell: (row) => `${row.activeGpu}대` },
    { key: "revenue", header: "오늘 수익", cell: (row) => formatCurrency(row.todayRevenue) },
    { key: "forecast", header: "이번 달 예상 정산액", cell: (row) => formatCurrency(row.monthlyPayoutForecast) },
    { key: "hours", header: "GPU 사용시간", cell: (row) => `${row.hours}시간` },
    { key: "temp", header: "평균 온도", cell: (row) => `${row.avgTemp}°C` },
    { key: "interruptions", header: "작업 중단 횟수", cell: (row) => `${row.interruptions}회` },
    { key: "returns", header: "손님 우선 반환", cell: (row) => `${row.priorityReturns}건` },
    { key: "status", header: "장비 상태", cell: (row) => <Badge>{row.status}</Badge> },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="GPU Partner" title="GPU 파트너 콘솔" description="손님 이용이 항상 우선입니다. 작업은 자동 중단되며, PC는 즉시 반환됩니다. 민감 데이터는 처리하지 않습니다." />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="등록 GPU 수" value={`${nodes.reduce((sum, node) => sum + node.totalGpu, 0)}대`} helper="전체 파트너 합계" />
        <MetricCard title="현재 가동 GPU 수" value={`${nodes.reduce((sum, node) => sum + node.activeGpu, 0)}대`} helper="Cheap Edge 작업 기준" />
        <MetricCard title="오늘 수익" value={formatCurrency(nodes.reduce((sum, node) => sum + node.todayRevenue, 0))} helper="파트너 합산" />
        <MetricCard title="예상 정산액" value={formatCurrency(nodes.reduce((sum, node) => sum + node.monthlyPayoutForecast, 0))} helper="이번 달 전망" />
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        {nodes.map((node) => (
          <Card key={node.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">{node.partnerName}</h3>
                <p className="mt-1 text-sm text-slate-600">{node.label}</p>
              </div>
              <Badge>{node.status}</Badge>
            </div>
            <div className="mt-5 space-y-4">
              <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <span className="mb-2 block font-medium">가동 시간 설정</span>
                <input className="w-full bg-transparent outline-none" value={node.schedule} onChange={(e) => updateNode(node.id, "schedule", e.target.value)} />
              </label>
              <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <span className="mb-2 block font-medium">최대 온도 제한</span>
                <input type="number" className="w-full bg-transparent outline-none" value={node.maxTemp} onChange={(e) => updateNode(node.id, "maxTemp", Number(e.target.value))} />
              </label>
              <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <span className="mb-2 block font-medium">최대 사용률 제한</span>
                <input type="number" className="w-full bg-transparent outline-none" value={node.maxUtilization} onChange={(e) => updateNode(node.id, "maxUtilization", Number(e.target.value))} />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <span className="font-medium">작업 자동 중단</span>
                <input type="checkbox" checked={node.autoInterrupt} onChange={(e) => updateNode(node.id, "autoInterrupt", e.target.checked)} />
              </label>
            </div>
            <div className="mt-4">
              <Button variant="secondary" onClick={() => createToast("정산 내역 확인", `${node.partnerName} 정산 내역을 불러왔습니다.`)}>정산 내역 확인</Button>
            </div>
          </Card>
        ))}
      </div>

      <DataTable columns={columns} data={nodes} rowKey={(row) => row.id} />
    </div>
  );
}
