import { useQuery, skipToken } from "@tanstack/react-query";
import { type Question } from "../../customTypes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const useGetLessons = (categoryId?: string, lessonId?: string) => {
  const { isPending, data, error } = useQuery({
    queryKey: ["questions", categoryId, lessonId],
    queryFn:
      categoryId && lessonId
        ? () =>
            getDocs(
              collection(
                db,
                `categories/${categoryId}/lessons/${lessonId}/questions`
              )
            ).then((snap) => {
              const data: Question[] = [];
              snap.forEach((doc) => {
                data.push(doc.data() as Question);
              });
              return data;
            })
        : skipToken,
  });

  return { isPending, data, error };
};

export default useGetLessons;
