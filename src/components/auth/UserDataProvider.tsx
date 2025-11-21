import { useState, useEffect, type PropsWithChildren } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/config";
import {
  UserDataContext,
  type RequestState,
} from "../../contexts/UserDataContext";

const UserDataProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [userStatus, setUserStatus] = useState<RequestState>("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setUserStatus("success");
      },
      (_) => {
        setUserStatus("error");
        setUser(null);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <UserDataContext.Provider value={{ user, userStatus }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
