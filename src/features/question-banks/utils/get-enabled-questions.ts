import type { Question } from "../domain/question";

export const getEnabledQuestions = (questions: Question[]) => {
  return questions.filter((question) => !question?.isDisabled);
};
