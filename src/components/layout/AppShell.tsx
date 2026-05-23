import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { DemoConsoleProvider } from "@/components/providers/DemoConsoleProvider";
import { ToastViewport } from "@/components/providers/ToastViewport";

export const AppShell = ({ children }: { children: ReactNode }) => (
  <DemoConsoleProvider>
    <div className="flex min-h-screen bg-shell text-slate-900">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar />
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
      <ToastViewport />
    </div>
  </DemoConsoleProvider>
);
