import { Database, PlayCircle, ShieldCheck, Users } from "lucide-react";
import { Agent } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatNumber } from "@/lib/format";
import { SecurityGradeBadge } from "@/components/domain/SecurityGradeBadge";

export const AgentCard = ({
  agent,
  onOpen,
  onToggle,
}: {
  agent: Agent;
  onOpen: () => void;
  onToggle: () => void;
}) => (
  <Card className="flex h-full flex-col">
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-950">{agent.name}</h3>
          <Badge tone={agent.status === "활성" ? "green" : agent.status === "테스트 중" ? "blue" : "amber"}>{agent.status}</Badge>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{agent.summary}</p>
      </div>
      <SecurityGradeBadge grade={agent.securityGrade} />
    </div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"><Users className="h-4 w-4" /> 사용자 수</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">{formatNumber(agent.users)}명</p>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"><PlayCircle className="h-4 w-4" /> 이번 달 실행</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">{formatNumber(agent.monthlyRuns)}건</p>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"><Database className="h-4 w-4" /> 연결 데이터</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">{agent.connectedDataSourceIds.length}개</p>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"><ShieldCheck className="h-4 w-4" /> 월 비용</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">{formatCurrency(agent.cost)}</p>
      </div>
    </div>
    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">추천 조치</p>
      <p className="mt-2 text-sm text-slate-700">{agent.recommendation}</p>
    </div>
    <div className="mt-5 flex flex-wrap gap-2">
      <Button onClick={onOpen}>상세 보기</Button>
      <Button variant="secondary" onClick={onToggle}>
        {agent.enabled ? "비활성화" : "활성화"}
      </Button>
    </div>
  </Card>
);
