# Release AAB Runbook

## Current Target

- app label: `AI WorkOS`
- applicationId: `com.kmw1wlog.aiworkosconsole`
- WebView URL: `https://app-local-llm-core.vercel.app/`
- versionName: `0.1.1`
- versionCode: `2`

## Required Secrets

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

## Workflow

1. Push wrapper changes to `main`.
2. Wait for `Build Release AAB` on `main`, or run it manually with `workflow_dispatch`.
3. Download artifact `ai-workos-console-release-aab`.
4. Extract `android/app/build/outputs/bundle/release/app-release.aab`.
5. Upload it to Google Play Console closed testing.

## Security

Never commit:

- `release-keystore.jks`
- `release-keystore.base64`
- `key.properties`
- any secret values
