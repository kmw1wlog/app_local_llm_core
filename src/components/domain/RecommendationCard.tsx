import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const RecommendationCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <Card className="bg-[radial-gradient(circle_at_top_right,rgba(52,109,255,0.12),transparent_35%),white]">
    <div className="flex items-center gap-3">
      <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
        <Lightbulb className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">이번 기간에 바로 실행할 수 있는 운영 조치입니다.</p>
      </div>
    </div>
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {item}
        </div>
      ))}
    </div>
  </Card>
);
