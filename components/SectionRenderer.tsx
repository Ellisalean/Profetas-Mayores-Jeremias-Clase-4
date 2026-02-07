
import React from 'react';
import { LessonSection } from '../types';
import Quiz from './Quiz';
import Timeline from './Timeline';
import DecisionModule from './DecisionModule';
import MissionModule from './MissionModule';
import { Info, Lightbulb, Heart, Book, CheckCircle2, ChevronRight } from 'lucide-react';
import { useLessonStore } from '../store/useLessonStore';

interface SectionRendererProps {
  section: LessonSection;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  const { toggleSection, completedSections, setStudyAnswer, studyAnswers } = useLessonStore();
  const isCompleted = completedSections.includes(section.id);

  const renderIcon = () => {
    switch (section.calloutType) {
      case 'idea': return <Lightbulb className="text-amber-500" />;
      case 'context': return <Info className="text-blue-500" />;
      case 'application': return <Heart className="text-red-500" />;
      case 'verse': return <Book className="text-purple-500" />;
      default: return <Info className="text-blue-500" />;
    }
  };

  return (
    <section id={section.id} className="py-12 group scroll-mt-24 transition-all duration-700">
      <div className="flex items-center justify-between mb-6">
        {section.type === 'heading' || section.type === 'journey-step' ? (
           <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-4">
              <div className="w-2 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30" />
              {section.title}
           </h2>
        ) : (
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {section.title}
          </h3>
        )}
        
        {section.type !== 'mission' && section.type !== 'decision' && (
          <button 
            onClick={() => toggleSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isCompleted 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-500'
            }`}
          >
            {isCompleted ? <CheckCircle2 size={16} /> : null}
            {isCompleted ? 'Logrado' : 'Marcar progreso'}
          </button>
        )}
      </div>

      <div className="space-y-8">
        {(section.type === 'text' || section.type === 'journey-step') && section.content && (
          <div className="prose prose-slate dark:prose-invert max-w-none text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            {section.content}
          </div>
        )}

        {section.type === 'mission' && section.mission && (
          <MissionModule id={section.id} goal={section.mission.goal} tasks={section.mission.tasks} />
        )}

        {section.type === 'decision' && section.decision && (
          <DecisionModule scenario={section.decision.scenario} options={section.decision.options} />
        )}

        {section.type === 'callout' && (
          <div className={`p-8 rounded-3xl border-l-8 shadow-sm flex gap-6 ${
            section.calloutType === 'verse' ? 'bg-purple-50 dark:bg-purple-900/10 border-purple-500' :
            section.calloutType === 'idea' ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-500' :
            'bg-blue-50 dark:bg-blue-900/10 border-blue-500'
          }`}>
            <div className="flex-shrink-0 mt-1 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              {renderIcon()}
            </div>
            <div>
              <p className="text-xl font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
                {section.content}
              </p>
            </div>
          </div>
        )}

        {section.type === 'quiz' && section.quiz && (
          <Quiz questions={section.quiz} />
        )}

        {section.type === 'timeline' && section.events && (
          <Timeline events={section.events} />
        )}

        {section.type === 'reflection-lab' && section.studyQuestions && (
          <div className="space-y-8 mt-10">
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mb-12">
               <h4 className="text-2xl font-bold text-white mb-2">Laboratorio de Reflexión</h4>
               <p className="text-slate-400">Tus respuestas se guardan localmente para tu estudio personal.</p>
            </div>
            {section.studyQuestions.map((q, i) => (
              <div key={i} className="group p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors">
                <label className="block text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 group-hover:text-blue-600 transition-colors">
                  <span className="text-blue-600 mr-4">0{i + 1}.</span> {q}
                </label>
                <textarea
                  className="w-full h-40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-lg resize-none"
                  placeholder="Tu reflexión profunda aquí..."
                  value={studyAnswers[`${section.id}-${i}`] || ''}
                  onChange={(e) => setStudyAnswer(`${section.id}-${i}`, e.target.value)}
                />
              </div>
            ))}
            <div className="flex justify-end pt-8">
              <button className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 transform hover:-translate-y-1">
                Exportar Bitácora
              </button>
            </div>
          </div>
        )}

        {section.subsections?.map(sub => (
          <SectionRenderer key={sub.id} section={sub} />
        ))}
      </div>
    </section>
  );
};

export default SectionRenderer;
