import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Youtube, Linkedin, Newspaper } from "lucide-react";
import type { QuizMeta } from "@/types/quiz";

interface LandingScreenProps {
  meta: QuizMeta;
  onStart: () => void;
}

export function LandingScreen({ meta, onStart }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
          {/* Logo placeholder */}
          <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">V8</span>
          </div>
          
          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {meta.title}
            </h1>
            <p className="text-lg text-primary font-medium">
              <a
              href="https://foyzul.substack.com/p/when-numbers-secretly-become-objects"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="SubStack"
            >
              {meta.subtitle}
            </a>
            </p>
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            {meta.description}
          </p>
          
          {/* Meta info */}
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{meta.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>19 questions</span>
            </div>
          </div>
          
          {/* Start button */}
          <Button
            onClick={onStart}
            size="lg"
            className="px-8 py-6 text-lg font-semibold"
          >
            Start Quiz
          </Button>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            Created by <span className="text-foreground">{"{{AUTHOR_NAME}}"}</span>
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
