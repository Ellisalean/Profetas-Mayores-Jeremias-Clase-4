
import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { useLessonStore } from '../store/useLessonStore';

interface MissionModuleProps {
  id: string;
  goal: string;
  tasks: string[];
}

const MissionModule: React.FC<MissionModuleProps> = ({ id, goal, tasks }) => {
  const { completedSections, toggleSection } = useLessonStore();
  const isDone = completedSections.includes(id);

  return (
    <div className={`my-8 p-8 rounded-3xl border-2 transition-all duration-500 ${
      isDone 
        ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
        : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
    }`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-2xl ${isDone ? 'bg-green-500' : 'bg-blue-600'} text-white shadow-lg`}>
          <Target size={28} />
        </div>
        <div>
          <h4 className={`text-2xl font-bold ${isDone ? 'text-green-800 dark:text-green-400' : 'text-blue-800 dark:text-blue-400'}`}>
            Misión de Aprendizaje
          </h4>
          <p className="text-slate-600 dark:text-slate-400 font-medium">{goal}</p>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
            <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isDone ? 'border-green-500 text-green-500' : 'border-slate-300 dark:border-slate-600'}`}>
              {isDone ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{i+1}</span>}
            </div>
            <span className="text-slate-700 dark:text-slate-300 font-medium">{task}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => toggleSection(id)}
        className={`mt-8 w-full py-4 rounded-2xl font-bold transition-all transform active:scale-95 ${
          isDone 
            ? 'bg-green-600 text-white hover:bg-green-700' 
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20'
        }`}
      >
        {isDone ? 'Misión Completada' : 'Aceptar Desafío y Marcar Lectura'}
      </button>
    </div>
  );
};

export default MissionModule;
