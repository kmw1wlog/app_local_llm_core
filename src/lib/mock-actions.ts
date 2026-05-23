export const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockSuccessMessage = {
  report: "월간 리포트 생성이 완료되었습니다.",
  tuning: "튜닝 Job이 생성되었습니다.",
  reevaluate: "재평가 작업을 큐에 등록했습니다.",
  sync: "동기화 요청을 전송했습니다.",
  routing: "라우팅 시뮬레이션 결과를 갱신했습니다.",
};
