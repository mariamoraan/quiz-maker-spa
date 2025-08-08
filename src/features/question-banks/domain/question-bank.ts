import type { Question } from "./question";

export interface QuestionBank {
  id: string;
  name: string;
  questions: Question[];
  userId: string;
}

export type QuestionBanksList = (Omit<QuestionBank, "questions"> & {
  questionsNumber: number;
})[];
