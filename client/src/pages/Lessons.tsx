import { useParams } from "react-router";
const Lessons = () => {
  const { categoryId } = useParams();
  console.log("PARAMS:", categoryId);
  return <div>Lessons</div>;
};

export default Lessons;
