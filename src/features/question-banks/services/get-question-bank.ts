import { db } from "@/core/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { QuestionBank } from "../domain/question-bank";

export async function getQuestionBank(
  id: string
): Promise<QuestionBank | null> {
  const ref = doc(db, "banks", id);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as QuestionBank) : null;
}
