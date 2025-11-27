import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "../../utils/firebase";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.register(email, password),
    onSuccess: async (credential) => {
      await authService.addUserToDB(credential);
      navigate("/");
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
};
