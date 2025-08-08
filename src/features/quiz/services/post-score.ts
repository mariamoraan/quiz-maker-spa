import { doc, setDoc } from "firebase/firestore";
import { db } from "@/core/firebase";
import type { Score } from "../domain/score";

export async function postScore(score: Score) {
  const ref = doc(db, "scores", score.id);
  await setDoc(ref, score);
}
