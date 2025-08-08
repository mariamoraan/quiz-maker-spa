import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/core/firebase";
import type { QuestionBanksList } from "../domain/question-bank";

export async function getAllQuestionBanks({
  userId,
}: {
  userId: string;
}): Promise<QuestionBanksList> {
  const q = query(collection(db, "banks"), where("userId", "==", userId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.get("name"),
    userId,
    questionsNumber: doc.get("questions").length ?? 0,
  }));
}
