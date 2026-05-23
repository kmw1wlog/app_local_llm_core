"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  Cpu,
  Gauge,
  GitBranch,
  HardDrive,
  LineChart,
  Menu,
  Receipt,
  Rocket,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    title: "AI WorkOS",
    items: [
      { href: "/dashboard", label: "Overview", icon: Gauge },
      { href: "/impact", label: "AI Impact", icon: LineChart },
      { href: "/workflows", label: "Workflows", icon: BriefcaseBusiness },
      { href: "/agents", label: "Agents", icon: Sparkles },
      { href: "/data-sources", label: "Data Sources", icon: HardDrive },
      { href: "/cost-router", label: "Cost Router", icon: GitBranch },
      { href: "/fine-tuning", label: "Fine-Tuning", icon: Rocket },
      { href: "/quality", label: "Quality", icon: BarChart3 },
      { href: "/security", label: "Security", icon: Shield },
      { href: "/adoption", label: "Adoption", icon: Users },
      { href: "/reports", label: "Reports", icon: Building2 },
      { href: "/billing", label: "Billing", icon: Receipt },
    ],
  },
  {
    title: "Other Views",
    items: [
      { href: "/internal", label: "Internal Ops", icon: Users },
      { href: "/gpu-partner", label: "GPU Partner", icon: Cpu },
      { href: "/investor", label: "Investor View", icon: LineChart },
    ],
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#0f172a_0%,#162542_50%,#1f3258_100%)] text-slate-200">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Console</p>
          <h1 className="mt-1 text-xl font-semibold text-white">AI WorkOS</h1>
        </div>
        <button className="rounded-full p-2 text-slate-400 hover:bg-white/10 md:hidden" onClick={() => setOpen(false)}>
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{section.title}</p>
            <div className="mt-3 space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                      active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-4">
        <p className="text-xs text-slate-400">중요한 업무는 Secure Core에서, 반복 업무는 Cheap Edge에서 처리합니다.</p>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="fixed left-4 top-4 z-30 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5 text-slate-700" />
      </button>
      <aside className="hidden h-screen w-72 shrink-0 md:block">{sidebarContent}</aside>
      {open ? <div className="fixed inset-0 z-40 md:hidden">{sidebarContent}</div> : null}
    </>
  );
};
