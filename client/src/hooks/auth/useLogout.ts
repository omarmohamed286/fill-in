import { useMutation } from "@tanstack/react-query";
import { authService } from "../../utils/firebase";

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });
};
