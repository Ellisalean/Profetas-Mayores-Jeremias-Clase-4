
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ALL_LESSONS } from '../data/lessonContent';

interface LessonState {
  currentLessonId: string;
  currentSlideIndex: number;
  completedSlides: Record<string, number[]>; // Track completed slides per lesson
  // Fix: Added missing property completedSections used in SectionRenderer and MissionModule
  completedSections: string[];
  notes: Record<string, string>;
  // Fix: Added missing property studyAnswers used in SectionRenderer reflection-lab
  studyAnswers: Record<string, string>;
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  isPlaying: boolean;
  isHelpOpen: boolean;
  
  setCurrentLesson: (id: string) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  setNote: (id: string, text: string) => void;
  // Fix: Added missing method setStudyAnswer used in SectionRenderer
  setStudyAnswer: (id: string, answer: string) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  toggleAutoplay: () => void;
  toggleHelp: () => void;
  // Fix: Added missing method toggleSection used in SectionRenderer and MissionModule
  toggleSection: (id: string) => void;
  markSlideComplete: (lessonId: string, index: number) => void;
  resetLesson: () => void;
}

export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      currentLessonId: 'jeremias-clase-4', // Iniciamos con la nueva clase 4 de Jeremías
      currentSlideIndex: 0,
      completedSlides: {},
      // Fix: Initial value for completedSections
      completedSections: [],
      notes: {},
      // Fix: Initial value for studyAnswers
      studyAnswers: {},
      isSidebarOpen: false,
      theme: 'dark',
      isPlaying: false,
      isHelpOpen: false,

      setCurrentLesson: (id) => set({ 
        currentLessonId: id, 
        currentSlideIndex: 0, 
        isPlaying: false 
      }),

      nextSlide: () => {
        const { currentLessonId, currentSlideIndex } = get();
        const lesson = ALL_LESSONS[currentLessonId];
        if (!lesson) return;
        set({ 
          currentSlideIndex: Math.min(currentSlideIndex + 1, lesson.totalSlides - 1) 
        });
      },

      prevSlide: () => set((state) => ({ 
        currentSlideIndex: Math.max(state.currentSlideIndex - 1, 0) 
      })),

      goToSlide: (index) => set({ currentSlideIndex: index }),

      setNote: (id, text) => set((state) => ({
        notes: { ...state.notes, [id]: text }
      })),

      // Fix: Implemented setStudyAnswer
      setStudyAnswer: (id, answer) => set((state) => ({
        studyAnswers: { ...state.studyAnswers, [id]: answer }
      })),

      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleAutoplay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      toggleHelp: () => set((state) => ({ isHelpOpen: !state.isHelpOpen })),

      // Fix: Implemented toggleSection
      toggleSection: (id) => set((state) => ({
        completedSections: state.completedSections.includes(id)
          ? state.completedSections.filter(s => s !== id)
          : [...state.completedSections, id]
      })),

      markSlideComplete: (lessonId, index) => set((state) => {
        const currentCompleted = state.completedSlides[lessonId] || [];
        if (currentCompleted.includes(index)) return state;
        return {
          completedSlides: {
            ...state.completedSlides,
            [lessonId]: [...currentCompleted, index]
          }
        };
      }),

      resetLesson: () => {
        const { currentLessonId } = get();
        set((state) => ({
          currentSlideIndex: 0,
          completedSlides: {
            ...state.completedSlides,
            [currentLessonId]: []
          },
          // Fix: Reset completedSections when resetting lesson
          completedSections: [],
          isPlaying: false
        }));
      },
    }),
    { 
      name: 'isaias-master-progress-v2',
      partialize: (state) => ({ 
        currentLessonId: state.currentLessonId,
        currentSlideIndex: state.currentSlideIndex,
        completedSlides: state.completedSlides,
        notes: state.notes,
        // Fix: Persist added state fields
        completedSections: state.completedSections,
        studyAnswers: state.studyAnswers,
      }),
    }
  )
);
