import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "../../utils/firebase";

export const useGoogleSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.signInWithGoogle(),
    onSuccess: async (credential) => {
      await authService.addUserToDB(credential);
      navigate("/");
    },
    onError: (error) => {
      console.error("Google sign-in error:", error);
    },
  });
};
