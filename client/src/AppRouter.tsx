import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDataProvider from "./components/auth/UserDataProvider";
import RedirectToHome from "./components/auth/RedirectToHome";

const AppRouter = () => {
  return (
    <UserDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route
            path="/register"
            element={
              <RedirectToHome>
                <Register></Register>
              </RedirectToHome>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <RedirectToHome>
                <Login></Login>
              </RedirectToHome>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </UserDataProvider>
  );
};

export default AppRouter;
