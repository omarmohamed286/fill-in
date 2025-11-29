import ReactMarkdown from "react-markdown";

type RenderMarkdown = {
  content: string;
};

const RenderMarkdown = ({ content }: RenderMarkdown) => {
  return (
    <ReactMarkdown
      components={{
        pre: ({ node, ...props }) => (
          <pre
            className="overflow-x-auto whitespace-pre-wrap wrap-break-word p-3 bg-secondary/20 rounded-md"
            {...props}
          />
        ),
        code: ({ node, ...props }) => (
          <code className="wrap-break-word" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
