import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <Card className="border-dashed text-center">
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm text-slate-600">{description}</p>
    {action ? <div className="mt-4">{action}</div> : null}
  </Card>
);
