import { useState, useMemo, useCallback } from "react";
import type { QuizData, QuizState, FlattenedQuestion, UserAnswer } from "@/types/quiz";

type SelfGrade = "correct" | "partial" | "incorrect";

export function useQuiz(quizData: QuizData) {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    selfGrades: {},
    submitted: false,
  });
  
  const [started, setStarted] = useState(false);

  // Flatten questions from all sections
  const flattenedQuestions: FlattenedQuestion[] = useMemo(() => {
    const result: FlattenedQuestion[] = [];
    let globalIndex = 0;
    
    for (const section of quizData.sections) {
      for (const question of section.questions) {
        result.push({
          question,
          sectionId: section.id,
          sectionTitle: section.title,
          globalIndex,
        });
        globalIndex++;
      }
    }
    
    return result;
  }, [quizData]);

  const startQuiz = useCallback(() => {
    setStarted(true);
  }, []);

  const setAnswer = useCallback((questionId: string, answer: UserAnswer) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  }, []);

  const setSelfGrade = useCallback((questionId: string, grade: SelfGrade) => {
    setState((prev) => ({
      ...prev,
      selfGrades: {
        ...prev.selfGrades,
        [questionId]: grade,
      },
    }));
  }, []);

  const navigateToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < flattenedQuestions.length) {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: index,
      }));
    }
  }, [flattenedQuestions.length]);

  const submitQuiz = useCallback(() => {
    setState((prev) => ({
      ...prev,
      submitted: true,
    }));
  }, []);

  const resetQuiz = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      answers: {},
      selfGrades: {},
      submitted: false,
    });
    setStarted(false);
  }, []);

  const getUnansweredCount = useCallback(() => {
    return flattenedQuestions.filter((q) => {
      const answer = state.answers[q.question.id];
      return !answer || answer.trim() === "";
    }).length;
  }, [flattenedQuestions, state.answers]);

  return {
    state,
    started,
    flattenedQuestions,
    startQuiz,
    setAnswer,
    setSelfGrade,
    navigateToQuestion,
    submitQuiz,
    resetQuiz,
    getUnansweredCount,
    meta: quizData.meta,
    scoringTiers: quizData.scoring.tiers,
  };
}
