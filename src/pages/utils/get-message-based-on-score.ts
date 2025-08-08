export const getMessageBasedOnScore = (
  score: number,
  questionsNumber?: number
) => {
  if (!questionsNumber) return "Error";
  if (score / questionsNumber >= 0.9) {
    return "quiz.results.congratulations";
  }
  if (score / questionsNumber >= 0.7) {
    return "quiz.results.very-good";
  }
  if (score / questionsNumber >= 0.5) {
    return "quiz.results.good";
  }
  return "quiz.results.not-worry";
};
