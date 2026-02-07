
import React from 'react';
import { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative py-12 px-4">
      {/* Central Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200 dark:bg-slate-700 hidden md:block" />
      
      <div className="space-y-12">
        {events.map((ev, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            {/* Content Card */}
            <div className="flex-1 w-full">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold mb-3">
                  {ev.date}
                </span>
                {/* Fixed: Use label instead of event */}
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{ev.label}</h4>
                {/* Fixed: Use details instead of description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{ev.details}</p>
              </div>
            </div>

            {/* Icon/Dot */}
            <div className="relative z-10 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-sm md:block hidden" />

            {/* Spacer */}
            <div className="flex-1 hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
