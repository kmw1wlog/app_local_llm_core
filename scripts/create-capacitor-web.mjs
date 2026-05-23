import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "capacitor-web");
const defaultRemoteUrl = "https://app-local-llm-core.vercel.app/";
const configuredUrl = process.env.WORKOS_APP_WEB_URL?.trim();
const targetUrl = configuredUrl || defaultRemoteUrl;

if (!targetUrl.startsWith("https://")) {
  throw new Error("WORKOS_APP_WEB_URL must start with https://");
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const html = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AI WorkOS Console</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f4f7fb;
        --card: #ffffff;
        --text: #0f172a;
        --muted: #475569;
        --accent: #2357d8;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background:
          radial-gradient(circle at top left, rgba(52,109,255,0.18), transparent 24rem),
          linear-gradient(180deg, #ffffff 0%, var(--bg) 100%);
        color: var(--text);
        font-family: "IBM Plex Sans", "Pretendard", "Apple SD Gothic Neo", sans-serif;
      }
      .card {
        width: min(92vw, 32rem);
        padding: 2rem;
        border-radius: 1.75rem;
        background: var(--card);
        box-shadow: 0 18px 42px rgba(15, 23, 42, 0.12);
      }
      h1 { margin: 0; font-size: 1.8rem; line-height: 1.2; }
      p { margin: 1rem 0 0; color: var(--muted); line-height: 1.7; }
      a {
        display: inline-flex;
        margin-top: 1.25rem;
        align-items: center;
        justify-content: center;
        min-height: 3rem;
        padding: 0 1rem;
        border-radius: 999px;
        background: var(--accent);
        color: white;
        text-decoration: none;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <main class="card">
      <h1>AI WorkOS Console을 여는 중입니다</h1>
      <p>자동으로 연결되지 않으면 아래 버튼으로 현재 공개 배포 주소를 열 수 있습니다.</p>
      <a href="${targetUrl}">웹앱 열기</a>
    </main>
    <script>
      window.setTimeout(function () {
        window.location.replace(${JSON.stringify(targetUrl)});
      }, 250);
    </script>
  </body>
</html>
`;

fs.writeFileSync(path.join(outDir, "index.html"), html);
