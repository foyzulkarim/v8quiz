import { cn } from "@/lib/utils";
import type { MCQQuestion as MCQQuestionType } from "@/types/quiz";
import { CodeBlock } from "./CodeBlock";
import { Check } from "lucide-react";

interface MCQQuestionProps {
  question: MCQQuestionType;
  selectedAnswer: string | undefined;
  onAnswerSelect: (key: string) => void;
}

export function MCQQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
}: MCQQuestionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-lg text-foreground leading-relaxed">{question.text}</p>
      
      {question.codeSnippet && (
        <CodeBlock code={question.codeSnippet} />
      )}
      
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.key;
          
          return (
            <button
              key={option.key}
              onClick={() => onAnswerSelect(option.key)}
              className={cn(
                "w-full text-left p-4 rounded-lg border-2 transition-all duration-200",
                "hover:border-primary/50 hover:bg-primary/5",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/40"
                  )}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-muted-foreground mr-2">
                    {option.key.toUpperCase()}.
                  </span>
                  <span className={cn(
                    "text-foreground",
                    isSelected && "text-primary"
                  )}>
                    {option.text}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
