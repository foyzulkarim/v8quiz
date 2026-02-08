import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import type { FlattenedQuestion, UserAnswer } from "@/types/quiz";
import { ProgressBar } from "./ProgressBar";
import { MCQQuestion } from "./MCQQuestion";
import { TextQuestion } from "./TextQuestion";
import { Badge } from "@/components/ui/badge";

interface QuizScreenProps {
  questions: FlattenedQuestion[];
  currentIndex: number;
  answers: Record<string, UserAnswer>;
  onAnswerChange: (questionId: string, answer: UserAnswer) => void;
  onNavigate: (index: number) => void;
  onSubmit: () => void;
}

export function QuizScreen({
  questions,
  currentIndex,
  answers,
  onAnswerChange,
  onNavigate,
  onSubmit,
}: QuizScreenProps) {
  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  
  const answeredQuestions = new Set(
    Object.keys(answers).filter((id) => {
      const answer = answers[id];
      return answer && answer.trim() !== "";
    })
  );
  
  const questionIds = questions.map((q) => q.question.id);
  
  const handlePrevious = () => {
    if (!isFirst) {
      onNavigate(currentIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (!isLast) {
      onNavigate(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ProgressBar
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            answeredQuestions={answeredQuestions}
            questionIds={questionIds}
            onQuestionClick={onNavigate}
          />
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Section badge */}
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-primary border-primary/30">
              {currentQuestion.sectionTitle}
            </Badge>
          </div>
          
          {/* Question */}
          <div key={currentQuestion.question.id}>
            {currentQuestion.question.type === "mcq" ? (
              <MCQQuestion
                question={currentQuestion.question}
                selectedAnswer={answers[currentQuestion.question.id]}
                onAnswerSelect={(key) =>
                  onAnswerChange(currentQuestion.question.id, key)
                }
              />
            ) : (
              <TextQuestion
                question={currentQuestion.question}
                answer={answers[currentQuestion.question.id]}
                onAnswerChange={(value) =>
                  onAnswerChange(currentQuestion.question.id, value)
                }
              />
            )}
          </div>
        </div>
      </main>
      
      {/* Navigation footer */}
      <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky bottom-0">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirst}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            {isLast ? (
              <Button onClick={onSubmit} className="gap-2">
                Submit Quiz
                <Send className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleNext} className="gap-2">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
