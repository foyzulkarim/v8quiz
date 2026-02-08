import { useState } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { LandingScreen } from "@/components/quiz/LandingScreen";
import { QuizScreen } from "@/components/quiz/QuizScreen";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import quizData from "@/data/data.json";
import type { QuizData } from "@/types/quiz";

const Index = () => {
  const quiz = useQuiz(quizData as QuizData);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSubmitClick = () => {
    const unansweredCount = quiz.getUnansweredCount();
    if (unansweredCount > 0) {
      setShowConfirmDialog(true);
    } else {
      quiz.submitQuiz();
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmDialog(false);
    quiz.submitQuiz();
  };

  // Landing screen
  if (!quiz.started) {
    return <LandingScreen meta={quiz.meta} onStart={quiz.startQuiz} />;
  }

  // Results screen
  if (quiz.state.submitted) {
    return (
      <ResultsScreen
        questions={quiz.flattenedQuestions}
        answers={quiz.state.answers}
        selfGrades={quiz.state.selfGrades}
        onSelfGrade={quiz.setSelfGrade}
        scoringTiers={quiz.scoringTiers}
        onRetake={quiz.resetQuiz}
      />
    );
  }

  // Quiz screen
  return (
    <>
      <QuizScreen
        questions={quiz.flattenedQuestions}
        currentIndex={quiz.state.currentQuestionIndex}
        answers={quiz.state.answers}
        onAnswerChange={quiz.setAnswer}
        onNavigate={quiz.navigateToQuestion}
        onSubmit={handleSubmitClick}
      />
      
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You have {quiz.getUnansweredCount()} unanswered question
              {quiz.getUnansweredCount() === 1 ? "" : "s"}. Submit anyway?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit}>
              Submit Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Index;
