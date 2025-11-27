import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "../../utils/firebase";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (_) => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};
