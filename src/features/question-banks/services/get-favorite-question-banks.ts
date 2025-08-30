import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/core/firebase";
import type { QuestionBanksList } from "../domain/question-bank";
import { getEnabledQuestions } from "../utils/get-enabled-questions";

export async function getFavoriteQuestionBanks({
  userId,
}: {
  userId: string;
}): Promise<QuestionBanksList> {
  const q = query(collection(db, "banks"), where("userId", "==", userId), where("isFavorite", "==", true));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.get("name"),
    userId,
    questionsNumber: getEnabledQuestions(doc.get("questions")).length ?? 0,
    isFavorite: doc.get("isFavorite") ?? false,
  }));
}
