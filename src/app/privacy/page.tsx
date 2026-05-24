import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "개인정보처리방침 | AI WorkOS",
  description: "AI WorkOS Android 앱 개인정보처리방침",
};

const summaryItems = [
  { label: "앱 이름", value: "AI WorkOS" },
  { label: "패키지명", value: "com.kmw1wlog.aiworkosconsole" },
  { label: "시행일", value: "2026년 5월 24일" },
  { label: "문의", value: "kmw1wlog@gmail.com" },
];

const sections = [
  {
    title: "1. 총칙",
    paragraphs: [
      "AI WorkOS는 이용자의 개인정보를 중요하게 생각하며, 관련 법령과 Google Play 사용자 데이터 정책을 준수하기 위해 본 개인정보처리방침을 제공합니다.",
      "본 개인정보처리방침은 AI WorkOS Android 앱과 해당 앱이 연결하는 웹 기반 서비스 화면에서 이용자 정보가 어떤 방식으로 처리될 수 있는지를 설명합니다.",
      "현재 확인된 앱 구성 기준으로 본 앱은 별도의 회원가입 기능을 제공하지 않으며, 이름, 이메일 주소, 전화번호, 주소, 주민등록번호와 같은 직접 식별 정보를 앱 내부 입력 항목으로 필수 요구하지 않습니다.",
      "다만 이용자가 문의를 위해 이메일을 발송하는 경우, 답변을 위해 이메일 주소와 문의 내용이 처리될 수 있습니다.",
    ],
  },
  {
    title: "2. 수집하는 개인정보 항목",
    paragraphs: [
      "본 앱은 기본적으로 회원가입을 요구하지 않습니다.",
      "현재 앱 코드와 Android 설정 기준으로 확인된 범위에서, 앱은 인터넷 연결을 통해 배포된 웹 화면을 불러오기 위해 최소한의 네트워크 연결 정보를 사용할 수 있습니다.",
      "앱 기능 제공 과정에서 다음 정보가 제한적으로 처리될 수 있습니다: 브라우저 또는 WebView 세션에서 일시적으로 처리되는 화면 상태 정보, 앱 실행 및 오류 발생 시 생성될 수 있는 비식별 오류 정보, 앱 안정성 개선을 위한 기기 및 앱 환경 정보, Google Play 또는 운영체제·플랫폼이 제공하는 비식별 통계 정보, 이용자가 이메일로 직접 문의하는 경우의 이메일 주소와 문의 내용.",
      "현재 확인된 코드 기준으로 카메라, 마이크, 정확한 위치정보, 연락처, 문자메시지, 통화기록, 광고 ID, 건강정보, 생체정보, 사진첩 접근 권한은 사용하지 않습니다.",
      "AndroidManifest 기준으로 네이티브 권한은 인터넷 사용 권한(android.permission.INTERNET)만 확인되었습니다.",
    ],
  },
  {
    title: "3. 개인정보의 이용 목적",
    paragraphs: [
      "처리되는 정보는 앱 화면 제공, 앱 접속 유지, 서비스 품질 확인, 오류 분석, 안정성 개선, 사용자 문의 응대, Google Play 정책 준수 및 앱 운영 관리 목적으로 사용될 수 있습니다.",
      "현재 앱은 데모 성격의 콘솔 화면을 제공하며, 확인된 범위에서는 별도 계정 기반 마케팅 활용이나 광고 맞춤화 목적으로 개인정보를 수집하지 않습니다.",
    ],
  },
  {
    title: "4. 개인정보의 보관 및 파기",
    paragraphs: [
      "현재 확인된 앱 구성상 별도의 회원 DB나 앱 내 직접 가입 저장 기능은 포함되어 있지 않습니다.",
      "이용 중 일시적으로 처리되는 화면 상태나 브라우저 세션 정보는 앱 종료, 세션 만료, 앱 삭제 또는 앱 데이터 삭제 시 함께 사라질 수 있습니다.",
      "이메일 문의 기록은 문의 응대 및 분쟁 대응을 위해 필요한 기간 동안 보관될 수 있으며, 목적 달성 후 지체 없이 삭제합니다.",
      "관련 법령에 따라 보관이 필요한 경우에는 해당 법령이 정한 기간 동안 보관할 수 있습니다.",
    ],
  },
  {
    title: "5. 개인정보의 제3자 제공",
    paragraphs: [
      "본 앱은 이용자의 개인정보를 제3자에게 판매하거나 임의로 제공하지 않습니다.",
      "다만 법령에 따라 요구되는 경우, 이용자가 사전에 동의한 경우, 또는 Google Play, Android 운영체제, 앱 배포 플랫폼이 자체 정책에 따라 비식별 정보를 처리하는 경우에는 예외가 발생할 수 있습니다.",
    ],
  },
  {
    title: "6. 개인정보 처리의 위탁 및 외부 서비스",
    paragraphs: [
      "현재 확인된 앱 구조상 다음과 같은 외부 서비스 또는 플랫폼이 사용될 수 있습니다: Google Play Console, Android 운영체제 및 Google Play Services, 앱 배포 및 호스팅을 위한 Vercel 배포 환경, 이용자가 직접 문의하는 경우의 이메일 서비스.",
      "외부 서비스는 각 서비스 제공자의 정책에 따라 기기 정보, 접속 로그, 오류 정보 등 비식별 정보 또는 서비스 제공에 필요한 최소 정보 범위를 처리할 수 있습니다.",
      "현재 확인된 코드 기준으로 Firebase Analytics, Crashlytics, AdMob, Sentry, 별도 광고 SDK, 별도 회원 인증 SDK는 포함되어 있지 않습니다.",
    ],
  },
  {
    title: "7. 민감한 사용자 및 기기 데이터 처리",
    paragraphs: [
      "본 앱은 원칙적으로 건강정보, 금융정보, 생체정보, 정확한 위치정보, 연락처, 문자메시지, 통화기록, 사진, 동영상, 오디오, 캘린더와 같은 민감한 사용자 데이터를 수집하지 않습니다.",
      "또한 앱 기능상 필요하지 않은 광고 ID, SIM 정보, IMEI, MAC 주소 등 민감한 기기 식별정보를 의도적으로 수집하지 않습니다.",
      "향후 기능 변경으로 민감한 사용자 또는 기기 데이터를 처리하게 되는 경우에는 사전에 이용자에게 명확히 고지하고 필요한 절차를 거쳐 처리합니다.",
    ],
  },
  {
    title: "8. 아동의 개인정보 보호",
    paragraphs: [
      "본 앱은 원칙적으로 만 13세 미만 아동을 주된 대상으로 하지 않습니다.",
      "만 13세 미만 아동의 개인정보를 고의로 수집하지 않으며, 그러한 정보가 수집된 사실을 알게 되는 경우 합리적인 범위에서 지체 없이 삭제하기 위해 노력합니다.",
      "향후 타겟 연령층 정책이 변경되는 경우 관련 법령과 Google Play Families 정책을 준수합니다.",
    ],
  },
  {
    title: "9. 이용자의 권리",
    paragraphs: [
      "이용자는 개인정보 처리와 관련하여 열람, 정정, 삭제, 처리정지, 동의 철회 요청을 할 수 있습니다.",
      "현재 앱은 별도 계정 시스템을 제공하지 않으므로, 관련 요청은 아래 문의처 이메일을 통해 접수할 수 있습니다.",
    ],
  },
  {
    title: "10. 개인정보 보호를 위한 조치",
    paragraphs: [
      "본 앱은 불필요한 개인정보 수집을 최소화하고, 앱 기능 수행에 필요한 범위 안에서만 정보를 처리하도록 설계합니다.",
      "또한 민감한 권한 사용 최소화, HTTPS 기반 접속 사용, 오류 및 문의 대응 정보에 대한 접근 제한 등 합리적인 보호 조치를 적용하기 위해 노력합니다.",
    ],
  },
  {
    title: "11. 개인정보처리방침의 변경",
    paragraphs: [
      "본 개인정보처리방침은 앱 기능 변경, 법령 개정, Google Play 정책 변경, 운영 방식 변경에 따라 수정될 수 있습니다.",
      "변경이 있는 경우 본 페이지를 통해 변경 내용을 안내합니다.",
    ],
  },
  {
    title: "12. 문의처",
    paragraphs: [
      "개인정보 처리와 관련한 문의는 아래 이메일로 연락하실 수 있습니다.",
      "이메일: kmw1wlog@gmail.com",
      "시행일: 2026년 5월 24일",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <SectionHeader
        eyebrow="Privacy Policy"
        title="개인정보처리방침"
        description="Google Play Console 제출 및 공개 안내용 문서입니다."
      />

      <Card className="space-y-8 p-0">
        <div className="rounded-t-[24px] border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-8 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
            Public Policy Document
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">개인정보처리방침</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            본 페이지는 AI WorkOS Android 앱의 개인정보 처리 방침을 한국어 기준으로 정리한 공개 문서입니다.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {summaryItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
                <p className="mt-2 break-all text-sm font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 md:px-8 md:pb-8">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 px-5 py-4 text-sm leading-7 text-slate-700">
            본 문서는 2026년 5월 25일 기준 저장소의 Android 설정, 앱 패키지, 네이티브 권한, 의존성,
            배포 구성을 바탕으로 작성되었습니다. 확인되지 않은 항목은 단정하지 않고 보수적으로 표현했습니다.
          </div>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="border-b border-slate-200 pb-8 last:border-b-0 last:pb-0">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">{section.title}</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
            <p>본 페이지는 Google Play Console 제출용 개인정보처리방침 URL로 사용됩니다.</p>
            <p className="mt-1">최종 업데이트: 2026년 5월 25일</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
