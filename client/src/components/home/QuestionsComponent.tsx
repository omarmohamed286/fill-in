import type { Question } from "@shared/customTypes";
import clsx from "clsx";
import { useState } from "react";
import QuestionsProgressBar from "./QuestionsProgressBar";
import { useNavigate } from "react-router";
import { CodeBlock } from "./CodeBlock";

type QuestionsComponent = {
  questions: Question[];
};

const QuestionsComponent = ({ questions }: QuestionsComponent) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const currentQuestion = questions[currentQuestionIndex];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isLastQuestion = currentQuestionIndex + 1 == questions.length;
  const navigate = useNavigate();

  const handleAnswerClicked = (answer: string) => {
    if (!isSubmitted) {
      setUserAnswer(answer);
    }
  };

  const handleSubmitClicked = () => {
    if (!isSubmitted) {
      return setIsSubmitted(true);
    }
    if (!isLastQuestion) {
      setIsSubmitted(false);
      setUserAnswer("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate(-1);
    }
  };

  const getButtonLabel = () => {
    if (isLastQuestion && isSubmitted) {
      return "Finish";
    }
    if (!isSubmitted) {
      return "Submit";
    }
    return "Next";
  };

  return (
    <article className="max-w-3xl w-full bg-linear-to-br from-[#1a2332] to-primary border border-secondary/20 rounded-xl p-8 shadow-2xl">
      <QuestionsProgressBar
        questions={questions}
        currentIndex={currentQuestionIndex}
      ></QuestionsProgressBar>

      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
          {currentQuestion.title}
          {currentQuestion.code && (
            <CodeBlock
              code={currentQuestion.code}
              language="tsx"
              filename="App.tsx"
            ></CodeBlock>
          )}
        </h1>
      </header>
      <div className="space-y-3 mb-8">
        {currentQuestion.choices.map((choice, i) => {
          const isSelected = userAnswer === choice;
          const isThisCorrect =
            isSubmitted && choice === currentQuestion.answer;
          const isThisIncorrect =
            isSubmitted && isSelected && choice !== currentQuestion.answer;

          return (
            <button
              key={i}
              disabled={isSubmitted}
              onClick={() => handleAnswerClicked(choice)}
              className={clsx(
                "w-full text-left p-4 rounded-lg border-2 transition-all duration-300",
                isThisCorrect && "border-green-500 bg-green-500/10",
                isThisIncorrect && "border-red-500 bg-red-500/10",
                !isSubmitted &&
                  isSelected &&
                  "border-secondary bg-secondary/10",
                !isSubmitted &&
                  !isSelected &&
                  "border-secondary/30 hover:border-secondary hover:bg-secondary/5",
                isSubmitted ? "cursor-default" : "cursor-pointer"
              )}
            >
              <span className="text-white font-medium">{choice}</span>
            </button>
          );
        })}
      </div>
      <button
        disabled={!userAnswer}
        onClick={handleSubmitClicked}
        className="w-full bg-secondary text-primary font-bold py-3 px-6 rounded-lg hover:bg-light-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {getButtonLabel()}
      </button>
    </article>
  );
};

export default QuestionsComponent;
