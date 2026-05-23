import { Workflow } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatPercent } from "@/lib/format";
import { SecurityGradeBadge } from "@/components/domain/SecurityGradeBadge";

const statusTone: Record<Workflow["status"], "green" | "amber" | "red" | "blue" | "violet" | "slate"> = {
  "효과 높음": "green",
  "비용 과다": "amber",
  "품질 개선 필요": "red",
  "보안 검토 필요": "violet",
  "튜닝 추천": "blue",
  "사용 저조": "slate",
};

export const WorkflowCard = ({
  workflow,
  departmentName,
  onOpen,
  onAddReport,
}: {
  workflow: Workflow;
  departmentName: string;
  onOpen: () => void;
  onAddReport: () => void;
}) => (
  <Card className="flex h-full flex-col">
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-950">{workflow.name}</h3>
          <Badge tone={statusTone[workflow.status]}>{workflow.status}</Badge>
        </div>
        <p className="mt-2 text-sm text-slate-600">{departmentName} · {workflow.modelRoute}</p>
      </div>
      <SecurityGradeBadge grade={workflow.securityGrade} />
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3">
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">월 사용량</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">{workflow.monthlyUsage.toLocaleString("ko-KR")}건</p>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">AI 개입률</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">{formatPercent(workflow.aiInterventionRate, 0)}</p>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">평균 절감시간</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">{workflow.avgSavedMinutes.toFixed(2)}분</p>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">월 비용</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">{formatCurrency(workflow.cost)}</p>
      </div>
    </div>
    <p className="mt-5 text-sm text-slate-700">{workflow.recommendation}</p>
    <div className="mt-5 flex flex-wrap gap-2">
      <Button onClick={onOpen}>상세 보기</Button>
      <Button variant="secondary" onClick={onAddReport}>월간 리포트에 추가</Button>
    </div>
  </Card>
);
