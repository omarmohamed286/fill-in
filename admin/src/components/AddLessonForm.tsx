import { useState, type FormEvent } from "react";
import { useCategorySelect } from "../hooks/categories/useCategorySelect";
import useAddLesson from "src/hooks/lessons/useAddLesson";
import SelectCategory from "./SelectCategory";

const AddLessonForm = () => {
  const [lessonName, setLessonName] = useState("");
  const { isPending: isLessonPending, mutate } = useAddLesson();
  const {
    isPending,
    data,
    error,
    onCategorySelect,
    categoryId,
    setCategoryId,
  } = useCategorySelect();

  const selectCategoryProps = { isPending, data, error, onCategorySelect };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!categoryId.trim() || !lessonName.trim()) {
      return;
    }
    mutate({
      categoryId,
      lesson: {
        name: lessonName,
        createdAt: Date.now(),
      },
    });
    setCategoryId("");
    setLessonName("");
  };

  return (
    <div className=" flex justify-center mt-10">
      <div className="w-full max-w-md bg-[#1a2332] rounded-lg shadow-2xl p-8 border border-secondary/20">
        <p className="text-2xl font-elms font-bold text-secondary mb-6">
          Add New Lesson
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <SelectCategory {...selectCategoryProps}></SelectCategory>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="lessonName"
              className="text-sm font-medium text-light-cyan"
            >
              Lesson Name
            </label>
            <input
              id="lessonName"
              type="text"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              placeholder="Enter Lesson Name"
            />
          </div>

          <button
            type="submit"
            disabled={isLessonPending}
            className="mt-4 bg-secondary text-primary font-bold py-3 px-6 rounded-md hover:bg-light-cyan transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLessonPending ? "Adding..." : "Add Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLessonForm;
