import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
