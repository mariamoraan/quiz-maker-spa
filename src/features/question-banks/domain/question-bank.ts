import type { Question } from "./question";

export interface QuestionBank {
  id: string;
  name: string;
  questions: Question[];
  userId: string;
  isFavorite?: boolean;
}

export type QuestionBanksListItem = (Omit<QuestionBank, "questions"> & {
  questionsNumber: number;
});

export type QuestionBanksList = QuestionBanksListItem[];
