import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "../../utils/firebase";

export const useGoogleSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.signInWithGoogle(),
    onSuccess: (data) => {
      console.log("Google sign-in successful:", data.user);
      navigate("/");
    },
    onError: (error) => {
      console.error("Google sign-in error:", error);
    },
  });
};
