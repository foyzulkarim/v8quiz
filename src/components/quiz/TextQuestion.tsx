import type { CodeAnalysisQuestion, ShortAnswerQuestion } from "@/types/quiz";
import { CodeBlock } from "./CodeBlock";
import { Textarea } from "@/components/ui/textarea";

interface TextQuestionProps {
  question: CodeAnalysisQuestion | ShortAnswerQuestion;
  answer: string | undefined;
  onAnswerChange: (value: string) => void;
}

export function TextQuestion({
  question,
  answer,
  onAnswerChange,
}: TextQuestionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-lg text-foreground leading-relaxed">{question.text}</p>
      
      {question.codeSnippet && (
        <CodeBlock code={question.codeSnippet} />
      )}
      
      <Textarea
        value={answer || ""}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Type your analysis here..."
        className="min-h-[160px] bg-card border-border text-foreground placeholder:text-muted-foreground resize-y font-sans text-base leading-relaxed"
      />
    </div>
  );
}
