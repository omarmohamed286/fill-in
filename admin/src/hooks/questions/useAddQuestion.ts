import type { Question } from "@shared/customTypes";
import { useMutation } from "@tanstack/react-query";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@shared/firebaseConfig";

const useAddQuestion = () => {
  const { isPending, mutate, error } = useMutation({
    mutationKey: ["addQuestion"],
    mutationFn: ({
      categoryId,
      lessonId,
      question,
    }: {
      categoryId: string;
      lessonId: string;
      question: Partial<Question>;
    }) => {
      const ref = doc(
        collection(db, `categories/${categoryId}/lessons/${lessonId}/questions`)
      );
      return setDoc(ref, {
        id: ref.id,
        ...question,
      });
    },
  });
  return { isPending, mutate, error };
};

export default useAddQuestion;
