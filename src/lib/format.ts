export const formatNumber = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export const formatCurrency = (value: number) =>
  `${new Intl.NumberFormat("ko-KR").format(value)}원`;

export const formatPercent = (value: number, digits = 1) => `${value.toFixed(digits)}%`;

export const formatHours = (value: number) => `${formatNumber(value)}시간`;
