import AddCategoryForm from "./components/AddCategoryForm";
import AddLessonForm from "./components/AddLessonForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AddCategoryForm></AddCategoryForm>
      <AddLessonForm></AddLessonForm>
    </QueryClientProvider>
  );
};

export default App;
