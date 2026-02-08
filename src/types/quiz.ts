export interface QuizMeta {
  title: string;
  subtitle: string;
  estimatedTime: string;
  description: string;
}

export interface MCQOption {
  key: string;
  text: string;
}

export interface MCQQuestion {
  id: string;
  type: "mcq";
  text: string;
  codeSnippet: string | null;
  options: MCQOption[];
  correctAnswer: string;
  explanation: string;
}

export interface CodeAnalysisQuestion {
  id: string;
  type: "code_analysis";
  text: string;
  codeSnippet: string;
  modelAnswer: string;
  explanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  type: "short_answer";
  text: string;
  codeSnippet: string | null;
  modelAnswer: string;
  explanation: string;
}

export type Question = MCQQuestion | CodeAnalysisQuestion | ShortAnswerQuestion;

export interface Section {
  id: string;
  title: string;
  instruction: string;
  questions: Question[];
}

export interface ScoringTier {
  min: number;
  label: string;
}

export interface QuizData {
  meta: QuizMeta;
  sections: Section[];
  scoring: {
    tiers: ScoringTier[];
  };
}

export type UserAnswer = string; // MCQ key or free-text response

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, UserAnswer>;
  selfGrades: Record<string, "correct" | "partial" | "incorrect">;
  submitted: boolean;
}

export interface FlattenedQuestion {
  question: Question;
  sectionId: string;
  sectionTitle: string;
  globalIndex: number;
}
