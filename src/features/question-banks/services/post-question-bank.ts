import { doc, setDoc } from "firebase/firestore";
import { db } from "@/core/firebase";
import type { QuestionBank } from "../domain/question-bank";

export async function postQuestionBank(bank: QuestionBank) {
  const ref = doc(db, "banks", bank.id);
  await setDoc(ref, bank);
}
