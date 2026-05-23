"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export const Tabs = ({ items, defaultTab }: { items: TabItem[]; defaultTab?: string }) => {
  const [activeTab, setActiveTab] = useState(defaultTab ?? items[0]?.id);
  const tab = items.find((item) => item.id === activeTab) ?? items[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "rounded-xl px-3 py-2 text-sm font-medium transition",
              item.id === activeTab ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800",
            )}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tab?.content}</div>
    </div>
  );
};
