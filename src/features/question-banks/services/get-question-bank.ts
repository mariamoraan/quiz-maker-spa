import { db } from "@/core/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { QuestionBank } from "../domain/question-bank";
import { getEnabledQuestions } from "../utils/get-enabled-questions";

interface QuestionBankDTO {
  id: string;
  name: string;
  userId: string;
  questions: any[];
  isFavorite?: boolean;
}

const questionBankMapper = (data: QuestionBankDTO): QuestionBank => {
  return {
    id: data.id,
    name: data.name,
    userId: data.userId,
    questions: getEnabledQuestions(data.questions),
    isFavorite: data?.isFavorite,
  };
};

export async function getQuestionBank(
  id: string
): Promise<QuestionBank | null> {
  const ref = doc(db, "banks", id);
  const snap = await getDoc(ref);
  return snap.exists() ? questionBankMapper(snap.data() as QuestionBankDTO) : null;
}
