import type { User } from "firebase/auth";
import { createContext } from "react";

type RequestState = "idle" | "error" | "loading" | "success";

type UserData = {
  user: User | null;
  userStatus: RequestState;
};

const UserDataContext = createContext<UserData>({
  user: null,
  userStatus: "idle",
});

export { UserDataContext, type RequestState };
