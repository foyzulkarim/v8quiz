

# V8 Internals Quiz App — Implementation Plan

## Overview
A polished, single-page React quiz application with a dark developer-focused aesthetic, featuring 19 questions across 3 sections testing V8 internals knowledge. Entirely client-side with no backend required.

---

## Core Features

### 1. Landing Screen
- Quiz title "V8 Internals Assessment" with subtitle
- Estimated time indicator (45–60 minutes)
- Brief description of what the quiz covers
- Prominent "Start Quiz" button with V8 Blue accent
- Footer with placeholders for author name and social links (YouTube, LinkedIn, Substack)

### 2. Quiz Stepper (One Question at a Time)
- **Progress bar** at top showing current position (e.g., "Question 5 of 19")
- Visual dots/segments indicating answered vs unanswered questions
- **Section labels** displayed for context (Section A, B, or C)
- **Previous/Next navigation** with smooth transitions between questions
- Final question shows "Submit Quiz" instead of "Next"
- Answers preserved in React state throughout navigation

### 3. Question Renderers (3 Types)

**Multiple Choice (MCQ)**
- Selectable card-style options with V8 Blue highlight on selection
- Optional syntax-highlighted code snippet above options
- Full card is the click target (not just the radio button)

**Code Analysis**
- Always shows a syntax-highlighted code block
- Multi-line textarea for user's written analysis
- Placeholder text: "Type your analysis here..."

**Short Answer**
- Optional code snippet
- Multi-line textarea for response
- Same styling as code analysis

### 4. Results Screen
- **Auto-scored summary** at top: X / 10 correct (Section A MCQs only)
- **Tier badge** based on percentage:
  - 🟢 90–100%: Ready for advanced topics
  - 🟡 70–89%: Good with gaps
  - 🔴 Below 70%: Revisit fundamentals

- **Full question review** (scrollable list):
  - Original question + code snippet
  - User's answer displayed
  - MCQs: ✅/❌ indicator with correct answer shown
  - Free-text: Model answer revealed + self-grade toggle (Got it right / Partially right / Missed it)
  - Rich markdown explanations with syntax-highlighted code

- "Retake Quiz" button to reset everything
- Footer with social links

### 5. UX Polish
- Confirmation dialog before submit if questions are unanswered
- Smooth fade/slide transitions between questions
- Anchor links to jump to specific questions on results page
- Fully responsive (mobile-friendly cards and textareas)

---

## Design & Styling

### Theme
- **Dark theme** default with high contrast
- **V8 Blue (#4285F4)** as primary accent color
- Clean sans-serif for body (DM Sans or similar)
- Monospace for code (JetBrains Mono or Fira Code via Google Fonts)

### Components
- **Code blocks**: Dark syntax highlighting (Atom One Dark theme), rounded corners, subtle border
- **Option cards**: Hover elevation, V8 Blue border on selection
- **Textareas**: Dark-themed with comfortable padding
- **Progress bar**: Thin and elegant with filled dots for answered questions
- **Results**: Green/red accents for correct/incorrect, distinct callout boxes for model answers

---

## Technical Approach
- React with useState/useReducer for quiz state
- react-syntax-highlighter for code blocks
- react-markdown for rendering explanations
- Tailwind CSS for styling
- data.json imported directly (no API calls)
- No localStorage or persistence — purely in-memory

---

## Data File
I'll create a complete `data.json` with 19 placeholder V8 internals questions:
- Section A: 10 MCQs covering Ignition, TurboFan, hidden classes, inline caching
- Section B: 5 code analysis questions with realistic V8 optimization scenarios
- Section C: 4 short answer questions about memory model and tiered compilation

