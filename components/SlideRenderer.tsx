
import React, { useState, useEffect } from 'react';
import { Slide, SlideOption, PuzzleItem, RevealItem, DragItem, QuizQuestion } from '../types';
import * as LucideIcons from 'lucide-react';
import { useLessonStore } from '../store/useLessonStore';

interface SlideRendererProps {
  slide: Slide;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  if (!slide) return null;

  const { markSlideComplete, setNote, notes, currentSlideIndex, resetLesson, currentLessonId } = useLessonStore();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // Estado para manejar el item activo en el pop-up independiente
  const [activeRevealIndex, setActiveRevealIndex] = useState<number | null>(null);
  
  const [internalStep, setInternalStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<RevealItem | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState<number>(0);

  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isAppClosing, setIsAppClosing] = useState(false);

  useEffect(() => {
    setInternalStep(0);
    setActiveTab(0);
    setActiveHotspot(null);
    setActiveMenuItem(0);
    setIsSubmitted(false);
    setSelectedOption(null);
    setActiveRevealIndex(null);
    setFlippedCards({});
    setIsAppClosing(false);
    setScore(0);
  }, [currentSlideIndex, slide.id]);

  const toggleCard = (idx: number) => {
    setFlippedCards(prev => {
      const newState = { ...prev, [idx]: !prev[idx] };
      const totalToFlip = slide.interaction?.revealItems?.length || 8;
      if (Object.keys(newState).length >= totalToFlip) markSlideComplete(currentLessonId, currentSlideIndex);
      return newState;
    });
  };

  const handleTriviaSubmit = (idx: number) => {
    if (isSubmitted) return;
    const currentQuiz = slide.interaction?.quiz?.[internalStep];
    if (!currentQuiz) return;

    setSelectedOption(idx);
    setIsSubmitted(true);
    if (idx === currentQuiz.correctIndex) {
      setScore(s => s + 10);
    }
  };

