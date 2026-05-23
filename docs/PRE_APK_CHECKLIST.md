# Pre-APK Checklist

## Baseline

- Repository: `kmw1wlog/app_local_llm_core`
- Web deployment URL: `https://app-local-llm-core.vercel.app/`
- APK wrapper target: `AI WorkOS Console`

## Required Checks Before APK Wrapping

1. Install dependencies:
   - `npm install`
2. Verify production build:
   - `npm run build`
3. Verify deployed HTTPS smoke:
   - `SMOKE_BASE_URL="https://app-local-llm-core.vercel.app" npm run smoke:pre-apk`
4. Prepare Capacitor wrapper:
   - `npm run cap:sync`
5. Build debug APK when Android SDK is available:
   - `npm run android:debug-apk`

## Smoke Script

- Script: `scripts/smoke-pre-apk.ts`
- Command: `npm run smoke:pre-apk`
- Checked routes:
  - `/`
  - `/dashboard`
  - `/impact`
  - `/agents`
  - `/data-sources`
  - `/cost-router`
  - `/security`

## HTTPS URL Requirement

The Android wrapper must open a real HTTPS URL. Current target:

```text
https://app-local-llm-core.vercel.app/
```

## Manual Android Browser Check

1. `/dashboard` loads within about 5 seconds.
2. Overview cards are visible.
3. `/agents` modal interactions work.
4. `/cost-router` simulation works.
5. `/security` table and detail modal work.
6. Scroll, back navigation, and insets feel correct.

## Decision Rule

APK wrapping may proceed only when:

- `npm run build` succeeds
- deployed HTTPS smoke succeeds
- the Android wrapper uses the approved HTTPS URL
