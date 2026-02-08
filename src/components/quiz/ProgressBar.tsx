import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  answeredQuestions: Set<string>;
  questionIds: string[];
  onQuestionClick?: (index: number) => void;
}

export function ProgressBar({
  currentIndex,
  totalQuestions,
  answeredQuestions,
  questionIds,
  onQuestionClick,
}: ProgressBarProps) {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span className="text-muted-foreground">
          {answeredQuestions.size} answered
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Dot indicators */}
      <div className="flex gap-1.5 flex-wrap">
        {questionIds.map((id, index) => {
          const isAnswered = answeredQuestions.has(id);
          const isCurrent = index === currentIndex;
          
          return (
            <button
              key={id}
              onClick={() => onQuestionClick?.(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-200",
                isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                isAnswered && !isCurrent && "bg-primary",
                !isAnswered && !isCurrent && "bg-muted-foreground/30",
                isCurrent && isAnswered && "bg-primary",
                isCurrent && !isAnswered && "bg-muted-foreground/50"
              )}
              title={`Question ${index + 1}${isAnswered ? " (answered)" : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
}
