import type { Lesson } from "@shared/customTypes";
import { useMutation } from "@tanstack/react-query";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@shared/firebaseConfig";

const useAddLesson = () => {
  const { isPending, mutate, error } = useMutation({
    mutationKey: ["addLesson"],
    mutationFn: ({
      categoryId,
      lesson,
    }: {
      categoryId: string;
      lesson: Partial<Lesson>;
    }) => {
      const ref = doc(collection(db, `categories/${categoryId}/lessons`));
      return setDoc(ref, {
        id: ref.id,
        ...lesson,
      });
    },
  });
  return { isPending, mutate, error };
};

export default useAddLesson;
