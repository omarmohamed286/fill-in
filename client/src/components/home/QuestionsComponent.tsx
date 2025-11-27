import type { Question } from "@shared/customTypes";
import clsx from "clsx";
import { useState } from "react";
import QuestionsProgressBar from "./QuestionsProgressBar";
import { useParams } from "react-router";
import { CodeBlock } from "./CodeBlock";
import CorrectAnswerIcon from "./icons/CorrectAnswerIcon";
import IncorrectAnswerIcon from "./icons/IncorrectAnswerIcon";
import ExternalLinkIcon from "./icons/ExternalLinkIcon";
import useAddCompletedLesson from "../../hooks/home/useAddCompletedLesson";

type QuestionsComponent = {
  questions: Question[];
};

const QuestionsComponent = ({ questions }: QuestionsComponent) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const currentQuestion = questions[currentQuestionIndex];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isLastQuestion = currentQuestionIndex + 1 == questions.length;
  const isCorrectAnswer = userAnswer == currentQuestion.answer;
  const { lessonId } = useParams();

  const { mutate } = useAddCompletedLesson();

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
      mutate(lessonId);
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
              <span className="text-white font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{choice}</span>
                  {isSubmitted && isThisCorrect && (
                    <CorrectAnswerIcon></CorrectAnswerIcon>
                  )}
                  {isSubmitted && isThisIncorrect && (
                    <IncorrectAnswerIcon></IncorrectAnswerIcon>
                  )}
                </div>
              </span>
            </button>
          );
        })}
      </div>
      {isSubmitted && (
        <div
          className={clsx("mb-6 p-4 rounded-lg border", {
            "bg-green-500/10 border-green-500/30": isCorrectAnswer,
            "bg-red-500/10 border-red-500/30": !isCorrectAnswer,
          })}
        >
          <p
            className={clsx("font-medium", {
              "text-green-400": isCorrectAnswer,
              "text-red-400": !isCorrectAnswer,
            })}
          >
            {isCorrectAnswer ? "✓ Correct!" : "✗ Incorrect"}
          </p>
        </div>
      )}

      {isSubmitted && !isCorrectAnswer && currentQuestion.explanation && (
        <div className="mb-3">
          <p className="text-white font-medium mb-1">Explanation:</p>
          <p className="text-light-cyan">{currentQuestion.explanation}</p>
        </div>
      )}

      {isSubmitted &&
        !isCorrectAnswer &&
        currentQuestion.externalResources &&
        currentQuestion.externalResources.length > 0 && (
          <div className="mb-6 p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
            <h3 className="text-light-cyan font-semibold mb-2">Learn More:</h3>
            <ul className="space-y-2">
              {currentQuestion.externalResources.map((resource) => (
                <li key={resource.id}>
                  <a
                    href={resource.url}
                    target="_blank"
                    className="text-secondary hover:text-light-cyan transition-colors inline-flex items-center gap-2"
                  >
                    <ExternalLinkIcon></ExternalLinkIcon>
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

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
