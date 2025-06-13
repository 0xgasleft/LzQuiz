import React, { useEffect, useState, useRef } from 'react';
import './ui/quizBubbles.css';
import {LEVEL} from '@/lib/utils';


interface QuizQuestion {
  id: number;
  question: string;
  answers: string[];
  correct: number;
  difficulty: LEVEL;
}

const levelInfo = [
  {
    key: LEVEL.EASY,
    label: '⬜ SEEKER',
    desc: 'For those who explore at their own pace.'
  },
  {
    key: LEVEL.INTERMEDIATE,
    label: '🟦 CHALLENGER',
    desc: 'For the brave and bold.\nEach step forward demands resolve.'
  },
  {
    key: LEVEL.HARD,
    label: '🟥 LEGEND',
    desc: 'For the fearless.\nOnly the worthy survive this trial.'
  }
] as const;

const fetchQuiz = async (): Promise<QuizQuestion[]> => {
  const res = await fetch('/api/quiz');
  if (!res.ok) throw new Error('Failed to fetch quiz');
  return res.json();
};

const TypewriterScore: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    if (visibleCount < text.length) {
      const timeout = setTimeout(() => setVisibleCount(visibleCount + 1), 50);
      return () => clearTimeout(timeout);
    }
  }, [visibleCount, text]);
  return (
    <span className={className}>
      {text.slice(0, visibleCount).split('').map((char, i) => (
        <span key={i} className="inline-block animate-fade-in" style={{ animationDelay: `${i * 0.04}s` }}>{char}</span>
      ))}
    </span>
  );
};

