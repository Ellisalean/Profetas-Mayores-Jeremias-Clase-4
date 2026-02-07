
export type SlideType = 
  | 'intro' 
  | 'hermeneutics'
  | 'visual-info' 
  | 'split-visual'
  | 'timeline' 
  | 'scenario' 
  | 'interactive-reveal' 
  | 'stepped-overlay'
  | 'side-tabs-reveal'
  | 'tabs-reveal'
  | 'hotspot-reveal'
  | 'split-slider'
  | 'info-menu-reveal'
  | 'drag-drop'
  | 'quiz' 
  | 'puzzle'
  | 'reflection' 
  | 'completion'
  | 'interactive-video'
  | 'image-list-reveal'
  | 'flashcards'
  | 'word-search'
  | 'sequence'
  | 'fill-blanks';

export interface SlideVisual {
  type: 'image' | 'icon' | 'diagram' | 'map';
  source: string; 
  alt?: string;
  position?: 'left' | 'right' | 'top' | 'background';
  effect?: 'vignette' | 'none' | 'blur' | 'overlay-dark';
}

export interface RevealItem {
  title: string;
  text: string;
  longContent?: string;
  icon: string;
  image?: string;
  tags?: string[];
  x?: number; // Hotspot X coordinate (0-100)
  y?: number; // Hotspot Y coordinate (0-100)
}

export interface DragItem {
  id: string;
  label: string;
  categoryId: string;
}

export interface DragCategory {
  id: string;
  title: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  isBiblical: boolean;
  feedback: string;
}

export interface Mission {
  goal: string;
  tasks: string[];
}

export interface Decision {
  scenario: string;
  options: DecisionOption[];
}

export interface LessonSection {
  id: string;
  type: 'heading' | 'journey-step' | 'text' | 'mission' | 'decision' | 'callout' | 'quiz' | 'timeline' | 'reflection-lab';
  title: string;
  content?: string;
  calloutType?: 'idea' | 'context' | 'application' | 'verse';
  mission?: Mission;
  decision?: Decision;
  quiz?: QuizQuestion[];
  events?: TimelineEvent[];
  studyQuestions?: string[];
  subsections?: LessonSection[];
}

export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  chapterReference?: string;
  visual: SlideVisual;
  content?: string;
  bullets?: string[];
  interaction?: {
    type: 'click-reveal' | 'multiple-choice' | 'decision' | 'input' | 'matching' | 'side-reveal' | 'grid-cards' | 'stepped-reveal' | 'hotspots' | 'internal-slider' | 'menu-reveal' | 'drag-drop' | 'visual-selector' | 'embed-video' | 'flashcards' | 'word-search' | 'sequence' | 'fill-blanks';
    options?: SlideOption[];
    revealItems?: RevealItem[];
    puzzleItems?: PuzzleItem[];
    dragItems?: DragItem[];
    dragCategories?: DragCategory[];
    correctSequenceIds?: string[];
    correctBlanks?: string[];
    targetWords?: string[];
    content?: string;
    // Fix: Added quiz property to satisfy Slide interaction data for multiple-choice quiz slides
    quiz?: QuizQuestion[];
  };
  timelineEvents?: TimelineEvent[];
}

export interface SlideOption {
  id: string;
  label: string;
  feedback: string;
  isCorrect?: boolean;
}

export interface TimelineEvent {
  date: string;
  label: string;
  details: string;
  icon: string;
}

export interface PuzzleItem {
  id: string;
  term: string;
  definition: string;
}

export interface Lesson {
  id: string;
  title: string;
  totalSlides: number;
  slides: Slide[];
  subtitle?: string;
  objectives?: string[];
  duration?: string;
}
