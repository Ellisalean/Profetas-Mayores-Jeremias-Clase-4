
import React from 'react';
import { Lesson } from '../types';
import { useLessonStore } from '../store/useLessonStore';
import { BookOpen, Clock, Target } from 'lucide-react';

interface LessonHeroProps {
  lesson: Lesson;
}

const LessonHero: React.FC<LessonHeroProps> = ({ lesson }) => {
  return (
    <div className="relative pt-12 pb-16 px-6 lg:px-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
        <BookOpen size={200} />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 uppercase tracking-widest">
          <span>Curso de Profetas</span>
          <span>/</span>
          <span className="text-blue-600">Lección 1</span>
        </nav>

        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
          {lesson.title}
        </h1>
        
        <p className="text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed italic">
          "{lesson.subtitle}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
              <Target size={18} className="text-blue-600" />
              Objetivos de Aprendizaje
            </div>
            <ul className="space-y-3">
              {/* Added optional chaining to prevent crash if objectives array is missing */}
              {lesson.objectives?.map((obj, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center items-start md:items-end">
             <div className="flex items-center gap-4 text-slate-400">
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                  <Clock size={16} />
                  {/* Added default value for duration to prevent empty badge */}
                  <span className="text-xs font-bold uppercase">{lesson.duration || '20 min'} est.</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonHero;
