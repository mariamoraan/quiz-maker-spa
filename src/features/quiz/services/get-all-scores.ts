import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/core/firebase";
import type { Score } from "../domain/score";

export const getAllScores = async ({
  userId,
  bankId,
}: {
  userId: string;
  bankId: string;
}): Promise<Score[]> => {
  const q = query(
    collection(db, "scores"),
    where("userId", "==", userId),
    where("bankId", "==", bankId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    userId,
    bankId: bankId,
    date: doc.get("date"),
    answers: doc.get("answers"),
    score: doc.get("score"),
  }));
};
