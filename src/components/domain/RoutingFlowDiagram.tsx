import { ArrowRight, Lock, ServerCog, Waves } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const RoutingFlowDiagram = () => (
  <Card className="overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(52,109,255,0.1),transparent_34%),white]">
    <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
      <div className="flex-1 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Secure Core</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">민감 업무 처리 영역</h3>
          </div>
          <Lock className="h-8 w-8 text-brand-600" />
        </div>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>사내 GPU</li>
          <li>보안 SOTA API</li>
          <li>사내 RAG</li>
          <li>민감 데이터 처리</li>
          <li>최종 검수</li>
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-full border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">
          정책 엔진 <ArrowRight className="h-4 w-4" /> 분류 / 라우팅
        </div>
      </div>
      <div className="flex-1 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Cheap Edge</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">반복·비민감 작업 처리</h3>
          </div>
          <Waves className="h-8 w-8 text-emerald-600" />
        </div>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>로컬 LLM</li>
          <li>저비용 모델</li>
          <li>유휴 GPU Pool</li>
          <li>비민감 반복/배치 작업</li>
          <li>후속 검수 가능</li>
        </ul>
      </div>
    </div>
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <ServerCog className="h-4 w-4" />
      <span className="font-semibold">민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다.</span>
      <Badge tone="amber">정책 고정</Badge>
    </div>
  </Card>
);
