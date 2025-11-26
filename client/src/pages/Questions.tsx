import { Link, useParams, useNavigate } from "react-router";
import useGetQuestions from "@shared/hooks/questions/useGetQuestions";
import Loading from "../components/shared/Loading";
import QuestionsComponent from "../components/home/QuestionsComponent";
import ExploreIcon from "src/components/home/icons/ExploreIcon";

const Questions = () => {
  const { categoryId, lessonId } = useParams();
  const { data, isPending, error } = useGetQuestions(categoryId, lessonId);
  const navigate = useNavigate();

  if (isPending) {
    return <Loading variant="2"></Loading>;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg">Error loading questions</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center px-6">
        <div className="text-center">
          <p className="text-gray-400 text-lg">No questions available yet</p>
          <Link
            to={`/category/${categoryId}`}
            className="inline-block mt-6 text-secondary hover:text-light-cyan transition-colors"
          >
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6">
      <button
        className="inline-flex items-center gap-2 text-light-cyan hover:text-secondary transition-colors duration-300 mb-8"
        onClick={() => {
          navigate(-1);
        }}
      >
        <span className="rotate-180">
          <ExploreIcon></ExploreIcon>
        </span>
        Back to Lesson
      </button>
      <QuestionsComponent questions={data}></QuestionsComponent>
    </main>
  );
};

export default Questions;
