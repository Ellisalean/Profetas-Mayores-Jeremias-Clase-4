
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentIdx];

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setIsSubmitted(false);
    }
  };

  const handleSubmit = () => {
    if (selected === question.correctIndex) setScore(score + 1);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm my-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Checkpoint {currentIdx + 1}/{questions.length}</span>
        {isSubmitted && (
          <span className={`text-sm font-semibold ${selected === question.correctIndex ? 'text-green-600' : 'text-red-600'}`}>
            {selected === question.correctIndex ? '¡Correcto!' : 'Incorrecto'}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white leading-tight">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            disabled={isSubmitted}
            onClick={() => setSelected(i)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
              selected === i 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-600'
            } ${
              isSubmitted && i === question.correctIndex ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : ''
            } ${
              isSubmitted && selected === i && i !== question.correctIndex ? 'bg-red-50 dark:bg-red-900/20 border-red-500' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${
                selected === i ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-200 dark:border-slate-600 text-slate-400'
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{opt}</span>
            </div>
          </button>
        ))}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold rounded-xl transition-colors"
        >
          Verificar respuesta
        </button>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm text-slate-600 dark:text-slate-400 italic">
            {question.explanation}
          </div>
          {currentIdx < questions.length - 1 && (
            <button onClick={handleNext} className="w-full py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-xl">
              Siguiente pregunta
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
