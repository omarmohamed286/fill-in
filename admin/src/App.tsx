import AddCategoryForm from "./components/AddCategoryForm";
import AddLessonForm from "./components/AddLessonForm";
import AddQuestionForm from "./components/AddQuestionForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AddCategoryForm></AddCategoryForm>
      <AddLessonForm></AddLessonForm>
      <AddQuestionForm></AddQuestionForm>
    </QueryClientProvider>
  );
};

export default App;
