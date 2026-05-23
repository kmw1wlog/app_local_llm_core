"use client";

import { useMemo, useState } from "react";
import { WorkflowCard } from "@/components/domain/WorkflowCard";
import { SecurityGradeBadge } from "@/components/domain/SecurityGradeBadge";
import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { organization, workflows } from "@/lib/demo-data";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Workflow } from "@/lib/types";

export default function WorkflowsPage() {
  const { createToast } = useDemoConsole();
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  const filtered = useMemo(
    () =>
      workflows.filter(
        (workflow) =>
          workflow.name.toLowerCase().includes(query.toLowerCase()) &&
          (departmentFilter === "all" || workflow.departmentId === departmentFilter) &&
          (statusFilter === "all" || workflow.status === statusFilter),
      ),
    [query, departmentFilter, statusFilter],
  );

  const columns: TableColumn<Workflow>[] = [
    { key: "name", header: "업무명", cell: (row) => <button className="font-semibold text-slate-950" onClick={() => setSelectedWorkflow(row)}>{row.name}</button> },
    {
      key: "dept",
      header: "부서",
      cell: (row) => organization.departments.find((department) => department.id === row.departmentId)?.name ?? row.departmentId,
    },
    { key: "usage", header: "월 사용량", cell: (row) => `${row.monthlyUsage.toLocaleString("ko-KR")}건` },
    { key: "intervention", header: "AI 개입률", cell: (row) => formatPercent(row.aiInterventionRate, 0) },
    { key: "saved", header: "평균 절감시간", cell: (row) => `${row.avgSavedMinutes.toFixed(2)}분` },
    { key: "route", header: "사용 모델 경로", cell: (row) => row.modelRoute },
    { key: "grade", header: "보안 등급", cell: (row) => <SecurityGradeBadge grade={row.securityGrade} /> },
    { key: "quality", header: "품질 승인률", cell: (row) => formatPercent(row.approvalRate) },
    { key: "cost", header: "비용", cell: (row) => formatCurrency(row.cost) },
    { key: "status", header: "상태", cell: (row) => <Badge>{row.status}</Badge> },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Workflow Management"
        title="업무 단위 관리"
        description="업무별 AI 개입률, 품질, 비용을 함께 보면서 확장 우선순위를 정합니다."
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-3">
          <input
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            placeholder="업무 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="all">전체 부서</option>
            {organization.departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">전체 상태</option>
            {Array.from(new Set(workflows.map((workflow) => workflow.status))).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            departmentName={organization.departments.find((department) => department.id === workflow.departmentId)?.name ?? workflow.departmentId}
            onOpen={() => setSelectedWorkflow(workflow)}
            onAddReport={() => createToast("월간 리포트에 추가", `${workflow.name}을(를) 이번 달 리포트 초안에 추가했습니다.`)}
          />
        ))}
      </div>

      <DataTable columns={columns} data={filtered} rowKey={(row) => row.id} />

      <Modal
        open={Boolean(selectedWorkflow)}
        onClose={() => setSelectedWorkflow(null)}
        title={selectedWorkflow?.name ?? "Workflow 상세"}
        description={selectedWorkflow?.recommendation}
      >
        {selectedWorkflow ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-4">
                <p className="text-sm text-slate-500">보안 등급</p>
                <div className="mt-3"><SecurityGradeBadge grade={selectedWorkflow.securityGrade} /></div>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-slate-500">처리량 증가</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{selectedWorkflow.throughputGrowth}%</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-slate-500">월 비용</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{formatCurrency(selectedWorkflow.cost)}</p>
              </Card>
            </div>
            <Card className="p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">추천 조치</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{selectedWorkflow.recommendation}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button onClick={() => createToast("튜닝 추천 보기", `${selectedWorkflow.name}의 튜닝 근거를 열었습니다.`)}>튜닝 추천 보기</Button>
                <Button variant="secondary" onClick={() => createToast("리포트 반영", `${selectedWorkflow.name}이(가) 경영진 리포트에 반영되었습니다.`)}>
                  월간 리포트에 추가
                </Button>
              </div>
            </Card>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
