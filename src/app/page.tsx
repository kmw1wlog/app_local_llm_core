"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-950">AI WorkOS Console</h1>
        <p className="mt-3 text-sm text-slate-600">대시보드로 이동 중입니다. 이동되지 않으면 아래 링크를 눌러 주세요.</p>
        <Link href="/dashboard" className="mt-5 inline-flex rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white">
          대시보드 열기
        </Link>
      </div>
    </div>
  );
}