  const nextTrivia = () => {
    if (slide.interaction?.quiz && internalStep < slide.interaction.quiz.length - 1) {
      setInternalStep(internalStep + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      markSlideComplete(currentLessonId, currentSlideIndex);
    }
  };

  const handleAbandon = () => {
    setIsAppClosing(true);
    setTimeout(() => {
      window.location.href = "about:blank";
    }, 1000);
  };

  const isBg = slide.visual.position === 'background';

  if (isAppClosing) {
    return (
      <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
           <LucideIcons.ShieldCheck size={80} className="text-red-600 mx-auto animate-pulse" />
           <p className="text-white/20 font-black uppercase tracking-[0.8em]">Sesión Finalizada</p>
        </div>
      </div>
    );
  }

  // Componente del indicador de capítulo bíblico
  const ChapterBadge = () => {
    if (!slide.chapterReference) return null;
    return (
      <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-[60] animate-in fade-in slide-in-from-right-4 duration-1000">
        <div className="flex items-center gap-2 bg-red-600/10 backdrop-blur-md border border-red-600/30 px-4 py-2 rounded-full shadow-2xl">
          <LucideIcons.BookOpen size={14} className="text-red-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">{slide.chapterReference}</span>
        </div>
      </div>
    );
  };

  const revealItems = slide.interaction?.revealItems || [];
  const activeExpandedItem = activeRevealIndex !== null ? revealItems[activeRevealIndex] : null;

  return (
    <div key={slide.id} className="h-full w-full relative flex flex-col overflow-y-auto custom-scrollbar bg-[#111111]">
      
      {isBg && (
        <div className="absolute inset-0 z-0 transition-opacity duration-1000">
          <img key={slide.visual.source} src={slide.visual.source} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]" />
        </div>
      )}

      {/* Indicador de Capítulo flotante */}
      {slide.type !== 'split-slider' && slide.type !== 'info-menu-reveal' && slide.type !== 'tabs-reveal' && slide.type !== 'completion' && slide.type !== 'quiz' && slide.type !== 'flashcards' && slide.type !== 'stepped-overlay' && <ChapterBadge />}

      <div className={`relative z-10 flex-1 flex flex-col items-center justify-center ${slide.type === 'split-slider' || slide.type === 'info-menu-reveal' || slide.type === 'tabs-reveal' || slide.type === 'stepped-overlay' || slide.type === 'interactive-video' || slide.type === 'timeline' || slide.type === 'flashcards' || slide.type === 'quiz' ? 'p-0' : 'p-8 lg:p-12 max-w-7xl mx-auto w-full'}`}>
        
        {/* LAYOUT: STEPPED OVERLAY */}
        {slide.type === 'stepped-overlay' && slide.interaction?.revealItems && (
           <div className="w-full h-full flex items-center justify-center p-8 lg:p-20 bg-[#111111]">
             <div className="relative w-full max-w-6xl bg-[#1a1a1a] rounded-[3.5rem] border border-white/10 shadow-2xl overflow-hidden min-h-[600px] flex flex-col animate-in zoom-in-95 duration-1000">
                <div className="p-10 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#222222]/50">
                   <div className="space-y-1">
                      <h3 className="text-3xl font-black uppercase text-white tracking-tighter">{slide.title}</h3>
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{slide.subtitle}</p>
                   </div>
                   <div className="flex gap-4">
                      <button onClick={() => setInternalStep(Math.max(0, internalStep - 1))} className="p-4 bg-white/5 rounded-2xl text-white hover:bg-red-600 transition-all disabled:opacity-10" disabled={internalStep === 0}><LucideIcons.ChevronLeft size={24} /></button>
                      <button onClick={() => { const n = Math.min(slide.interaction!.revealItems!.length - 1, internalStep + 1); setInternalStep(n); if (n === slide.interaction!.revealItems!.length - 1) markSlideComplete(currentLessonId, currentSlideIndex); }} className="p-4 bg-white/5 rounded-2xl text-white hover:bg-red-600 transition-all disabled:opacity-10" disabled={internalStep === slide.interaction.revealItems.length - 1}><LucideIcons.ChevronRight size={24} /></button>
                   </div>
                </div>
                <div className="flex-1 relative overflow-hidden text-white flex flex-col">
                   {slide.interaction.revealItems.map((item, i) => (
                     <div key={i} className={`absolute inset-0 p-12 flex flex-col lg:flex-row gap-12 transition-all duration-700 ${i === internalStep ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-12 z-0 pointer-events-none'}`}>
                        {item.image && <img key={item.image} src={item.image} className="lg:w-[45%] aspect-square object-cover rounded-[2.5rem] shadow-2xl border border-white/5" alt={item.title} />}
                        <div className="flex-1 space-y-8 flex flex-col justify-center text-left">
                           <h4 className="text-5xl font-black uppercase tracking-tighter text-white">{item.title}</h4>
                           <div className="p-6 rounded-2xl border-l-4 border-red-600 bg-red-600/5 italic">
                             <p className="text-xl font-bold text-red-500 leading-tight">"{item.text}"</p>
                           </div>
                           <p className="text-lg opacity-80 text-slate-300 font-light leading-relaxed max-w-2xl">{item.longContent}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="absolute bottom-10 right-10 flex gap-2 z-20">
                   {slide.interaction.revealItems.map((_, i) => (
                      <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${i === internalStep ? 'w-8 bg-red-600' : 'w-2 bg-white/10'}`} />
                   ))}
                </div>
                <div className="absolute top-6 right-8 lg:hidden">
                   <ChapterBadge />
                </div>
             </div>
           </div>
        )}

        {/* LAYOUT: TRIVIA / QUIZ */}
        {slide.type === 'quiz' && slide.interaction?.quiz && (
          <div className="w-full h-full flex flex-col p-6 lg:p-16 animate-in fade-in duration-1000 bg-[#111111]">
             <div className="max-w-4xl mx-auto w-full space-y-8">
                <div className="flex items-center justify-between">
                   <div className="space-y-1">
                      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">{slide.title}</h2>
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">{slide.subtitle}</p>
                   </div>
                   <div className="text-right">
                      <div className="text-3xl font-black text-white">{score}</div>
                      <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Puntos Totales</div>
                   </div>
                </div>

                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${((internalStep + 1) / slide.interaction.quiz.length) * 100}%` }} />
                </div>

                <div key={internalStep} className="bg-[#1e1e1e] p-8 lg:p-12 rounded-[2.5rem] border border-white/5 shadow-3xl space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                   <div className="space-y-4">
                      <span className="px-3 py-1 bg-red-600/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full">Pregunta {internalStep + 1} de {slide.interaction.quiz.length}</span>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                        {slide.interaction.quiz[internalStep].question}
                      </h3>
                   </div>

                   <div className="grid grid-cols-1 gap-3">
                      {slide.interaction.quiz[internalStep].options.map((opt, i) => {
                         const isCorrect = i === slide.interaction!.quiz![internalStep].correctIndex;
                         const isSelected = selectedOption === i;
                         let btnClass = "bg-white/5 border-white/5 text-white/70 hover:bg-white/10";
                         
                         if (isSubmitted) {
                            if (isCorrect) btnClass = "bg-green-600 text-white shadow-lg scale-102";
                            else if (isSelected) btnClass = "bg-red-600 text-white opacity-50";
                            else btnClass = "bg-white/5 border-white/5 text-white/20";
                         }

                         return (
                           <button
                             key={i}
                             disabled={isSubmitted}
                             onClick={() => handleTriviaSubmit(i)}
                             className={`w-full p-5 rounded-2xl border text-left font-bold transition-all duration-300 flex items-center justify-between group ${btnClass}`}
                           >
                              <span>{opt}</span>
                              {isSubmitted && isCorrect && <LucideIcons.CheckCircle size={20} />}
                              {isSubmitted && isSelected && !isCorrect && <LucideIcons.XCircle size={20} />}
                           </button>
                         );
                      })}
                   </div>

                   {isSubmitted && (
                     <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-red-600 animate-in fade-in duration-500">
                        <p className="text-sm font-black text-red-500 uppercase tracking-widest mb-2">Retroalimentación</p>
                        <p className="text-slate-300 leading-relaxed font-medium">{slide.interaction.quiz[internalStep].explanation}</p>
                        <button 
                          onClick={nextTrivia}
                          className="mt-6 px-8 py-3 bg-red-600 text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-red-700 transition-all flex items-center gap-2"
                        >
                           {internalStep < slide.interaction.quiz!.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Trivia'}
                           <LucideIcons.ArrowRight size={14} />
                        </button>
                     </div>
                   )}
                </div>
             </div>
          </div>
        )}

        {/* LAYOUT: FLASHCARDS */}
        {slide.type === 'flashcards' && slide.interaction?.revealItems && (
          <div className="w-full h-full flex flex-col p-6 lg:p-12 animate-in fade-in duration-1000 bg-[#111111] overflow-y-auto custom-scrollbar">
             <div className="max-w-7xl mx-auto w-full space-y-10">
                <div className="text-center space-y-2">
                   <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-none">{slide.title}</h2>
                   <p className="text-xs font-black text-red-500 uppercase tracking-[0.5em]">{slide.subtitle}</p>
                   <div className="flex items-center justify-center gap-2 pt-4 opacity-30">
                      <LucideIcons.MousePointer2 size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Haz clic en las tarjetas para girarlas</span>
                   </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 pb-20">
                   {slide.interaction.revealItems.map((item, i) => (
                     <div 
                       key={i} 
                       onClick={() => toggleCard(i)}
                       className="group h-80 w-full sm:w-72 perspective-1000 cursor-pointer"
                     >
                        <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${flippedCards[i] ? 'rotate-y-180' : ''}`}>
                           <div className="absolute inset-0 bg-[#1e1e1e] rounded-[2rem] border border-white/5 flex flex-col items-center justify-center p-8 text-center backface-hidden shadow-2xl">
                              <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
                                 {React.createElement((LucideIcons as any)[item.icon] || LucideIcons.HelpCircle, { size: 30 })}
                              </div>
                              <h4 className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-2">{item.title}</h4>
                              <p className="text-lg font-bold text-white leading-tight">{item.text}</p>
                           </div>
                           <div className="absolute inset-0 bg-red-600 rounded-[2rem] flex flex-col p-8 text-left rotate-y-180 backface-hidden shadow-2xl overflow-y-auto custom-scrollbar">
                              <LucideIcons.Quote className="text-white/20 mb-4 shrink-0" size={30} />
                              <div className="flex-1 space-y-4">
                                 <p className="text-white font-bold leading-tight text-lg">
                                    {item.longContent?.split('\n\n')[0]}
                                 </p>
                                 <div className="pt-4 border-t border-white/20">
                                    <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mb-1">Reflexión / Feedback</p>
                                    <p className="text-white/90 text-sm font-medium italic leading-relaxed">
                                       {item.longContent?.split('\n\n')[1]}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* LAYOUT: TABS REVEAL */}
        {slide.type === 'tabs-reveal' && slide.interaction?.revealItems && (
          <div className="w-full h-full flex flex-col p-6 lg:p-16 animate-in fade-in duration-1000">
            <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
               <div className="space-y-1">
                  <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-none">{slide.title}</h2>
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em]">{slide.subtitle}</p>
               </div>
               <div className="flex flex-wrap gap-2 pt-4">
                  {slide.interaction.revealItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setActiveMenuItem(idx); markSlideComplete(currentLessonId, currentSlideIndex); }}
                      className={`px-6 py-3 rounded-t-2xl font-black uppercase text-[9px] tracking-[0.2em] transition-all duration-300 ${activeMenuItem === idx ? 'bg-red-600 text-white shadow-xl translate-y-0 opacity-100' : 'bg-white/5 text-white/40 hover:bg-white/10 opacity-60 translate-y-1'}`}
                    >
                      {item.title}
                    </button>
                  ))}
               </div>
               <div className="bg-[#1e1e1e] rounded-[2rem] rounded-tl-none border border-white/5 shadow-3xl min-h-[500px] flex flex-col lg:flex-row overflow-hidden relative group">
                  {slide.interaction.revealItems[activeMenuItem].image && (
                     <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000">
                        <img key={slide.interaction.revealItems[activeMenuItem].image} src={slide.interaction.revealItems[activeMenuItem].image} className="w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e]/80" />
                     </div>
                  )}
                  <div className="relative z-10 flex-1 p-10 lg:p-16 flex flex-col gap-8">
                     <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-none">{slide.interaction.revealItems[activeMenuItem].title}</h3>
                     <div className="flex-1 space-y-8">
                        <div className="p-6 bg-white/5 border-l-4 border-red-600 rounded-r-2xl italic">
                           <p className="text-xl lg:text-2xl font-bold text-red-500 leading-tight">"{slide.interaction.revealItems[activeMenuItem].text}"</p>
                        </div>
                        <p className="text-lg lg:text-xl font-light text-slate-300 leading-relaxed opacity-90 whitespace-pre-wrap max-w-4xl">{slide.interaction.revealItems[activeMenuItem].longContent}</p>
                     </div>
                  </div>
                  <div className="hidden lg:flex w-1/3 bg-black/20 backdrop-blur-md items-center justify-center p-12 border-l border-white/5">
                     <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-red-600/10 rounded-3xl flex items-center justify-center text-red-600 mx-auto shadow-2xl">
                           {React.createElement((LucideIcons as any)[slide.interaction.revealItems[activeMenuItem].icon] || LucideIcons.BookOpen, { size: 36 })}
                        </div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">{slide.chapterReference}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* LAYOUT: SPLIT SLIDER */}
        {slide.type === 'split-slider' && slide.interaction?.revealItems && (
          <div className="w-full h-full flex flex-col animate-in fade-in duration-1000 overflow-hidden">
             <div className="h-[45%] relative overflow-hidden shrink-0 group">
                <img key={slide.interaction.revealItems[internalStep].image || slide.visual.source} src={slide.interaction.revealItems[internalStep].image || slide.visual.source} className="absolute inset-0 w-full h-full object-cover animate-in fade-in scale-105 duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent" />
                <div className="absolute bottom-6 left-10 lg:left-20">
                   <h4 className="text-[9px] font-black text-red-500 uppercase tracking-[0.5em] mb-1">{slide.subtitle}</h4>
                   <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-lg">{slide.interaction.revealItems[internalStep].title}</h3>
                </div>
             </div>
             <div className="h-[2px] w-full bg-white/5 relative z-20">
                <div className="absolute inset-y-0 left-0 bg-red-600 transition-all duration-700 shadow-[0_0_15px_rgba(239,68,68,0.8)]" style={{ width: `${((internalStep + 1) / slide.interaction.revealItems.length) * 100}%` }} />
             </div>
             <div className="flex-1 bg-[#111111] p-10 lg:p-16 relative flex flex-col justify-start">
                <div key={internalStep} className="animate-in slide-in-from-bottom-8 duration-700 max-w-5xl mx-auto w-full">
                   <p className="text-xl lg:text-3xl font-bold text-red-500 italic mb-8 border-l-4 border-red-600 pl-8 leading-snug">
                     "{slide.interaction.revealItems[internalStep].text}"
                   </p>
                   <p className="text-base lg:text-xl font-light text-slate-300 leading-relaxed opacity-90 whitespace-pre-wrap">
                      {slide.interaction.revealItems[internalStep].longContent}
                   </p>
                </div>
                <div className="absolute bottom-10 right-10 lg:right-20 flex items-center gap-8">
                   <div className="text-[10px] font-black text-white/30 tracking-[0.4em] uppercase">
                      {internalStep + 1} / {slide.interaction.revealItems.length}
                   </div>
                   <div className="flex gap-3">
                      <button onClick={() => setInternalStep(Math.max(0, internalStep - 1))} className="p-3 bg-white/5 rounded-xl text-white hover:bg-red-600 transition-all disabled:opacity-20 shadow-xl border border-white/5" disabled={internalStep === 0}><LucideIcons.ArrowLeft size={20} /></button>
                      <button onClick={() => { const n = Math.min(slide.interaction!.revealItems!.length - 1, internalStep + 1); setInternalStep(n); if (n === slide.interaction!.revealItems!.length - 1) markSlideComplete(currentLessonId, currentSlideIndex); }} className="p-3 bg-white/5 rounded-xl text-white hover:bg-red-600 transition-all disabled:opacity-20 shadow-xl border border-white/5" disabled={internalStep === slide.interaction.revealItems.length - 1}><LucideIcons.ArrowRight size={20} /></button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* LAYOUT: HERMENEUTICS */}
        {slide.type === 'hermeneutics' && (
          <div className="w-full flex flex-col lg:flex-row gap-12 animate-in fade-in slide-in-from-top-4 duration-1000 items-start h-full">
            <div className={`space-y-6 flex-1 text-left py-10 ${slide.visual.position === 'right' ? 'order-1' : 'order-2'}`}>
               <div className="space-y-2">
                  <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-tight">{slide.title}</h2>
                  <div className="w-20 h-2 bg-red-600 rounded-full" />
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em] mt-2">{slide.subtitle}</p>
               </div>
               <p className="text-lg lg:text-2xl font-light opacity-90 leading-relaxed italic text-slate-300 border-l-4 border-red-600 pl-6 max-w-3xl">"{slide.content}"</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  {slide.interaction?.revealItems?.map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => { setActiveRevealIndex(i); markSlideComplete(currentLessonId, currentSlideIndex); }} 
                      className="p-6 bg-white/5 rounded-3xl border border-white/5 transition-all hover:border-red-600 group text-left relative overflow-hidden"
                    >
                       <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-red-600 text-white transition-all mb-4">
                          {React.createElement((LucideIcons as any)[item.icon] || LucideIcons.Info, { size: 18 })}
                       </div>
                       <h4 className="font-black uppercase text-[10px] tracking-widest text-red-500 mb-1">{item.title}</h4>
                       <p className="text-sm font-bold text-white opacity-80">{item.text}</p>
                    </button>
                  ))}
               </div>
            </div>
            {slide.visual.type === 'image' && (
              <div className={`flex-1 w-full max-w-xl aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative my-10 ${slide.visual.position === 'right' ? 'order-2' : 'order-1'}`}>
                 <img key={slide.visual.source} src={slide.visual.source} className="w-full h-full object-cover" alt="" />
              </div>
            )}
          </div>
        )}

        {slide.type === 'info-menu-reveal' && slide.interaction?.revealItems && (
          <div className="h-full w-full flex flex-col lg:flex-row bg-[#111111] p-10 lg:p-20 gap-10 animate-in fade-in duration-700 items-center justify-center">
             <div className="w-full lg:w-[25%] flex flex-col gap-3 shrink-0">
                {slide.interaction.revealItems.map((item, idx) => (
                   <button
                     key={idx}
                     onClick={() => { setActiveMenuItem(idx); markSlideComplete(currentLessonId, currentSlideIndex); }}
                     className={`relative flex items-center justify-between px-8 py-5 rounded-xl transition-all duration-300 font-black uppercase text-[10px] tracking-[0.2em] ${activeMenuItem === idx ? 'bg-white text-[#111111] shadow-2xl scale-105 z-10' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                   >
                      <span>{item.title}</span>
                   </button>
                ))}
             </div>
             <div className="flex-1 max-w-6xl w-full flex flex-col lg:flex-row bg-white rounded-[3rem] shadow-2xl overflow-hidden ring-1 ring-white/10 relative h-[600px]">
                <div className="flex-[1.2] p-10 lg:p-16 flex flex-col gap-8">
                   <h3 className="text-3xl lg:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-none">{slide.interaction.revealItems[activeMenuItem].title}</h3>
                   <div className="flex-1 overflow-y-auto pr-4 text-[#333333] custom-scrollbar">
                      <p className="text-xl lg:text-2xl font-bold leading-snug mb-8 italic opacity-90 border-l-6 border-red-600 pl-6 py-2">
                         {slide.interaction.revealItems[activeMenuItem].text}
                      </p>
                      <p className="text-lg lg:text-xl font-medium leading-relaxed opacity-80 whitespace-pre-wrap">
                         {slide.interaction.revealItems[activeMenuItem].longContent}
                      </p>
                   </div>
                </div>
                <div className="flex-1 relative min-h-[300px]">
                   {slide.interaction.revealItems[activeMenuItem].image && <img key={slide.interaction.revealItems[activeMenuItem].image} src={slide.interaction.revealItems[activeMenuItem].image} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-1000" alt="" />}
                </div>
             </div>
          </div>
        )}

        {slide.type === 'completion' && (
          <div className="text-center space-y-10 animate-in zoom-in-95 duration-1000">
             <div className="w-24 h-24 bg-red-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl animate-bounce">
                <LucideIcons.ShieldCheck size={50} />
             </div>
             <div className="space-y-3">
                <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none">{slide.title}</h2>
                <p className="text-xl lg:text-2xl font-black text-red-500 uppercase tracking-[0.5em]">{slide.subtitle}</p>
             </div>
             <p className="text-lg lg:text-2xl font-medium text-slate-400 max-w-2xl mx-auto italic leading-relaxed">"{slide.content}"</p>
             <div className="pt-10 flex flex-wrap gap-6 justify-center">
                <button onClick={resetLesson} className="px-12 py-4 bg-white/5 border border-white/10 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all text-white">Reiniciar Clase</button>
                <button onClick={handleAbandon} className="px-12 py-4 bg-red-600 text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-red-700 transition-all shadow-2xl">Salir</button>
             </div>
          </div>
        )}

      </div>

      {/* VENTANA EMERGENTE (POP-UP) INDEPENDIENTE */}
      {activeExpandedItem && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 lg:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setActiveRevealIndex(null)} />
          
          <div className="relative w-full max-w-5xl bg-[#1a1a1a] rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
            
            {/* Header del Modal - Independiente */}
            <div className="p-8 lg:p-10 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600">
                  {React.createElement((LucideIcons as any)[activeExpandedItem.icon] || LucideIcons.Info, { size: 24 })}
                </div>
                <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tighter text-white">
                  {activeExpandedItem.title}
                </h2>
              </div>
              
              <button 
                onClick={() => setActiveRevealIndex(null)}
                className="p-3 bg-white/5 rounded-full hover:bg-red-600 transition-all text-white/50 hover:text-white"
              >
                <LucideIcons.X size={24} />
              </button>
            </div>

            {/* Contenido Único del Modal */}
            <div className="p-10 lg:p-14 flex flex-col lg:flex-row gap-12 items-center">
              
              {/* Columna Izquierda: Imagen */}
              <div className="w-full lg:w-1/2 aspect-square max-w-sm rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl shrink-0">
                <img 
                  key={activeExpandedItem.image || slide.visual.source}
                  src={activeExpandedItem.image || slide.visual.source} 
                  className="w-full h-full object-cover" 
                  alt={activeExpandedItem.title} 
                />
              </div>

              {/* Columna Derecha: Texto */}
              <div className="flex-1 space-y-8 text-left">
                <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                  {activeExpandedItem.title}
                </h3>
                
                {/* Caja de Énfasis Roja */}
                <div className="p-5 bg-black/30 border-l-4 border-red-600 rounded-r-xl">
                  <p className="text-xl lg:text-2xl font-bold text-red-500 leading-tight">
                    "{activeExpandedItem.text}"
                  </p>
                </div>

                <p className="text-lg lg:text-xl text-slate-300 font-light leading-relaxed whitespace-pre-wrap opacity-90">
                  {activeExpandedItem.longContent}
                </p>

                <div className="pt-8">
                  <button 
                    onClick={() => setActiveRevealIndex(null)}
                    className="px-12 py-4 bg-red-600 text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-700 transition-all shadow-xl"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .scale-102 { transform: scale(1.02); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(239,68,68,0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default SlideRenderer;
