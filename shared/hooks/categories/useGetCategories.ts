import { useQuery } from "@tanstack/react-query";
import { type Category } from "../../customTypes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const useGetCategories = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getDocs(collection(db, "categories")).then((snap) => {
        const data: Category[] = [];
        snap.forEach((doc) => {
          data.push(doc.data() as Category);
        });
        return data;
      }),
  });

  return { isPending, data, error };
};

export default useGetCategories;
