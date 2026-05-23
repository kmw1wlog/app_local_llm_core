"use client";

import { useState } from "react";
import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { agents, fineTuneJobs } from "@/lib/demo-data";
import { FineTuneJob } from "@/lib/types";

export default function FineTuningPage() {
  const { createToast } = useDemoConsole();
  const [jobs, setJobs] = useState(fineTuneJobs);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({
    agentId: agents[0].id,
    dataset: "최근 문서셋 120건",
    goal: "회사 업무 스타일 학습",
  });

  const createJob = () => {
    setJobs((current) => [
      {
        id: `ft-${current.length + 1}`,
        agentId: draft.agentId,
        dataset: draft.dataset,
        status: "준비 중",
        evaluationSetSize: 48,
        beforeScore: 82.1,
        afterScore: 87.4,
        costDelta: 3,
        deploymentStatus: "대기",
        goal: draft.goal,
        createdAt: "2026-05-24",
        rollbackAvailable: false,
      },
      ...current,
    ]);
    setOpen(false);
    createToast("튜닝 Job 생성", "새 튜닝 Job이 목록에 추가되었습니다.");
  };

  const columns: TableColumn<FineTuneJob>[] = [
    { key: "agent", header: "대상 Agent", cell: (row) => agents.find((agent) => agent.id === row.agentId)?.name ?? row.agentId },
    { key: "dataset", header: "사용 데이터셋", cell: (row) => row.dataset },
    { key: "status", header: "학습 상태", cell: (row) => <Badge>{row.status}</Badge> },
    { key: "eval", header: "평가셋 수", cell: (row) => `${row.evaluationSetSize}개` },
    { key: "before", header: "학습 전", cell: (row) => row.beforeScore.toFixed(1) },
    { key: "after", header: "학습 후", cell: (row) => row.afterScore.toFixed(1) },
    { key: "cost", header: "비용 변화", cell: (row) => `${row.costDelta > 0 ? "+" : ""}${row.costDelta}%` },
    { key: "deploy", header: "배포 상태", cell: (row) => row.deploymentStatus },
    {
      key: "action",
      header: "액션",
      cell: (row) => (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => {
            setJobs((current) => current.map((job) => job.id === row.id ? { ...job, status: "배포 완료", deploymentStatus: "프로덕션" } : job));
            createToast("배포 완료", `${agents.find((agent) => agent.id === row.agentId)?.name} 튜닝 결과를 배포했습니다.`);
          }}>배포</Button>
          <Button size="sm" variant="secondary" onClick={() => {
            setJobs((current) => current.map((job) => job.id === row.id ? { ...job, status: "롤백 가능", deploymentStatus: "이전 버전 복구" } : job));
            createToast("롤백 실행", "이전 모델 버전으로 복구했습니다.");
          }}>롤백</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Fine-Tuning"
        title="자동 파인튜닝 관리"
        description="우리 회사 업무 스타일 학습 상태를 Job 단위로 관리합니다."
        action={<Button onClick={() => setOpen(true)}>새 튜닝 Job 생성</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          "회의록 AI의 수정률이 높습니다. 회사 양식 기반 튜닝을 추천합니다.",
          "견적서 AI의 반복 질문이 증가했습니다. 최근 견적서 데이터를 반영해 재학습할 수 있습니다.",
          "문서검색 AI의 무응답률이 높습니다. 문서 인덱스 업데이트가 필요합니다.",
        ].map((item) => (
          <Card key={item} className="bg-slate-50 p-5 text-sm text-slate-700">{item}</Card>
        ))}
      </div>

      <DataTable columns={columns} data={jobs} rowKey={(row) => row.id} />

      <Modal open={open} onClose={() => setOpen(false)} title="새 튜닝 Job 생성" description="대상 Agent와 데이터셋을 선택하세요.">
        <div className="space-y-4">
          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <span className="mb-2 block font-medium">대상 Agent</span>
            <select className="w-full bg-transparent outline-none" value={draft.agentId} onChange={(e) => setDraft((current) => ({ ...current, agentId: e.target.value }))}>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
          </label>
          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <span className="mb-2 block font-medium">데이터셋</span>
            <input className="w-full bg-transparent outline-none" value={draft.dataset} onChange={(e) => setDraft((current) => ({ ...current, dataset: e.target.value }))} />
          </label>
          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <span className="mb-2 block font-medium">학습 목적</span>
            <input className="w-full bg-transparent outline-none" value={draft.goal} onChange={(e) => setDraft((current) => ({ ...current, goal: e.target.value }))} />
          </label>
          <Button onClick={createJob}>생성</Button>
        </div>
      </Modal>
    </div>
  );
}
