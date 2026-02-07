
import React, { useEffect, useState } from 'react';
import { useLessonStore } from './store/useLessonStore';
import { ALL_LESSONS } from './data/lessonContent';
import SlideRenderer from './components/SlideRenderer';
import { 
  ChevronRight, ChevronLeft, Menu, 
  X, PanelLeftClose,
  HelpCircle, Play, Pause,
  Keyboard, MousePointer2, BookOpen,
  Home, RotateCcw
} from 'lucide-react';

const App: React.FC = () => {
  const { 
    currentLessonId, setCurrentLesson,
    currentSlideIndex, nextSlide, prevSlide, goToSlide,
    isSidebarOpen, toggleSidebar,
    completedSlides, isPlaying, toggleAutoplay,
    isHelpOpen, toggleHelp, resetLesson
  } = useLessonStore();

  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const lessonIds = Object.keys(ALL_LESSONS);
  const currentLesson = ALL_LESSONS[currentLessonId] || ALL_LESSONS[lessonIds[0]];
  const currentSlide = currentLesson.slides[currentSlideIndex];
  const total = currentLesson.totalSlides;
  const currentCompleted = completedSlides[currentLessonId] || [];

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying) {
      interval = window.setInterval(() => {
        if (currentSlideIndex < total - 1) {
          nextSlide();
        } else {
          toggleAutoplay();
        }
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlideIndex, nextSlide, toggleAutoplay, total]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentSlideIndex, currentLessonId]);

  const handleHome = () => {
    resetLesson();
    goToSlide(0);
  };

  const handleFullReset = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar todo el progreso y la caché? Esto refrescará el contenido y las imágenes.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="h-screen w-screen bg-[#111111] flex transition-all duration-500 overflow-hidden text-white font-jakarta relative">
      
      {isSidebarOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] lg:hidden" onClick={toggleSidebar} />}
      
      {isHelpOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={toggleHelp} />
          <div className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-10 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Guía de Estudio</h2>
                <p className="text-xs font-bold text-red-500 uppercase tracking-widest mt-1">Navegación Interactiva</p>
              </div>
              <button onClick={toggleHelp} className="p-3 bg-white/5 rounded-full hover:bg-red-500 transition-all"><X size={24} /></button>
            </div>
            <div className="p-10 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 overflow-y-auto">
               <div className="space-y-6">
                 <div className="flex items-center gap-4 text-red-500"><Keyboard size={28} /><h3 className="text-xl font-black uppercase">Atajos</h3></div>
                 <div className="space-y-2">
                    <div className="flex justify-between p-4 bg-white/5 rounded-xl text-xs font-bold"><span>Siguiente</span><kbd className="bg-red-600 px-2 py-0.5 rounded">→</kbd></div>
                    <div className="flex justify-between p-4 bg-white/5 rounded-xl text-xs font-bold"><span>Anterior</span><kbd className="bg-red-600 px-2 py-0.5 rounded">←</kbd></div>
                 </div>
               </div>
               <div className="space-y-6">
                 <div className="flex items-center gap-4 text-red-500"><MousePointer2 size={28} /><h3 className="text-xl font-black uppercase">Interacciones</h3></div>
                 <p className="text-xs opacity-50 font-medium">Usa las tarjetas 3D, mapas y laboratorios de reflexión para profundizar en las profecías mesiánicas.</p>
               </div>
            </div>
          </div>
        </div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-[70] bg-[#1a1a1a] border-r border-white/5 transition-all duration-500 lg:relative 
        ${isSidebarOpen ? 'w-80 translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isDesktopCollapsed ? 'lg:w-0 lg:border-none' : 'lg:w-80'}
      `}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-black uppercase tracking-tighter text-sm text-red-500">Módulos del Curso</h4>
              <button onClick={() => setIsDesktopCollapsed(true)} className="hidden lg:block text-white/60 hover:text-white"><PanelLeftClose size={20} /></button>
            </div>
            
            <div className="space-y-2">
              {lessonIds.map(id => (
                <button 
                  key={id}
                  onClick={() => setCurrentLesson(id)}
                  className={`w-full p-3 rounded-xl border flex items-center gap-3 transition-all ${currentLessonId === id ? 'bg-red-600/10 border-red-600 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'}`}
                >
                  <BookOpen size={16} className={currentLessonId === id ? 'text-red-500' : ''} />
                  <span className="text-[10px] font-black uppercase tracking-wider text-left line-clamp-1">{ALL_LESSONS[id].title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            <p className="px-4 py-2 text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Contenido de Clase</p>
            {currentLesson.slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => { goToSlide(idx); if (window.innerWidth < 1024) toggleSidebar(); }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${currentSlideIndex === idx ? 'bg-red-600 text-white shadow-xl' : 'text-white/40 hover:bg-white/5'}`}
              >
                <span className="text-[10px] font-black opacity-30 w-4">{idx + 1}.</span>
                <span className="text-xs font-black uppercase tracking-tight truncate">{s.title}</span>
                {currentCompleted.includes(idx) && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-white/5">
            <button 
              onClick={handleFullReset}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 text-white/30 hover:bg-red-600/20 hover:text-red-500 transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <RotateCcw size={14} />
              Reiniciar Todo
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full relative bg-[#111111]">
        <header className="h-16 px-6 lg:px-10 flex items-center justify-between border-b border-white/5 bg-[#1a1a1a] z-50 shrink-0">
           <div className="flex items-center gap-6">
              <button onClick={() => { if (window.innerWidth >= 1024) setIsDesktopCollapsed(!isDesktopCollapsed); else toggleSidebar(); }} className="text-white/60 hover:text-white"><Menu size={20} /></button>
              <div className="hidden sm:block">
                <h1 className="text-xs font-black uppercase tracking-widest text-white/80">{currentLesson.title}</h1>
                <p className="text-[9px] font-bold text-red-500 uppercase tracking-tight">{currentLesson.subtitle}</p>
              </div>
           </div>

           <div className="absolute left-1/2 -translate-x-1/2 text-[10px] font-black tracking-[0.4em] text-red-600">
             {currentSlideIndex + 1} / {total}
           </div>

           <div className="flex items-center gap-6 text-white/60">
              <div className="hidden md:flex items-center gap-4">
                <button onClick={toggleAutoplay} title="Autoplay" className={`hover:text-red-500 transition-colors ${isPlaying ? 'text-red-500 animate-pulse' : ''}`}>{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>
                <button onClick={handleHome} title="Inicio" className="hover:text-red-500 transition-colors"><Home size={18} /></button>
                <button onClick={toggleHelp} title="Ayuda" className="hover:text-red-500 transition-colors"><HelpCircle size={18} /></button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="p-2 hover:text-red-500 disabled:opacity-10 transition-all"><ChevronLeft size={24} /></button>
                <button onClick={nextSlide} disabled={currentSlideIndex === total - 1} className="p-2 hover:text-red-500 disabled:opacity-10 transition-all"><ChevronRight size={24} /></button>
              </div>
           </div>
        </header>

        <div className="flex-1 relative overflow-hidden">
           <div className={`h-full w-full transition-all duration-700 ease-out transform ${isAnimating ? 'opacity-0 scale-98 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}>
              <SlideRenderer slide={currentSlide} />
           </div>
        </div>

        <div className="absolute top-16 left-0 right-0 h-[2px] bg-white/5 z-[60]">
           <div className="h-full bg-red-600 transition-all duration-1000 shadow-[0_0_10px_rgba(239,68,68,0.5)]" style={{ width: `${((currentSlideIndex + 1) / total) * 100}%` }} />
        </div>
      </main>
    </div>
  );
};

export default App;
