
import React, { useState } from 'react';
import { DecisionOption } from '../types';
import { Compass, CheckCircle, XCircle } from 'lucide-react';

interface DecisionModuleProps {
  scenario: string;
  options: DecisionOption[];
}

const DecisionModule: React.FC<DecisionModuleProps> = ({ scenario, options }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedOption = options.find(o => o.id === selectedId);

  return (
    <div className="my-8 bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      <div className="p-8 border-b border-slate-800 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Compass className="text-white" size={24} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Escenario de Decisión</span>
        </div>
        <p className="text-xl font-medium leading-relaxed italic text-slate-200">
          "{scenario}"
        </p>
      </div>

      <div className="p-8 space-y-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedId(opt.id)}
            disabled={!!selectedId}
            className={`w-full text-left p-5 rounded-2xl border transition-all ${
              selectedId === opt.id 
                ? (opt.isBiblical ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10')
                : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{opt.label}</span>
              {selectedId === opt.id && (
                opt.isBiblical ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />
              )}
            </div>
          </button>
        ))}

        {selectedId && (
          <div className={`mt-6 p-6 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500 ${
            selectedOption?.isBiblical ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
          }`}>
            <p className="text-sm font-bold uppercase mb-2">Resultado:</p>
            <p className="text-lg leading-relaxed">{selectedOption?.feedback}</p>
            <button 
              onClick={() => setSelectedId(null)}
              className="mt-4 text-xs font-bold uppercase tracking-widest underline opacity-70 hover:opacity-100"
            >
              Intentar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionModule;
