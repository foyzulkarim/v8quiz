import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden bg-code-bg">
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "0.875rem",
          lineHeight: "1.5",
        }}
        codeTagProps={{
          style: {
            fontFamily: "'JetBrains Mono', monospace",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
