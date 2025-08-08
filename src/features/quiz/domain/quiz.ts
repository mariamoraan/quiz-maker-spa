import type { Question } from "@/features/question-banks/domain/question";

export interface Quiz {
  id: string;
  questions: Question[];
  userId: string;
}

export const QUESTIONS_BY_QUIZ_NUMBER = 20;
