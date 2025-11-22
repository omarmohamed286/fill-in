import { UserDataContext } from "../../contexts/UserDataContext";
import { useContext, type PropsWithChildren } from "react";
import { Navigate } from "react-router";

const RedirectToHome = ({ children }: PropsWithChildren) => {
  const { user, userStatus } = useContext(UserDataContext);
  if (userStatus == "loading") {
    return null;
  }
  if (user) {
    return <Navigate to="/"></Navigate>;
  }
  return children;
};

export default RedirectToHome;
