import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/core/firebase";
import type { User as FirebaseUser } from "firebase/auth";
import type { User } from "../domain/user";

export async function getUser(credentials: FirebaseUser): Promise<User> {
  const userRef = doc(db, "users", credentials.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    return {
      uid: snap.id,
      email: snap.data().email,
      name: snap.data().name,
      createdAt: snap.data().createdAt,
    };
  }

  const newUser: User = {
    uid: credentials.uid,
    email: credentials.email ?? undefined,
    name: credentials.displayName ?? undefined,
    createdAt: new Date().toISOString(),
  };

  await setDoc(userRef, newUser);

  return newUser;
}
