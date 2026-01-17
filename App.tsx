
import React, { useState, useEffect, useCallback } from 'react';
import QuoteCard from './components/QuoteCard';
import { Quote } from './types';
import { fetchRandomQuote } from './services/geminiService';

const App: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getNewQuote = useCallback(async () => {
    setIsLoading(true);
    // Small timeout to ensure visual transition if the API is too fast
    const minWait = new Promise(resolve => setTimeout(resolve, 600));
    const [newQuote] = await Promise.all([fetchRandomQuote(), minWait]);
    setQuote(newQuote);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getNewQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-amber-50 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      {/* Header */}
      <header className="mb-12 text-center z-10">
        <h1 className="text-sm font-semibold tracking-[0.3em] uppercase text-slate-400 mb-2">
          ZenQuote AI
        </h1>
        <p className="text-slate-300 text-xs font-light">
          Wisdom on Demand
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full flex flex-col items-center z-10">
        <QuoteCard quote={quote} isLoading={isLoading} />

        <div className="mt-16 flex flex-col items-center gap-6">
          <button
            onClick={getNewQuote}
            disabled={isLoading}
            className={`
              group relative px-10 py-4 bg-slate-900 text-white rounded-full 
              font-medium text-sm tracking-wide transition-all duration-300
              hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 active:translate-y-0
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Discover New Wisdom'
              )}
            </span>
          </button>

          <p className="text-slate-400 text-[10px] uppercase tracking-widest opacity-60">
            Powered by Gemini 3 Flash
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 text-center text-slate-300 text-xs font-light tracking-wide z-10">
        &copy; {new Date().getFullYear()} ZenQuote AI
      </footer>
    </div>
  );
};

export default App;
