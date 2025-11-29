import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { callGemini, getTeacherRolePrompt } from "src/utils/gemini";

const useGemini = () => {
  const [response, setResponse] = useState("");
  const { isPending, error, mutate } = useMutation({
    mutationKey: ["gemini"],
    mutationFn: (prompt: string) => {
      return callGemini(getTeacherRolePrompt(prompt));
    },
    onSuccess: (res) => {
      if (res) {
        setResponse(res);
      }
    },
  });

  return { mutate, isPending, error, response };
};

export default useGemini;
