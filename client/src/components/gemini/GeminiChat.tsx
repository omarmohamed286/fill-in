import { useEffect, useState, type KeyboardEvent } from "react";
import useGemini from "src/hooks/gemini/useGemini";
import Loading from "../shared/Loading";
import IncorrectAnswerIcon from "../home/icons/IncorrectAnswerIcon";
import RenderMarkdown from "./RenderMarkdown";
import SendMessageIcon from "./SendMessageIcon";

type GeminiChat = {
  showChat: boolean;
  setShowChat: (value: boolean) => void;
};

const GeminiChat = ({ showChat, setShowChat }: GeminiChat) => {
  const { mutate, isPending, error, response } = useGemini();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );

  const handleSubmit = () => {
    if (!input.trim() || isPending) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    mutate(input);
    setInput("");
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (
      response &&
      messages.length > 0 &&
      messages[messages.length - 1].role === "user"
    ) {
      const aiMessage = { role: "assistant", content: response };
      setMessages((prev) => [...prev, aiMessage]);
    }
  }, [response]);

  return (
    showChat && (
      <div className="flex flex-col h-[500px] w-[calc(100%-1rem)] max-w-md bg-primary fixed right-2 bottom-2 md:right-10 md:bottom-10 shadow-2xl rounded-2xl overflow-hidden z-50 border-2 border-secondary/20">
        <div className="bg-primary border-b border-secondary/20 px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-secondary font-elms">
            AI Teacher
          </h2>
          <button
            className="p-1.5 hover:bg-secondary/10 rounded-lg transition-colors"
            onClick={() => {
              setShowChat(false);
            }}
            aria-label="Close chat"
          >
            <IncorrectAnswerIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-primary">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-light-cyan/60">
              <p className="text-base text-center px-4 font-raleway">
                Start a conversation with your AI teacher
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] px-4 py-2.5 rounded-xl font-raleway text-sm ${
                    message.role === "user"
                      ? "bg-secondary text-primary font-medium"
                      : "bg-primary text-light-cyan border border-secondary/20"
                  }`}
                >
                  <RenderMarkdown content={message.content}></RenderMarkdown>
                </div>
              </div>
            ))
          )}

          {isPending && (
            <div className="flex justify-start">
              <div className="bg-primary text-light-cyan border border-secondary/20 px-4 py-2.5 rounded-xl">
                <Loading />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl">
              <p className="font-semibold font-elms">Error:</p>
              <p className="text-sm font-raleway">{error.message}</p>
            </div>
          )}
        </div>

        <div className="bg-primary border-t border-secondary/20 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              disabled={isPending}
              className="flex-1 px-4 py-2.5 bg-primary border border-secondary/30 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       text-light-cyan placeholder-light-cyan/40 font-raleway text-sm
                       transition-all"
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || isPending}
              className="px-5 py-2.5 bg-secondary text-primary rounded-xl 
                       hover:bg-light-cyan disabled:bg-secondary/30 disabled:cursor-not-allowed 
                       transition-all flex items-center gap-2 font-elms font-semibold text-sm
                       shadow-lg shadow-secondary/5"
            >
              <SendMessageIcon></SendMessageIcon>
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default GeminiChat;
