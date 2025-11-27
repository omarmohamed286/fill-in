import { useMutation } from "@tanstack/react-query";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserDataContext } from "src/contexts/UserDataContext";
import { db } from "@shared/firebaseConfig";
import { useNavigate } from "react-router";

const useAddCompletedLesson = () => {
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();
  const { isPending, mutate, error } = useMutation({
    mutationKey: ["addCompletedLesson"],
    mutationFn: (lessonId?: string) => {
      return updateDoc(doc(db, "users", user?.uid!), {
        completedLessons: arrayUnion(lessonId),
      });
    },
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      console.log("Error Adding Completed Lesson:", error);
    },
  });
  return { isPending, mutate, error };
};

export default useAddCompletedLesson;
