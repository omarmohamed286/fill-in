import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";
import { auth } from "@shared/firebaseConfig";
import { db } from "@shared/firebaseConfig";
import { getAdditionalUserInfo } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const authService = {
  register: async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
  },

  login: async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  signInWithGoogle: async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  },

  logout: async (): Promise<void> => {
    return await signOut(auth);
  },

  addUserToDB: async (credential: UserCredential) => {
    const userInfo = getAdditionalUserInfo(credential);
    const { uid } = credential.user;
    if (userInfo?.isNewUser) {
      await setDoc(doc(db, "users", uid), {
        id: uid,
        completedLessons: [],
      });
    }
  },
};
