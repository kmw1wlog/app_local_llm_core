# APK Web URL Handoff

## Production URL

Use this exact URL for `AI WorkOS Console`:

```text
https://app-local-llm-core.vercel.app/
```

## Why This URL

- this is the current Vercel production deployment URL
- the Android WebView wrapper should point to a real HTTPS app URL
- web-only updates can be reflected without rebuilding the APK

Do not use:

- local development URLs
- branch preview URLs for release builds
- HTTP URLs

## Remote Smoke Command

```bash
SMOKE_BASE_URL="https://app-local-llm-core.vercel.app" npm run smoke:pre-apk
```

Expected:

- `/` pass
- `/dashboard` pass
- `/impact` pass
- `/agents` pass
- `/data-sources` pass
- `/cost-router` pass
- `/security` pass

## Update Policy

- UI/data copy changes in the web app do not require a new APK if the wrapper URL stays the same.
- Native setting changes do require a new APK or AAB.
- 민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다.
