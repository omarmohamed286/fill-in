import { useState, useEffect, type ChangeEvent } from 'react';
import useGetCategories from "@shared/hooks/categories/useGetCategories";

export const useCategorySelect = () => {
  const { isPending, data, error } = useGetCategories();
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      setCategoryId(data[0].id);
    }
  }, [data]);

  const onCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };

  return {
    data,
    categoryId,
    setCategoryId,
    onCategorySelect,
    isPending,
    error,
  };
};
