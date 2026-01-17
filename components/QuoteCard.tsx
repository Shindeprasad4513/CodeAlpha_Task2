
import React from 'react';
import { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote | null;
  isLoading: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl px-8 py-16 bg-white rounded-3xl shadow-sm animate-pulse border border-slate-100">
        <div className="h-6 bg-slate-100 rounded-full w-3/4 mb-4 mx-auto"></div>
        <div className="h-6 bg-slate-100 rounded-full w-1/2 mb-8 mx-auto"></div>
        <div className="h-4 bg-slate-50 rounded-full w-32 mx-auto"></div>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="w-full max-w-2xl px-10 py-20 bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-700 ease-out transform scale-100 hover:shadow-lg">
      <div className="relative">
        {/* Decorative Quote Mark */}
        <span className="absolute -top-10 -left-6 text-8xl text-slate-100 font-serif select-none pointer-events-none opacity-50">
          &ldquo;
        </span>
        
        <div className="flex flex-col items-center text-center space-y-8">
          <p className="text-3xl md:text-4xl font-serif text-slate-800 leading-relaxed italic">
            {quote.text}
          </p>
          
          <div className="flex flex-col items-center space-y-2">
            <div className="h-px w-12 bg-slate-200"></div>
            <h3 className="text-lg font-medium text-slate-500 uppercase tracking-widest">
              {quote.author}
            </h3>
            <span className="px-3 py-1 bg-slate-50 text-slate-400 text-xs rounded-full uppercase tracking-tighter">
              {quote.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
