export const getMessageBasedOnScore = (
  score: number,
  questionsNumber?: number
) => {
  if (!questionsNumber) return "Error";
  if (score / questionsNumber >= 0.9) {
    return "quiz.results.congratulations";
  }
  if (score / questionsNumber >= 0.89) {
    return "quiz.results.very-good";
  }
  if (score / questionsNumber >= 0.69) {
    return "quiz.results.good";
  }
  return "quiz.results.not-worry";
};
