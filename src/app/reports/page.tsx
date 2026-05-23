"use client";

import { useState } from "react";
import { useDemoConsole } from "@/components/providers/DemoConsoleProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { reports } from "@/lib/demo-data";
import { ReportItem } from "@/lib/types";

export default function ReportsPage() {
  const { createToast } = useDemoConsole();
  const [items, setItems] = useState(reports);
  const [selected, setSelected] = useState<ReportItem | null>(null);

  const generateAll = () => {
    setItems((current) => current.map((report) => ({ ...report, status: "공유 완료", updatedAt: "2026-05-24" })));
    createToast("이번 달 리포트 생성", "모든 이해관계자 리포트가 생성 완료 상태로 갱신되었습니다.");
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Reports"
        title="이해관계자별 리포트"
        description="경영진, 보안, 재무, 현업, 내부 운영자까지 같은 데이터로 다른 시점을 제공합니다."
        action={<Button onClick={generateAll}>이번 달 리포트 생성</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((report) => (
          <Card key={report.id} className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{report.audience}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">{report.title}</h3>
              </div>
              <Badge tone={report.status === "공유 완료" ? "green" : report.status === "생성 중" ? "blue" : "slate"}>{report.status}</Badge>
            </div>
            <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{report.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button onClick={() => setSelected(report)}>미리보기</Button>
              <Button variant="secondary" onClick={() => createToast("PDF 생성", `${report.title} PDF 생성 요청을 처리했습니다.`)}>PDF 생성</Button>
              <Button variant="ghost" onClick={() => createToast("이메일 공유", `${report.audience} 대상 이메일 공유를 예약했습니다.`)}>이메일 공유</Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.title ?? "리포트 미리보기"} description={selected?.audience}>
        {selected ? (
          <div className="space-y-5">
            <Card className="p-5">
              <p className="text-sm leading-7 text-slate-700">{selected.summary}</p>
            </Card>
            <div className="space-y-3">
              {selected.highlights.map((highlight) => (
                <Card key={highlight} className="p-4 text-sm text-slate-700">{highlight}</Card>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
