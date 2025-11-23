import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useCategorySelect } from "../hooks/categories/useCategorySelect";
import SelectCategory from "./SelectCategory";
import SelectLesson from "./SelectLesson";
import useGetLessons from "@shared/hooks/lessons/useGetLessons";
import useAddQuestion from "src/hooks/questions/useAddQuestion";
import type { Question } from "@shared/customTypes";

const AddQuestionForm = () => {
  const [question, setQuestion] = useState<Partial<Question>>({
    title: "",
    answer: "",
    choices: [""],
    externalResources: [""],
  });
  const [lessonId, setLessonId] = useState("");
  const {
    isPending,
    data,
    error,
    onCategorySelect,
    categoryId,
    setCategoryId,
  } = useCategorySelect();
  const {
    isPending: isLessonsPending,
    data: lessons,
    error: lessonsError,
  } = useGetLessons(categoryId);
  const { isPending: isQuestionPending, mutate: mutateQuestions } =
    useAddQuestion();

  const selectCategoryProps = { isPending, data, error, onCategorySelect };
  const selectLessonProps = {
    isPending: isLessonsPending,
    data: lessons,
    error: lessonsError,
    onLessonSelect,
  };

  useEffect(() => {
    if (lessons && lessons.length > 0) {
      setLessonId(lessons[0].id);
    }
  }, [lessons]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!categoryId.trim()) {
      return;
    }
    mutateQuestions({
      categoryId,
      lessonId,
      question,
    });
    setCategoryId("");
    setLessonId("");
    setQuestion({
      title: "",
      answer: "",
      choices: [""],
      externalResources: [""],
    });
  };

  function onLessonSelect(e: ChangeEvent<HTMLSelectElement>) {
    setLessonId(e.target.value);
  }

  const updateChoice = (index: number, value: string) => {
    const newChoices = [...(question.choices || [])];
    newChoices[index] = value;
    setQuestion({ ...question, choices: newChoices });
  };

  const addChoice = () => {
    setQuestion({
      ...question,
      choices: [...(question.choices || []), ""],
    });
  };

  const removeChoice = (index: number) => {
    const newChoices = (question.choices || []).filter((_, i) => i !== index);
    setQuestion({ ...question, choices: newChoices });
  };

  const updateResource = (index: number, value: string) => {
    const newResources = [...(question.externalResources || [])];
    newResources[index] = value;
    setQuestion({ ...question, externalResources: newResources });
  };

  const addResource = () => {
    setQuestion({
      ...question,
      externalResources: [...(question.externalResources || []), ""],
    });
  };

  const removeResource = (index: number) => {
    const newResources = (question.externalResources || []).filter(
      (_, i) => i !== index
    );
    setQuestion({ ...question, externalResources: newResources });
  };

  return (
    <div className=" flex justify-center my-10">
      <div className="w-full max-w-md bg-[#1a2332] rounded-lg shadow-2xl p-8 border border-secondary/20">
        <p className="text-2xl font-elms font-bold text-secondary mb-6">
          Add New Question
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <SelectCategory {...selectCategoryProps}></SelectCategory>
          <SelectLesson {...selectLessonProps}></SelectLesson>
          <label
            htmlFor="title"
            className="text-sm font-medium text-light-cyan"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={question.title}
            placeholder="Title"
            className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            onChange={(e) => {
              setQuestion({ ...question, title: e.target.value });
            }}
          />
          <label
            htmlFor="answer"
            className="text-sm font-medium text-light-cyan"
          >
            Answer
          </label>
          <input
            type="text"
            id="answer"
            value={question.answer}
            placeholder="Answer"
            className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            onChange={(e) => {
              setQuestion({ ...question, answer: e.target.value });
            }}
          />
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-light-cyan">
                Choices
              </label>
              <button
                type="button"
                onClick={addChoice}
                className="flex items-center gap-1 text-secondary hover:text-light-cyan transition-colors text-sm"
              >
                Add Choice
              </button>
            </div>

            {(question.choices || [""]).map((choice, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={choice}
                  placeholder={`Choice ${index + 1}`}
                  className="flex-1 bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  onChange={(e) => updateChoice(index, e.target.value)}
                />
                {(question.choices?.length || 0) > 1 && (
                  <button
                    type="button"
                    onClick={() => removeChoice(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <span>X</span>
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-light-cyan">
                External Resources
              </label>
              <button
                type="button"
                onClick={addResource}
                className="flex items-center gap-1 text-secondary hover:text-light-cyan transition-colors text-sm"
              >
                Add Resource
              </button>
            </div>

            {(question.externalResources || [""]).map((resource, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="url"
                  value={resource}
                  placeholder={`Resource URL ${index + 1}`}
                  className="flex-1 bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  onChange={(e) => updateResource(index, e.target.value)}
                />
                {(question.externalResources?.length || 0) > 1 && (
                  <button
                    type="button"
                    onClick={() => removeResource(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <span>X</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isQuestionPending}
            className="mt-4 bg-secondary text-primary font-bold py-3 px-6 rounded-md hover:bg-light-cyan transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isQuestionPending ? "Adding..." : "Add Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionForm;
