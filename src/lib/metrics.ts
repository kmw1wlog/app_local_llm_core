import { agents, costMetrics, organization, qualityMetrics, workflows } from "@/lib/demo-data";
import { Agent, QualityMetric, Workflow } from "@/lib/types";

export const calculateSavedHours = (list: Workflow[] = workflows) =>
  Math.round(list.reduce((sum, workflow) => sum + (workflow.avgSavedMinutes * workflow.monthlyVolume) / 60, 0));

export const calculateEstimatedSavings = (hourlyRate = 21200) =>
  Math.round(calculateSavedHours() * hourlyRate);

export const calculateRoutingSavings = () => {
  const sotaOnlyCost = costMetrics.reduce((sum, item) => sum + item.sotaOnlyCost, 0);
  const actualCost = costMetrics.reduce((sum, item) => sum + item.actualCost, 0);
  const savings = sotaOnlyCost - actualCost;
  return {
    sotaOnlyCost,
    actualCost,
    savings,
    savingsRate: (savings / sotaOnlyCost) * 100,
  };
};

export const calculateNetEffect = (hourlyRate = 21200, subscriptionCost = 4200000, infraCost = 386000) =>
  calculateEstimatedSavings(hourlyRate) + calculateRoutingSavings().savings - subscriptionCost - infraCost;

export const calculateActiveRate = () => (organization.activeUsers / organization.eligibleUsers) * 100;

export const calculateQualityApprovalRate = () => {
  const total = qualityMetrics.reduce((sum, metric) => sum + metric.approvalRate, 0);
  return total / qualityMetrics.length;
};

export const getWorkflowStatus = (workflow: Workflow) => workflow.status;

export const getAgentHealth = (agent: Agent, metric?: QualityMetric) => {
  if (!metric) return agent.status;
  if (metric.status === "배포 중지 권장") return "배포 중지 권장";
  if (metric.status === "개선 필요" || agent.editRate > 22) return "개선 필요";
  if (metric.status === "주의" || agent.rerunRate > 12) return "주의";
  return "정상";
};

export const getTopWorkflowsByImpact = () =>
  [...workflows]
    .sort((a, b) => b.avgSavedMinutes * b.monthlyVolume - a.avgSavedMinutes * a.monthlyVolume)
    .slice(0, 5);

export const getAgentsNeedingAttention = () =>
  [...agents]
    .sort((a, b) => b.editRate + b.rerunRate - (a.editRate + a.rerunRate))
    .slice(0, 5);
