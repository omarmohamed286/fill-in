import type { ChangeEvent } from "react";
import type { Lesson } from "@shared/customTypes";

type SelectLesson = {
  data: Lesson[] | undefined;
  error: Error | null;
  onLessonSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  isPending: boolean;
};
const SelectLesson = ({
  data,
  error,
  onLessonSelect,
  isPending,
}: SelectLesson) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="lesson" className="text-sm font-medium text-light-cyan">
        Lesson
      </label>
      {isPending? (
        <p>Loading...</p>
      ) : (
        <select
          id="lesson"
          onChange={onLessonSelect}
          className="text-black"
        >
          {data?.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name}
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

export default SelectLesson;
