import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const isInline = !match && !className;
          
          if (isInline) {
            return (
              <code
                className="bg-code-bg text-primary px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }
          
          return (
            <CodeBlock
              code={String(children).replace(/\n$/, "")}
              language={match ? match[1] : "javascript"}
            />
          );
        },
        p({ children }) {
          return <p className="mb-3 leading-relaxed">{children}</p>;
        },
        strong({ children }) {
          return <strong className="font-semibold text-foreground">{children}</strong>;
        },
        ul({ children }) {
          return <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>;
        },
        li({ children }) {
          return <li className="text-muted-foreground">{children}</li>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
