import type { QuestionBank, QuestionBanksList } from "../domain/question-bank";

export const getInitialQuestionBank = (
  questionBanks: QuestionBanksList,
  id?: string
): QuestionBank | null => {
  if (!id) return null;
  const questionBank = questionBanks.find((item) => item.id === id);
  if (!questionBank) return null;
  return {
    ...questionBank,
    questions: [],
  };
};
