import type { Question } from "@shared/customTypes";

type QuestionsProgressBar = {
  questions: Question[];
  currentIndex: number;
};

const QuestionsProgressBar = ({
  questions,
  currentIndex,
}: QuestionsProgressBar) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span className="text-sm text-secondary font-medium">
          {Math.round(((currentIndex + 1) / questions.length) * 100)}%
        </span>
      </div>
      <div className="h-2 bg-primary rounded-full overflow-hidden border border-secondary/20">
        <div
          className="h-full bg-linear-to-r from-secondary to-light-cyan transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default QuestionsProgressBar;