const QuizBubbles: React.FC = () => {
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selected, setSelected] = useState<{[key:number]: number}>({});
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState<LEVEL | null>(null);
  const [hovered, setHovered] = useState<null | LEVEL>(null);
  const [activeIcon, setActiveIcon] = useState(0);
  const [_, setLevelsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [canShowMain, setCanShowMain] = useState(false);
  const [levelUnlocked, setLevelUnlocked] = useState<LEVEL>(LEVEL.EASY);
  const [completedLevels, setCompletedLevels] = useState<LEVEL[]>([]);
  const barTimeout = useRef<NodeJS.Timeout | null>(null);

  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);

  const getNextLevel = (level: LEVEL) => {
    if (level === LEVEL.EASY) return LEVEL.INTERMEDIATE;
    if (level === LEVEL.INTERMEDIATE) return LEVEL.HARD;
    return null;
  };

  useEffect(() => {
    if (!showResult || difficulty == null) return;
    const questionsForLevel = questions.filter(q => q.difficulty === difficulty);
    const score = Object.entries(selected).filter(([qid, aid]) => {
      const q = questionsForLevel.find(q => q.id === Number(qid));
      return q && q.correct === aid;
    }).length;
    
    if (
      questionsForLevel.length > 0 &&
      score === questionsForLevel.length &&
      !completedLevels.includes(difficulty)
    ) {
      setCompletedLevels(prev => [...prev, difficulty]);
    }
  }, [showResult, difficulty, selected, questions, completedLevels]);

  useEffect(() => {
    if (!showResult || difficulty === null) return;
    const score = Object.entries(selected).filter(([qid, aid]) => {
      const q = questions.filter(q => q.difficulty === difficulty).find(q => q.id === Number(qid));
      return q && q.correct === aid;
    }).length;
    const total = questions.filter(q => q.difficulty === difficulty).length;
    if (score === total) {
      const next = getNextLevel(difficulty);
      if (next !== null && next > levelUnlocked) {
        setLevelUnlocked(next);
      }
    }
  }, [showResult, difficulty, selected, questions, levelUnlocked]);


  useEffect(() => {
    
    if (loading) {
      setCanShowMain(false);
      setShowBar(false);
      if (barTimeout.current) clearTimeout(barTimeout.current);
      return;
    }
    
    if (!showBar && !canShowMain) {
      setShowBar(true);
      barTimeout.current = setTimeout(() => {
        setShowBar(false);
        setCanShowMain(true);
      }, 700);
    }
    return () => {
      if (barTimeout.current) clearTimeout(barTimeout.current);
    };
  }, [loading]);

  useEffect(() => {
    if (!showResult && filteredQuestions.length > 0) {
      setVisibleCount(1);
      let i = 1;
      const interval = setInterval(() => {
        i++;
        setVisibleCount(i);
        if (i > filteredQuestions.length) {
          clearInterval(interval);
        }
      }, 180);
      return () => clearInterval(interval);
    }
  }, [filteredQuestions.length, showResult]);

  useEffect(() => {
    if (!difficulty) {
      const interval = setInterval(() => {
        setActiveIcon((prev) => (prev + 1) % levelInfo.length);
      }, 600);
      return () => clearInterval(interval);
    }
  }, [difficulty]);

  useEffect(() => {
    fetchQuiz()
      .then(qs => {
        setQuestions(qs);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSelect = (qid: number, aid: number) => {
    setSelected(prev => ({ ...prev, [qid]: aid }));
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleRetry = () => {
    setSelected({});
    setShowResult(false);
    setDifficulty(null);
    setHovered(null);
    setVisibleCount(0);
    setCanShowMain(true);
    setShowBar(false);
    setLoading(false);
    if (barTimeout.current) clearTimeout(barTimeout.current);
  };

  const handleNextLevel = () => {
    const next = getNextLevel(difficulty!);
    if (next) {
      setDifficulty(next);
      setShowResult(false);
      setSelected({});
      setVisibleCount(0);
    } else {
      setDifficulty(null);
      setShowResult(false);
      setSelected({});
      setVisibleCount(0);
      setHovered(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  if ((loading || showBar) && !canShowMain) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black dark:border-white mb-6"></div>
        {loading ? (
          <div className="text-lg text-black dark:text-white font-mono">🗝️ Requesting access from the Sentinel of Secrets.</div>
        ) : (
          <div className="w-64 h-2 bg-black border border-white rounded-full overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full bg-white animate-quiz-bar-fill" style={{ width: '100%' }} />
          </div>
        )}
      </div>
    );
  }

  if (!canShowMain) return null;

  if (difficulty === null) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] w-full gap-8">

          <div
            className="flex gap-8 relative"
            onMouseEnter={() => setLevelsHovered(true)}
            onMouseLeave={() => setLevelsHovered(false)}
          >
            {levelInfo.map((level, idx) => {
            let isUnlocked = false;
            if (level.key === LEVEL.EASY) isUnlocked = true;
            if (level.key === LEVEL.INTERMEDIATE && levelUnlocked >= LEVEL.INTERMEDIATE) isUnlocked = true;
            if (level.key === LEVEL.HARD && levelUnlocked === LEVEL.HARD) isUnlocked = true;

            const isCompleted = completedLevels.includes(level.key);
            const isDisabled = !isUnlocked || isCompleted;

            return (
              <div key={level.key} className="relative flex flex-col items-center">
                <button
                  onClick={() => setDifficulty(level.key as LEVEL)}
                  disabled={isDisabled}
                  className={`px-8 py-4 border-2 text-2xl flex items-center transition-colors duration-300
                    ${hovered === level.key ? 'text-black bg-white border-white' : 'text-white bg-black border-white'}
                    ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  onMouseEnter={() => setHovered(level.key)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ position: 'relative' }}
                >
                  {isCompleted && hovered === level.key ? (
                    // Show big checkmark on hover if completed
                    <span className="text-green-500 text-3xl w-full flex justify-center items-center">✔️</span>
                  ) : (
                    <>
                      <span
                        className={`inline-block transition-transform duration-300 mr-4 ${activeIcon === idx ? 'scale-125' : 'scale-100'}`}
                        style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
                      >
                        {level.label.split(' ')[0]}
                      </span>
                      <span>{level.label.split(' ').slice(1).join(' ')}</span>
                      {isCompleted && (
                        <span className="ml-2 text-green-500 text-2xl" aria-label="Completed">✔️</span>
                      )}
                    </>
                  )}
                </button>
                {!isUnlocked && (
                  <span className="mt-2 text-2xl text-gray-400 select-none" aria-label="Locked">🔒</span>
                )}
                {hovered === level.key && (
                  <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-black text-black dark:text-white text-center text-base rounded-xl border border-black dark:border-white shadow-xl px-4 py-3 z-10">
                    {level.desc.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                )}
              </div>
            );
            })}
          </div>

          {completedLevels.length === levelInfo.length && (
  <div
    className="mt-12 flex justify-center"
  >
    <span
      className="text-3xl md:text-3.5xl font-extrabold uppercase tracking-widest text-center select-none animate-epic-phrase"
      style={{
        WebkitTextStroke: '1px white',
        color: 'black',
        letterSpacing: '0.15em'
      }}
    >
      “Darkness vanquished — your legend ignites!”
    </span>
  </div>
)}
        </div>
      );
    }

  return (
  <div className="flex flex-col items-center justify-center gap-6 px-2 py-8 bg-white dark:bg-black min-h-screen w-full">
    <button
      className="absolute top-4 left-4 z-20 flex items-center justify-center w-20 h-20 rounded-full border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-lg"
      onClick={handleRetry}
      aria-label="Back to difficulty select"
    >
      <img
        src="/home.png"
        alt="Home"
        style={{ width: '5rem', height: '4rem', display: 'block' }}
      />
    </button>
    <div className="w-full flex justify-center">
      <span className="text-2xl font-bold text-black dark:text-white mb-2">
        {difficulty === LEVEL.EASY && levelInfo.filter((level) => level.key == LEVEL.EASY)[0].label}
        {difficulty === LEVEL.INTERMEDIATE && levelInfo.filter((level) => level.key == LEVEL.INTERMEDIATE)[0].label}
        {difficulty === LEVEL.HARD && levelInfo.filter((level) => level.key == LEVEL.HARD)[0].label}
      </span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      {filteredQuestions.map((q, idx) => {
        const isLastOdd =
          filteredQuestions.length % 2 && idx === filteredQuestions.length - 1;
        return (
          <div
            key={q.id}
            className={`p-6 rounded-2xl border border-black dark:border-white bg-white dark:bg-black shadow-md flex flex-col items-center transition-all duration-500 quiz-bubble-fade ${
              idx < visibleCount
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8 pointer-events-none'
            } ${isLastOdd ? 'sm:col-span-2 sm:justify-self-center' : ''}`}
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
            <div className="text-lg font-semibold text-black dark:text-white mb-4">{q.question}</div>
            <div className="flex flex-wrap gap-4 justify-center w-full">
              {q.answers.map((a, i) => {
                const isSelected = selected[q.id] === i;
                const isCorrect = showResult && i === q.correct;
                const isWrong = showResult && isSelected && i !== q.correct;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(q.id, i)}
                    disabled={showResult}
                    className={`px-4 py-2 rounded-full border transition-colors
                      ${isSelected ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-black dark:text-white'}
                      ${isCorrect ? 'border-green-500' : isWrong ? 'border-red-500' : 'border-black dark:border-white'}
                      ${showResult && isCorrect ? 'ring-2 ring-green-500' : ''}
                      ${showResult && isWrong ? 'ring-2 ring-red-500' : ''}
                    `}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
    {filteredQuestions.length > 0 && !showResult && (
      <button
        className="mt-8 px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold text-lg border border-black dark:border-white hover:scale-105 transition-transform"
        onClick={handleSubmit}
      >
        Submit
      </button>
    )}
    {showResult && (
        <div className="mt-12 flex flex-col items-center justify-center">
          <div className={`text-5xl font-extrabold mb-4 drop-shadow-lg ${
            Object.entries(selected).filter(([qid, aid]) => {
              const q = filteredQuestions.find(q => q.id === Number(qid));
              return q && q.correct === aid;
            }).length === filteredQuestions.length
              ? "text-green-600"
              : "text-red-600"
          }`}>
            {(() => {
              const score = Object.entries(selected).filter(([qid, aid]) => {
                const q = filteredQuestions.find(q => q.id === Number(qid));
                return q && q.correct === aid;
              }).length;

              const isPerfect = score === filteredQuestions.length;
              const scoreColor = isPerfect ? "text-green-600" : "text-red-600";
              const scoreText = `Score: ${score} / ${filteredQuestions.length}`;
              return <TypewriterScore text={scoreText} className={scoreColor} />;
            })()}
          </div>
          <div className="text-lg text-black dark:text-white font-mono tracking-wide flex gap-4">
            {(() => {
              const score = Object.entries(selected).filter(([qid, aid]) => {
                const q = filteredQuestions.find(q => q.id === Number(qid));
                return q && q.correct === aid;
              }).length;
              if (score !== filteredQuestions.length) {
                return (
                  <button
                    className="px-8 py-3 rounded-full bg-red-600 text-white font-bold text-lg border border-red-700 shadow-lg hover:scale-105 transition-transform mt-6"
                    onClick={handleRetry}
                  >
                    Retry
                  </button>
                );
              }
              
              return (
                <button
                  className="px-8 py-3 rounded-full bg-green-600 text-white font-bold text-lg border border-green-700 shadow-lg hover:scale-105 transition-transform mt-6"
                  onClick={handleNextLevel}
                >
                  Next
                </button>
              );
            })()}
          </div>
        </div>
      )}
  </div>
);
};

export default QuizBubbles;