import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, RotateCcw, Youtube, Linkedin, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlattenedQuestion, UserAnswer, ScoringTier, MCQQuestion } from "@/types/quiz";
import { CodeBlock } from "./CodeBlock";
import { MarkdownRenderer } from "./MarkdownRenderer";

type SelfGrade = "correct" | "partial" | "incorrect";

interface ResultsScreenProps {
  questions: FlattenedQuestion[];
  answers: Record<string, UserAnswer>;
  selfGrades: Record<string, SelfGrade>;
  onSelfGrade: (questionId: string, grade: SelfGrade) => void;
  scoringTiers: ScoringTier[];
  onRetake: () => void;
}

export function ResultsScreen({
  questions,
  answers,
  selfGrades,
  onSelfGrade,
  scoringTiers,
  onRetake,
}: ResultsScreenProps) {
  // Calculate MCQ score (Section A only)
  const mcqQuestions = questions.filter(
    (q) => q.question.type === "mcq" && q.sectionId === "section-a"
  );
  
  const mcqCorrectCount = mcqQuestions.filter((q) => {
    const question = q.question as MCQQuestion;
    return answers[question.id] === question.correctAnswer;
  }).length;
  
  // Calculate self-graded questions score
  const selfGradedQuestions = questions.filter(
    (q) => q.question.type === "code_analysis" || q.question.type === "short_answer"
  );
  
  const selfGradedCorrectCount = selfGradedQuestions.filter(
    (q) => selfGrades[q.question.id] === "correct"
  ).length;
  
  const selfGradedPartialCount = selfGradedQuestions.filter(
    (q) => selfGrades[q.question.id] === "partial"
  ).length;
  
  // Total score: MCQ correct + self-graded correct + 0.5 * partial
  const totalCorrect = mcqCorrectCount + selfGradedCorrectCount + (selfGradedPartialCount * 0.5);
  const totalQuestions = mcqQuestions.length + selfGradedQuestions.length;
  const scorePercentage = (totalCorrect / totalQuestions) * 100;
  
  // Get tier
  const tier = scoringTiers.find((t) => scorePercentage >= t.min) || scoringTiers[scoringTiers.length - 1];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with score */}
      <header className="bg-card border-b border-border py-8 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Quiz Complete!</h1>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">
                  {mcqCorrectCount} / {mcqQuestions.length}
                </p>
                <p className="text-sm text-muted-foreground">MCQ (Auto-scored)</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">
                  {selfGradedCorrectCount + selfGradedPartialCount * 0.5} / {selfGradedQuestions.length}
                </p>
                <p className="text-sm text-muted-foreground">Self-graded</p>
              </div>
            </div>
            <p className="text-5xl font-bold text-primary">
              {Math.round(scorePercentage)}%
            </p>
            <p className="text-muted-foreground">Overall Score</p>
          </div>
          
          <div className="inline-block px-4 py-2 rounded-lg bg-muted text-lg">
            {tier.label}
          </div>
          
          <Button onClick={onRetake} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </Button>
        </div>
      </header>
      
      {/* Questions review */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Review Your Answers</h2>
          
          {questions.map((item, index) => (
            <Card
              key={item.question.id}
              id={`q-${item.question.id}`}
              className="bg-card border-border overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Q{index + 1}
                      </Badge>
                      <Badge variant="outline" className="text-xs text-primary border-primary/30">
                        {item.sectionTitle}
                      </Badge>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {item.question.text}
                    </p>
                  </div>
                  
                  {item.question.type === "mcq" && item.sectionId === "section-a" && (
                    <div className="flex-shrink-0">
                      {answers[item.question.id] === (item.question as MCQQuestion).correctAnswer ? (
                        <div className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center">
                          <Check className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-destructive/20 text-destructive flex items-center justify-center">
                          <X className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Code snippet */}
                {item.question.codeSnippet && (
                  <CodeBlock code={item.question.codeSnippet} />
                )}
                
                {/* MCQ answers */}
                {item.question.type === "mcq" && (
                  <div className="space-y-2">
                    {(item.question as MCQQuestion).options.map((option) => {
                      const isUserAnswer = answers[item.question.id] === option.key;
                      const isCorrect = option.key === (item.question as MCQQuestion).correctAnswer;
                      
                      return (
                        <div
                          key={option.key}
                          className={cn(
                            "p-3 rounded-lg border",
                            isCorrect && "border-success/50 bg-success/10",
                            isUserAnswer && !isCorrect && "border-destructive/50 bg-destructive/10",
                            !isUserAnswer && !isCorrect && "border-border bg-muted/30"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-muted-foreground">
                              {option.key.toUpperCase()}.
                            </span>
                            <span className={cn(
                              isCorrect && "text-success",
                              isUserAnswer && !isCorrect && "text-destructive"
                            )}>
                              {option.text}
                            </span>
                            {isCorrect && (
                              <Badge className="ml-auto bg-success/20 text-success border-0">
                                Correct
                              </Badge>
                            )}
                            {isUserAnswer && !isCorrect && (
                              <Badge className="ml-auto bg-destructive/20 text-destructive border-0">
                                Your answer
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Text answers */}
                {(item.question.type === "code_analysis" || item.question.type === "short_answer") && (
                  <div className="space-y-4">
                    {/* User answer */}
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Your Answer:</p>
                      <p className="text-foreground whitespace-pre-wrap">
                        {answers[item.question.id] || <span className="text-muted-foreground italic">No answer provided</span>}
                      </p>
                    </div>
                    
                    {/* Model answer */}
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-sm font-medium text-primary mb-2">Model Answer:</p>
                      <div className="text-foreground">
                        <MarkdownRenderer content={item.question.modelAnswer} />
                      </div>
                    </div>
                    
                    {/* Self-grade toggle */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Self-grade:</span>
                      <div className="flex gap-1">
                        {[
                          { value: "correct" as const, label: "Got it right", color: "bg-success/20 text-success border-success/30" },
                          { value: "partial" as const, label: "Partially right", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" },
                          { value: "incorrect" as const, label: "Missed it", color: "bg-destructive/20 text-destructive border-destructive/30" },
                        ].map((grade) => (
                          <button
                            key={grade.value}
                            onClick={() => onSelfGrade(item.question.id, grade.value)}
                            className={cn(
                              "px-3 py-1.5 rounded-md text-sm border transition-all",
                              selfGrades[item.question.id] === grade.value
                                ? grade.color
                                : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                            )}
                          >
                            {grade.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Explanation */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Explanation:</p>
                  <div className="text-muted-foreground">
                    <MarkdownRenderer content={item.question.explanation} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            Created by <span className="text-foreground">{"Foyzul Karim"}</span>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="{{YOUTUBE_URL}}"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="{{LINKEDIN_URL}}"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="{{SUBSTACK_URL}}"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Substack"
            >
              <Newspaper className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
