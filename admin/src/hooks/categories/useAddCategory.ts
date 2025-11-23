import type { Category } from "@shared/customTypes";
import { useMutation } from "@tanstack/react-query";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@shared/firebaseConfig";

const useAddCategory = () => {
  const { isPending, mutate, error } = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: (category: Partial<Category>) => {
      const ref = doc(collection(db, "categories"));
      return setDoc(ref, {
        id: ref.id,
        ...category,
      });
    },
  });
  return { isPending, mutate, error };
};

export default useAddCategory;
