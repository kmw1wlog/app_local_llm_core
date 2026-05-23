"use client";

import { useMemo, useState } from "react";
import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { SecurityGradeBadge } from "@/components/domain/SecurityGradeBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Progress } from "@/components/ui/Progress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { agents, dataSources } from "@/lib/demo-data";
import { DataSource } from "@/lib/types";

export default function DataSourcesPage() {
  const { createToast } = useDemoConsole();
  const [sources, setSources] = useState(dataSources);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  const runProgress = (id: string, action: string) => {
    setProgressMap((current) => ({ ...current, [id]: 15 }));
    window.setTimeout(() => setProgressMap((current) => ({ ...current, [id]: 54 })), 300);
    window.setTimeout(() => setProgressMap((current) => ({ ...current, [id]: 100 })), 700);
    window.setTimeout(() => {
      setProgressMap((current) => ({ ...current, [id]: 0 }));
      setSources((current) =>
        current.map((source) =>
          source.id === id
            ? {
                ...source,
                status: "연결됨",
                indexingStatus: action === "인덱스 재생성" ? "정상" : source.indexingStatus,
                hasError: false,
                lastSync: "2026-05-24 09:05",
              }
            : source,
        ),
      );
      createToast(action, "상태가 최신 기준으로 갱신되었습니다.");
    }, 1200);
  };

  const columns: TableColumn<DataSource>[] = useMemo(
    () => [
      { key: "name", header: "데이터명", cell: (row) => <button className="font-semibold text-slate-950" onClick={() => setSelectedSource(row)}>{row.name}</button> },
      { key: "type", header: "유형", cell: (row) => row.type },
      { key: "status", header: "연결 상태", cell: (row) => row.status },
      { key: "last", header: "마지막 동기화", cell: (row) => row.lastSync },
      { key: "docs", header: "문서 수", cell: (row) => `${row.documentCount.toLocaleString("ko-KR")}개` },
      { key: "grade", header: "민감도 등급", cell: (row) => <SecurityGradeBadge grade={row.sensitivity} /> },
      { key: "access", header: "접근 권한", cell: (row) => row.accessPolicy },
      {
        key: "agents",
        header: "사용 중인 Agent",
        cell: (row) =>
          row.agentIds
            .map((id) => agents.find((agent) => agent.id === id)?.name)
            .filter(Boolean)
            .join(", "),
      },
      { key: "index", header: "인덱싱 상태", cell: (row) => row.indexingStatus },
      { key: "error", header: "오류 여부", cell: (row) => (row.hasError ? "오류 있음" : "정상") },
    ],
    [],
  );

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Data Sources"
        title="사내 데이터 연결 관리"
        description="권한 정책, 동기화 상태, 인덱싱 품질을 함께 관리합니다."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {sources.map((source) => (
          <Card key={source.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-slate-950">{source.name}</h3>
                  <SecurityGradeBadge grade={source.sensitivity} />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{source.summary}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{source.status}</span>
            </div>
            {progressMap[source.id] ? <Progress className="mt-4" value={progressMap[source.id]} tone="blue" /> : null}
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => runProgress(source.id, "동기화 실행")}>동기화 실행</Button>
              <Button variant="secondary" onClick={() => runProgress(source.id, "인덱스 재생성")}>인덱스 재생성</Button>
              <Button variant="ghost" onClick={() => runProgress(source.id, "민감도 재분류")}>민감도 재분류</Button>
              <Button onClick={() => setSelectedSource(source)}>권한 정책 확인</Button>
            </div>
          </Card>
        ))}
      </div>

      <DataTable columns={columns} data={sources} rowKey={(row) => row.id} />

      <Modal
        open={Boolean(selectedSource)}
        onClose={() => setSelectedSource(null)}
        title={selectedSource?.name ?? "권한 정책"}
        description="민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다."
      >
        {selectedSource ? (
          <div className="space-y-5">
            <Card className="p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">접근 권한</p>
              <p className="mt-3 text-sm text-slate-700">{selectedSource.accessPolicy}</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">사용 중인 Agent</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedSource.agentIds.map((id) => (
                  <span key={id} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    {agents.find((agent) => agent.id === id)?.name}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
