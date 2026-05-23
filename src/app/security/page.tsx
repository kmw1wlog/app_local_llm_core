"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { SecurityGradeBadge } from "@/components/domain/SecurityGradeBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { MetricCard } from "@/components/ui/MetricCard";
import { Modal } from "@/components/ui/Modal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { executionLogs, organization, securityEvents } from "@/lib/demo-data";
import { ExecutionLog } from "@/lib/types";

export default function SecurityPage() {
  const { createToast } = useDemoConsole();
  const [riskFilter, setRiskFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<ExecutionLog | null>(null);

  const filteredLogs = useMemo(
    () =>
      executionLogs.filter(
        (log) =>
          (riskFilter === "all" || log.riskLevel === riskFilter) &&
          (gradeFilter === "all" || log.sensitivityGrade === gradeFilter),
      ),
    [riskFilter, gradeFilter],
  );
  const flowLog = selectedLog ?? executionLogs[0];

  const columns: TableColumn<ExecutionLog>[] = [
    { key: "time", header: "시간", cell: (row) => row.time },
    { key: "user", header: "사용자", cell: (row) => row.user },
    { key: "task", header: "작업", cell: (row) => row.task },
    { key: "grade", header: "민감도 등급", cell: (row) => <SecurityGradeBadge grade={row.sensitivityGrade} /> },
    { key: "path", header: "처리 경로", cell: (row) => row.path },
    { key: "result", header: "정책 결과", cell: (row) => row.policyResult },
    { key: "risk", header: "위험도", cell: (row) => row.riskLevel },
    { key: "detail", header: "상세 보기", cell: (row) => <Button size="sm" onClick={() => setSelectedLog(row)}>상세 보기</Button> },
  ];

  const downloadAudit = () => {
    const blob = new Blob([JSON.stringify(filteredLogs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "audit-report.json";
    link.click();
    URL.revokeObjectURL(url);
    createToast("감사 리포트 다운로드", "mock JSON 감사 리포트를 생성했습니다.");
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Security"
        title="보안·감사 로그"
        description="IT/보안 담당자를 위한 정책 차단, 접근 통제, 감사 추적 화면입니다."
        action={
          <Button className="gap-2" onClick={downloadAudit}>
            <Download className="h-4 w-4" />
            감사 리포트 다운로드
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="정책 위반 차단" value={`${organization.securityBlocks}건`} helper="이번 달 누적" />
        <MetricCard title="외부 라우팅 차단" value={`${organization.externalRoutingBlocks}건`} helper="P0/P1 보호" />
        <MetricCard title="권한 없는 접근 시도" value="4건" helper="모두 차단" />
        <MetricCard title="감사 로그 저장 건수" value="11,842건" helper="100% 저장" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <h3 className="text-lg font-semibold text-slate-950">Data Flow Log</h3>
          <div className="mt-5 space-y-3">
            {flowLog.detailSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                  {index + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500">상세 보기로 다른 로그를 선택하면 이 흐름도 함께 바뀝니다.</p>
        </Card>
        <Card className="bg-slate-950 text-white">
          <h3 className="text-lg font-semibold">보안 스냅샷</h3>
          <div className="mt-5 space-y-3">
            {securityEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{event.type}</p>
                  <SecurityGradeBadge grade={event.sensitivity} />
                </div>
                <p className="mt-2 text-sm text-slate-300">{event.description}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-brand-200/30 bg-brand-500/10 p-4 text-sm text-brand-100">
              민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다.
            </div>
          </div>
        </Card>
      </section>

      <Card>
        <div className="grid gap-4 md:grid-cols-3">
          <select
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="all">전체 위험도</option>
            {Array.from(new Set(executionLogs.map((log) => log.riskLevel))).map((risk) => (
              <option key={risk} value={risk}>
                {risk}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
          >
            <option value="all">전체 민감도</option>
            {["P0", "P1", "P2", "P3", "P4"].map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5">
          <DataTable columns={columns} data={filteredLogs} rowKey={(row) => row.id} />
        </div>
      </Card>

      <Modal
        open={Boolean(selectedLog)}
        onClose={() => setSelectedLog(null)}
        title={selectedLog?.task ?? "로그 상세"}
        description={selectedLog?.policyResult}
      >
        {selectedLog ? (
          <div className="space-y-3">
            {selectedLog.detailSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                  {index + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
