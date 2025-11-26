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
    explanation: "",
    code: "",
    externalResources: [],
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
      explanation: "",
      code: "",
      externalResources: [],
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

  const updateResource = (
    index: number,
    field: "title" | "url",
    value: string
  ) => {
    const newResources = [...(question.externalResources || [])];
    newResources[index] = { ...newResources[index], [field]: value };
    setQuestion({ ...question, externalResources: newResources });
  };

  const addResource = () => {
    setQuestion({
      ...question,
      externalResources: [
        ...(question.externalResources || []),
        { id: crypto.randomUUID().slice(0, 4), title: "", url: "" },
      ],
    });
  };

  const removeResource = (index: number) => {
    const newResources = (question.externalResources || []).filter(
      (_, i) => i !== index
    );
    setQuestion({ ...question, externalResources: newResources });
  };

  return (
    <div className="flex justify-center my-10">
      <div className="w-full max-w-2xl bg-[#1a2332] rounded-lg shadow-2xl p-8 border border-secondary/20">
        <p className="text-2xl font-elms font-bold text-secondary mb-6">
          Add New Question
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <SelectCategory {...selectCategoryProps}></SelectCategory>
          <SelectLesson {...selectLessonProps}></SelectLesson>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-light-cyan"
            >
              Question Title
            </label>
            <input
              type="text"
              id="title"
              value={question.title}
              placeholder="Enter your question"
              className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              onChange={(e) => {
                setQuestion({ ...question, title: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="code"
              className="text-sm font-medium text-light-cyan"
            >
              Code (Optional)
            </label>
            <textarea
              id="code"
              value={question.code}
              placeholder="Paste code snippet here..."
              rows={6}
              className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all font-mono text-sm resize"
              onChange={(e) => {
                setQuestion({ ...question, code: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-light-cyan">
                Answer Choices
              </label>
              <button
                type="button"
                onClick={addChoice}
                className="flex items-center gap-1 text-secondary hover:text-light-cyan transition-colors text-sm"
              >
                + Add Choice
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
                    className="text-red-400 hover:text-red-300 transition-colors p-2"
                    aria-label="Remove choice"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="answer"
              className="text-sm font-medium text-light-cyan"
            >
              Correct Answer
            </label>
            <input
              type="text"
              id="answer"
              value={question.answer}
              placeholder="Enter the correct answer"
              className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              onChange={(e) => {
                setQuestion({ ...question, answer: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="explanation"
              className="text-sm font-medium text-light-cyan"
            >
              Explanation (Optional)
            </label>
            <textarea
              id="explanation"
              value={question.explanation}
              placeholder="Explain why this is the correct answer..."
              rows={4}
              className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
              onChange={(e) => {
                setQuestion({ ...question, explanation: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-light-cyan">
                External Resources (Optional)
              </label>
              <button
                type="button"
                onClick={addResource}
                className="flex items-center gap-1 text-secondary hover:text-light-cyan transition-colors text-sm"
              >
                + Add Resource
              </button>
            </div>

            {(question.externalResources || []).map((resource, index) => (
              <div
                key={resource.id}
                className="flex flex-col gap-2 p-4 bg-primary/50 border border-secondary/20 rounded-lg"
              >
                <div className="flex gap-2 items-start">
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      type="text"
                      value={resource.title}
                      placeholder="Resource title"
                      className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      onChange={(e) =>
                        updateResource(index, "title", e.target.value)
                      }
                    />
                    <input
                      type="url"
                      value={resource.url}
                      placeholder="Resource URL"
                      className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      onChange={(e) =>
                        updateResource(index, "url", e.target.value)
                      }
                    />
                  </div>
                  {(question.externalResources?.length || 0) > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResource(index)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2"
                      aria-label="Remove resource"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
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
