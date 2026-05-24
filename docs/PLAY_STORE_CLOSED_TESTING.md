# Play Store Closed Testing

`AI WorkOS Console` Android 앱은 `https://app-local-llm-core.vercel.app/`를 여는 WebView wrapper입니다. 이 문서는 closed testing용 release AAB 업로드 흐름을 간단히 정리합니다.

## 현재 기준

- applicationId: `com.kmw1wlog.aiworkosconsole`
- 앱 이름: `AI WorkOS`
- WebView URL: `https://app-local-llm-core.vercel.app/`
- Android release version: `0.1.1 (versionCode 2)`

## Debug APK와 Release AAB 차이

- `debug APK`: 폰에 직접 설치해 빠르게 테스트하는 용도
- `release AAB`: Google Play Console closed testing 업로드용

## AAB 생성 절차

1. GitHub Actions secrets에 signing 정보를 등록합니다.
2. `main` 푸시 후 자동 실행되거나, 필요 시 `Build Release AAB` workflow를 수동 실행합니다.
3. artifact `ai-workos-console-release-aab`를 다운로드합니다.
4. `app-release.aab`를 Play Console closed testing에 업로드합니다.

필요한 GitHub Secrets:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

## 업로드 전 체크

- `npm run build`
- `SMOKE_BASE_URL="https://app-local-llm-core.vercel.app" npm run smoke:pre-apk`
- debug APK artifact 확인
- applicationId 유지
- versionCode 증가 규칙 유지

## 보안 원칙

- keystore 파일은 레포에 커밋하지 않습니다.
- 민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다.
