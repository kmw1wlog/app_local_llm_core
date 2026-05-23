const baseUrl = process.env.SMOKE_BASE_URL || "https://app-local-llm-core.vercel.app";

type Check = {
  path: string;
  text?: string;
  timeoutMs?: number;
};

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        accept: "text/html,application/json",
      },
      cache: "no-store",
    });
    const body = await response.text();
    return { response, body, durationMs: Date.now() - started };
  } finally {
    clearTimeout(timer);
  }
}

function pass(message: string) {
  console.log(`[PASS] ${message}`);
}

function fail(message: string): never {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

async function runCheck(check: Check) {
  const target = `${baseUrl}${check.path}`;
  const { response, body, durationMs } = await fetchWithTimeout(target, check.timeoutMs ?? 5000);
  if (!response.ok) {
    fail(`${check.path} status=${response.status}`);
  }
  if (!body.length) {
    fail(`${check.path} returned empty body`);
  }
  if (check.text && !body.includes(check.text)) {
    fail(`${check.path} missing expected text: ${check.text}`);
  }
  pass(`${check.path} ${durationMs}ms`);
}

async function main() {
  console.log(`[INFO] smoke base url: ${baseUrl}`);
  if (!baseUrl.startsWith("https://") && !baseUrl.startsWith("http://localhost")) {
    fail("SMOKE_BASE_URL must be https:// or local http://localhost");
  }

  await runCheck({ path: "/", text: "AI WorkOS Console" });
  await runCheck({ path: "/dashboard", text: "사내 LLM 도입 이후 성과와 운영 상태를 한 화면에서 관리합니다." });
  await runCheck({ path: "/impact", text: "도입 전후 생산성·비용 효과 분석" });
  await runCheck({ path: "/agents", text: "업무별 AI Agent 관리" });
  await runCheck({ path: "/data-sources", text: "사내 데이터 연결 관리" });
  await runCheck({ path: "/cost-router", text: "Secure Core / Cheap Edge 비용 라우팅 관리" });
  await runCheck({ path: "/security", text: "보안·감사 로그" });
}

main().catch((error) => fail(error instanceof Error ? error.message : String(error)));
