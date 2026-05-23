export type UserRole =
  | "대표/임원"
  | "AI 도입 담당자"
  | "IT/보안 담당자"
  | "재무/구매 담당자"
  | "현업 팀장"
  | "일반 사용자"
  | "우리 내부 운영자"
  | "GPU 파트너"
  | "투자자/지원사업 담당자";

export type SecurityGrade = "P0" | "P1" | "P2" | "P3" | "P4";
export type RiskLevel = "낮음" | "보통" | "높음" | "긴급";

export interface Department {
  id: string;
  name: string;
  headcount: number;
  activeUsers: number;
  savedHours: number;
  monthlyCost: number;
  adoptionRate: number;
  focusWorkflows: string[];
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  employeeCount: number;
  aiStage: string;
  periodStart: string;
  periodEnd: string;
  eligibleUsers: number;
  activeUsers: number;
  monthlyTasks: number;
  monthlySavedHours: number;
  monthlySavedCost: number;
  localLlmReplacementRate: number;
  cheapEdgeShare: number;
  qualityApprovalRate: number;
  securityBlocks: number;
  externalRoutingBlocks: number;
  departments: Department[];
}

export interface AgentFeedback {
  id: string;
  type: "좋음" | "수정 필요" | "틀림" | "민감정보 포함" | "근거 부족" | "형식 불일치";
  user: string;
  comment: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  departmentIds: string[];
  status: "활성" | "테스트 중" | "개선 필요";
  connectedDataSourceIds: string[];
  users: number;
  monthlyRuns: number;
  satisfaction: number;
  cost: number;
  securityGrade: SecurityGrade;
  recommendation: string;
  approvalRate: number;
  editRate: number;
  rerunRate: number;
  lastTunedAt: string;
  modelPath: string;
  summary: string;
  enabled: boolean;
  promptPolicy: string[];
  evaluationNotes: string[];
  tuningHistory: string[];
  feedback: AgentFeedback[];
}

export interface Workflow {
  id: string;
  name: string;
  departmentId: string;
  monthlyUsage: number;
  aiInterventionRate: number;
  avgSavedMinutes: number;
  modelRoute: string;
  securityGrade: SecurityGrade;
  approvalRate: number;
  cost: number;
  status:
    | "효과 높음"
    | "비용 과다"
    | "품질 개선 필요"
    | "보안 검토 필요"
    | "튜닝 추천"
    | "사용 저조";
  recommendation: string;
  beforeAvgMinutes: number;
  afterAvgMinutes: number;
  throughputGrowth: number;
  monthlyVolume: number;
  agentIds: string[];
}

export interface DataSource {
  id: string;
  name: string;
  type: string;
  status: "연결됨" | "동기화 중" | "주의 필요";
  lastSync: string;
  documentCount: number;
  sensitivity: SecurityGrade;
  accessPolicy: string;
  agentIds: string[];
  indexingStatus: "정상" | "재생성 필요" | "오류";
  hasError: boolean;
  summary: string;
}

export interface RoutingPolicy {
  grade: SecurityGrade;
  examples: string[];
  route: string;
  externalAllowed: boolean;
  description: string;
}

export interface ExecutionLog {
  id: string;
  time: string;
  user: string;
  task: string;
  sensitivityGrade: SecurityGrade;
  path: string;
  policyResult: string;
  riskLevel: RiskLevel;
  detailSteps: string[];
  workflowId?: string;
  agentId?: string;
  blocked?: boolean;
}

export interface CostMetric {
  category: string;
  sotaOnlyCost: number;
  actualCost: number;
  savings: number;
  savingsRate: number;
  usageShare: number;
}

export interface SecurityEvent {
  id: string;
  time: string;
  type: string;
  user: string;
  action: string;
  severity: RiskLevel;
  sensitivity: SecurityGrade;
  result: string;
  description: string;
  route: string;
  source: string;
}

export interface FineTuneJob {
  id: string;
  agentId: string;
  dataset: string;
  status: "준비 중" | "학습 중" | "평가 중" | "배포 완료" | "롤백 가능" | "실패";
  evaluationSetSize: number;
  beforeScore: number;
  afterScore: number;
  costDelta: number;
  deploymentStatus: string;
  goal: string;
  createdAt: string;
  rollbackAvailable: boolean;
}

export interface QualityTrendPoint {
  label: string;
  approvalRate: number;
  editRate: number;
  reaskRate: number;
  hallucinationRate: number;
  citationRate: number;
}

export interface QualityMetric {
  agentId: string;
  approvalRate: number;
  editRate: number;
  reaskRate: number;
  hallucinationRate: number;
  citationRate: number;
  evalPassRate: number;
  sotaScore: number;
  localScore: number;
  status: "정상" | "주의" | "개선 필요" | "배포 중지 권장";
  trend: QualityTrendPoint[];
}

export interface AdoptionMetric {
  departmentId: string;
  totalUsers: number;
  activeUsers: number;
  repeatUserRate: number;
  dropOffCount: number;
  satisfaction: number;
  primaryAgent: string;
  painPoint: string;
  weeklyTrend: { label: string; activeRate: number }[];
}

export interface ReportItem {
  id: string;
  title: string;
  audience: string;
  status: "준비됨" | "생성 중" | "공유 완료";
  updatedAt: string;
  summary: string;
  highlights: string[];
}

export interface GpuNode {
  id: string;
  partnerName: string;
  label: string;
  totalGpu: number;
  activeGpu: number;
  todayRevenue: number;
  monthlyPayoutForecast: number;
  hours: number;
  avgTemp: number;
  interruptions: number;
  priorityReturns: number;
  status: "정상" | "주의" | "점검 필요";
  maxTemp: number;
  maxUtilization: number;
  schedule: string;
  autoInterrupt: boolean;
}

export interface CustomerAccount {
  id: string;
  name: string;
  mrr: number;
  activeUsers: number;
  usageGrowth: number;
  costMargin: number;
  qualityComplaints: number;
  securityAlerts: number;
  tuningNeed: string;
  renewalRisk: "정상" | "확장 가능" | "비용 과다" | "사용률 저조" | "품질 이슈" | "이탈 위험" | "긴급 대응";
  expansionOpportunity: string;
  nextAction: string;
}
