"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { dateRanges, organization, roles } from "@/lib/demo-data";
import { UserRole } from "@/lib/types";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
}

interface DemoConsoleContextValue {
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  selectedRange: string;
  setSelectedRange: (range: string) => void;
  createToast: (title: string, description?: string) => void;
  toasts: ToastItem[];
  dismissToast: (id: number) => void;
}

const DemoConsoleContext = createContext<DemoConsoleContextValue | null>(null);

export const DemoConsoleProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(roles[0]);
  const [selectedRange, setSelectedRange] = useState(dateRanges[0].id);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const createToast = (title: string, description?: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((current) => [...current, { id, title, description }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  };

  const dismissToast = (id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const value = useMemo(
    () => ({
      selectedRole,
      setSelectedRole,
      selectedRange,
      setSelectedRange,
      createToast,
      toasts,
      dismissToast,
    }),
    [selectedRole, selectedRange, toasts],
  );

  return <DemoConsoleContext.Provider value={value}>{children}</DemoConsoleContext.Provider>;
};

export const useDemoConsole = () => {
  const context = useContext(DemoConsoleContext);
  if (!context) {
    throw new Error("useDemoConsole must be used within DemoConsoleProvider");
  }
  return context;
};

export const useOrganization = () => organization;
