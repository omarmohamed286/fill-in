import { useQuery, skipToken } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserDataContext } from "src/contexts/UserDataContext";
import { db } from "@shared/firebaseConfig";

const useGetCompletedLessons = () => {
  const { user } = useContext(UserDataContext);
  const { isPending, data, error } = useQuery({
    queryKey: ["completedLessons"],
    queryFn: user
      ? async () => {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (!userDoc.exists()) {
            return [];
          }
          return userDoc.data()?.completedLessons || [];
        }
      : skipToken,
  });

  return { isPending, data, error };
};

export default useGetCompletedLessons;
