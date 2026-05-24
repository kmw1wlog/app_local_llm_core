# AI WorkOS Console

사내 LLM 도입 이후의 생산성, 비용, 보안, 품질, 파인튜닝, GPU 라우팅을 한 번에 관리하는 엔터프라이즈 데모 앱입니다.  
실제 API나 DB 없이 deterministic mock data만으로도 운영형 SaaS 콘솔처럼 시연할 수 있도록 구성했습니다.

## 실행 방법

```bash
npm install
npm run dev
npm run build
```

가능하면 추가 검증:

```bash
npm run lint
SMOKE_BASE_URL="https://app-local-llm-core.vercel.app" npm run smoke:pre-apk
```

## 사용 기술

- Next.js 15
- TypeScript
- App Router
- Tailwind CSS
- Recharts
- Lucide React
- Framer Motion
- clsx
- tailwind-merge

## 데모 조직 / 역할

- 조직명: `울산정밀부품`
- 업종: 자동차 부품 제조
- 임직원: 126명
- AI 도입 단계: `Pilot → Business 확장 검토`
- 역할 전환:
  - 대표/임원
  - AI 도입 담당자
  - IT/보안 담당자
  - 재무/구매 담당자
  - 현업 팀장
  - 일반 사용자
  - 우리 내부 운영자
  - GPU 파트너
  - 투자자/지원사업 담당자

상단 헤더의 역할 드롭다운을 바꾸면 Overview 우측 패널과 강조 지표가 달라집니다.

## 주요 페이지

- `/dashboard`: 전체 AI 도입 효과, 비용 절감, 활성률, 추천 조치
- `/impact`: 도입 전후 생산성 변화와 순효과 계산
- `/workflows`: 업무 단위별 성과, 비용, 품질, 튜닝 추천
- `/agents`: 업무별 AI Agent 카드, 상세 모달, 평가/정책/피드백
- `/data-sources`: 사내 데이터 연결, 동기화, 인덱싱, 권한 정책
- `/cost-router`: Secure Core / Cheap Edge 라우팅 정책, 비용 비교, 시뮬레이션
- `/security`: 감사 로그, 정책 차단, Data Flow Log, 다운로드
- `/fine-tuning`: 자동 파인튜닝 Job 관리
- `/quality`: 품질 지표, 평가표, 사용자 피드백
- `/adoption`: 부서별 도입률, 반복 사용자 비율, 교육 추천
- `/reports`: 이해관계자별 리포트 생성/미리보기
- `/billing`: 비용 항목, 부서별 배분, 순효과
- `/internal`: 내부 운영자용 고객 상태 콘솔
- `/gpu-partner`: Cheap Edge GPU 파트너 운영/정산 화면
- `/investor`: 투자자/지원사업용 익명 집계 리포트

## 배포 URL

- Web app: `https://app-local-llm-core.vercel.app/`

## Android APK / AAB

이 레포에는 Capacitor Android WebView wrapper가 함께 포함되어 있습니다.

주요 명령:

```bash
npm run cap:sync
npm run android:debug-apk
npm run android:release-aab
```

GitHub Actions:

- `Build Debug APK`: debug APK artifact 생성
- `Build Release AAB`: `main` 푸시 또는 수동 실행으로 서명된 release AAB artifact 생성

관련 문서:

- `docs/APK_WEB_URL_HANDOFF.md`
- `docs/PRE_APK_CHECKLIST.md`
- `docs/RELEASE_AAB_RUNBOOK.md`

참고:

- debug APK는 GitHub Actions artifact로 받는 흐름을 기본으로 잡았습니다.
- 이 로컬 환경에서는 Android SDK가 없어 `assembleDebug`까지는 실패했고, 실패 원인은 `sdk.dir / ANDROID_HOME 미설정`이었습니다.

## 데모 데이터

모든 데이터는 `src/lib/demo-data.ts`에 고정 정의되어 있으며 렌더링 때 랜덤 생성하지 않습니다.

포함된 주요 타입:

- `Organization`
- `Department`
- `UserRole`
- `Agent`
- `Workflow`
- `DataSource`
- `RoutingPolicy`
- `ExecutionLog`
- `CostMetric`
- `SecurityEvent`
- `FineTuneJob`
- `QualityMetric`
- `AdoptionMetric`
- `ReportItem`
- `GpuNode`
- `CustomerAccount`

핵심 계산 로직은 `src/lib/metrics.ts`에 분리되어 있습니다.

## 실제 API 연동 시 확장 방향

- `src/lib/demo-data.ts`를 API fetch layer로 치환
- `src/lib/metrics.ts`는 서버 응답 기반 계산 로직으로 재사용
- `DemoConsoleProvider`를 조직/권한/auth 상태 저장소로 확장
- `mock action` 버튼을 실제 mutation API와 optimistic UI로 연결
- 리포트, 감사 로그, 튜닝 Job은 백엔드 task queue와 연결

## 시연 포인트

1. `/dashboard`에서 ROI와 운영 상태를 바로 보여줍니다.
2. `/impact`에서 Baseline 기반 보수적 추정을 설명합니다.
3. `/agents`, `/data-sources`, `/cost-router`에서 제품 구조를 이해시킵니다.
4. `/security`에서 정책 차단과 감사 로그를 보여줍니다.
5. `/reports`, `/gpu-partner`, `/investor`로 확장성과 사업성을 이어서 설명할 수 있습니다.

## 보안 원칙

앱 전반에 다음 원칙을 반복 노출합니다.

- 민감 데이터는 외부 유휴 GPU로 라우팅되지 않습니다.
- 중요한 업무는 Secure Core에서, 반복 업무는 Cheap Edge에서 처리합니다.
- 고객별 구축이 아니라, 업무 템플릿과 튜닝 레시피가 축적되는 구조입니다.
