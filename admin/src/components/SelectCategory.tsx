import type { ChangeEvent } from "react";
import type { Category } from "@shared/customTypes";

type SelectCategory = {
  data: Category[] | undefined;
  error: Error | null;
  onCategorySelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  isPending: boolean;
};
const SelectCategory = ({
  data,
  error,
  onCategorySelect,
  isPending,
}: SelectCategory) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className="text-sm font-medium text-light-cyan">
        Category
      </label>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <select
          id="category"
          onChange={onCategorySelect}
          className="text-black"
        >
          {data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
      {error && (
        <p className="text-sm text-center text-red-400">{error.message}</p>
      )}
    </div>
  );
};

export default SelectCategory;
