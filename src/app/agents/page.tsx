"use client";

import { useMemo, useState } from "react";
import { AgentCard } from "@/components/domain/AgentCard";
import { SecurityGradeBadge } from "@/components/domain/SecurityGradeBadge";
import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs } from "@/components/ui/Tabs";
import { agents, dataSources, fineTuneJobs, qualityMetrics } from "@/lib/demo-data";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Agent } from "@/lib/types";

export default function AgentsPage() {
  const { createToast } = useDemoConsole();
  const [agentState, setAgentState] = useState(agents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const selectedQuality = useMemo(
    () => qualityMetrics.find((metric) => metric.agentId === selectedAgent?.id),
    [selectedAgent],
  );

  const toggleAgent = (agentId: string) => {
    setAgentState((current) =>
      current.map((agent) => (agent.id === agentId ? { ...agent, enabled: !agent.enabled } : agent)),
    );
    const target = agentState.find((agent) => agent.id === agentId);
    createToast("Agent 상태 변경", `${target?.name}을(를) ${target?.enabled ? "비활성화" : "활성화"}했습니다.`);
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Agent Console"
        title="업무별 AI Agent 관리"
        description="사내 데이터를 넣으면 업무별 AI Agent가 자동 생성됩니다. 상태, 비용, 품질, 정책을 여기서 함께 관리합니다."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {agentState.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onOpen={() => setSelectedAgent(agent)}
            onToggle={() => toggleAgent(agent.id)}
          />
        ))}
      </div>

      <Modal
        open={Boolean(selectedAgent)}
        onClose={() => setSelectedAgent(null)}
        title={selectedAgent?.name ?? "Agent 상세"}
        description={selectedAgent?.summary}
      >
        {selectedAgent ? (
          <Tabs
            items={[
              {
                id: "overview",
                label: "개요",
                content: (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="p-4">
                      <p className="text-sm text-slate-500">상태</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge tone={selectedAgent.status === "활성" ? "green" : selectedAgent.status === "테스트 중" ? "blue" : "amber"}>{selectedAgent.status}</Badge>
                        <SecurityGradeBadge grade={selectedAgent.securityGrade} />
                      </div>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-slate-500">이번 달 비용</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-950">{formatCurrency(selectedAgent.cost)}</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-slate-500">승인률</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-950">{formatPercent(selectedAgent.approvalRate)}</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-slate-500">만족도</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-950">{selectedAgent.satisfaction.toFixed(1)} / 5.0</p>
                    </Card>
                  </div>
                ),
              },
              {
                id: "usage",
                label: "사용량",
                content: (
                  <Card className="p-5">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm text-slate-500">사용자 수</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-950">{selectedAgent.users}명</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">이번 달 실행 수</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-950">{selectedAgent.monthlyRuns.toLocaleString("ko-KR")}건</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">재질문률</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-950">{formatPercent(selectedAgent.rerunRate)}</p>
                      </div>
                    </div>
                  </Card>
                ),
              },
              {
                id: "data",
                label: "연결 데이터",
                content: (
                  <div className="space-y-3">
                    {dataSources
                      .filter((source) => selectedAgent.connectedDataSourceIds.includes(source.id))
                      .map((source) => (
                        <Card key={source.id} className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold text-slate-950">{source.name}</h3>
                              <p className="mt-1 text-sm text-slate-600">{source.summary}</p>
                            </div>
                            <SecurityGradeBadge grade={source.sensitivity} />
                          </div>
                        </Card>
                      ))}
                  </div>
                ),
              },
              {
                id: "prompt",
                label: "프롬프트/정책",
                content: (
                  <Card className="p-5">
                    <div className="space-y-3">
                      {selectedAgent.promptPolicy.map((policy) => (
                        <div key={policy} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          {policy}
                        </div>
                      ))}
                    </div>
                  </Card>
                ),
              },
              {
                id: "model",
                label: "사용 모델",
                content: (
                  <Card className="p-5">
                    <p className="text-sm text-slate-500">사용 모델 경로</p>
                    <p className="mt-3 text-lg font-semibold text-slate-950">{selectedAgent.modelPath}</p>
                    <p className="mt-3 text-sm text-slate-600">민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다.</p>
                  </Card>
                ),
              },
              {
                id: "eval",
                label: "평가 결과",
                content: (
                  <Card className="p-5">
                    {selectedQuality ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-slate-500">평가셋 통과율</p>
                          <p className="mt-2 text-2xl font-semibold text-slate-950">{formatPercent(selectedQuality.evalPassRate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">근거 문서 인용률</p>
                          <p className="mt-2 text-2xl font-semibold text-slate-950">{formatPercent(selectedQuality.citationRate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">SOTA 대비 점수</p>
                          <p className="mt-2 text-2xl font-semibold text-slate-950">{selectedQuality.sotaScore}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">로컬 모델 대비 점수</p>
                          <p className="mt-2 text-2xl font-semibold text-slate-950">{selectedQuality.localScore}</p>
                        </div>
                      </div>
                    ) : null}
                  </Card>
                ),
              },
              {
                id: "feedback",
                label: "피드백",
                content: (
                  <div className="space-y-3">
                    {selectedAgent.feedback.map((feedback) => (
                      <Card key={feedback.id} className="p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-950">{feedback.type}</p>
                            <p className="mt-1 text-sm text-slate-600">{feedback.comment}</p>
                          </div>
                          <span className="text-xs text-slate-500">{feedback.user} · {feedback.createdAt}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                ),
              },
              {
                id: "tuning",
                label: "튜닝 이력",
                content: (
                  <div className="space-y-3">
                    {fineTuneJobs
                      .filter((job) => job.agentId === selectedAgent.id)
                      .map((job) => (
                        <Card key={job.id} className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-950">{job.goal}</p>
                              <p className="mt-1 text-sm text-slate-600">{job.dataset}</p>
                            </div>
                            <Badge>{job.status}</Badge>
                          </div>
                        </Card>
                      ))}
                  </div>
                ),
              },
            ]}
          />
        ) : null}
        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={() => createToast("재평가 실행", `${selectedAgent?.name} 재평가를 큐에 등록했습니다.`)}>재평가 실행</Button>
          <Button variant="secondary" onClick={() => createToast("튜닝 Job 생성", `${selectedAgent?.name} 튜닝 Job 생성을 시작했습니다.`)}>
            튜닝 Job 생성
          </Button>
          <Button variant="ghost" onClick={() => createToast("관련 데이터 보기", "연결된 데이터 소스 상세 화면으로 이동할 수 있도록 준비했습니다.")}>
            관련 데이터 보기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
