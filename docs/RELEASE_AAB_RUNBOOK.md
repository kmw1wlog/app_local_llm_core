# Release AAB Runbook

## Current Target

- app label: `AI WorkOS`
- applicationId: `com.kmw1wlog.aiworkosconsole`
- WebView URL: `https://app-local-llm-core.vercel.app/`
- versionName: `0.1.0`
- versionCode: `1`

## Required Secrets

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

## Workflow

1. Push wrapper changes to `main`.
2. Run `Build Release AAB` manually.
3. Download artifact `ai-workos-console-release-aab`.
4. Extract `android/app/build/outputs/bundle/release/app-release.aab`.
5. Upload it to Google Play Console closed testing.

## Security

Never commit:

- `release-keystore.jks`
- `release-keystore.base64`
- `key.properties`
- any secret values
