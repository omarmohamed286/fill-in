import { useQuery, skipToken } from "@tanstack/react-query";
import { type Lesson } from "../../customTypes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const useGetLessons = (categoryId: string) => {
  const { isPending, data, error } = useQuery({
    queryKey: ["lessons", categoryId],
    queryFn: categoryId
      ? () =>
          getDocs(collection(db, `categories/${categoryId}/lessons`)).then(
            (snap) => {
              const data: Lesson[] = [];
              snap.forEach((doc) => {
                data.push(doc.data() as Lesson);
              });
              return data;
            }
          )
      : skipToken,
  });

  return { isPending, data, error };
};

export default useGetLessons;
