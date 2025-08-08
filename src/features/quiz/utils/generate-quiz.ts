import type { QuestionBank } from "@/features/question-banks/domain/question-bank";
import { QUESTIONS_BY_QUIZ_NUMBER, type Quiz } from "../domain/quiz";
import type { Question } from "@/features/question-banks/domain/question";
import { generateUUID } from "@/core/utils/generate-uuid";

function getRandomUniqueElements<T>(array: T[], maxCount: number): T[] {
  // Hacemos una copia para no modificar el array original
  const arr = [...array];

  // Barajar con Fisher–Yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // índice aleatorio
    [arr[i], arr[j]] = [arr[j], arr[i]]; // intercambio
  }

  // Devolvemos los primeros maxCount elementos
  return arr.slice(0, Math.min(maxCount, arr.length));
}

export const generateQuiz = ({
  bank,
  userId,
}: {
  bank: QuestionBank;
  userId: string;
}) => {
  const randomSet: Question[] = getRandomUniqueElements(
    bank.questions,
    QUESTIONS_BY_QUIZ_NUMBER
  );
  const newQuiz: Quiz = {
    id: generateUUID(),
    questions: randomSet,
    userId,
  };

  return newQuiz;
};
