import { useEffect } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { useCardsStore } from '../../stores/useCardsStore';
import { useUIStore } from '../../stores/useUIStore';
import { useSpeech } from '../../hooks/useSpeech';
export const GamePanel = () => {
  const { cards } = useCardsStore();
  const speak = useSpeech();
  const { snapshot, currentCard, start, flip, markCorrect, markWrong, next, shuffle, reset } =
    useGameStore();
  const { lowMotion } = useUIStore();

  useEffect(() => {
    if (cards.length) {
      start(cards);
    } else {
      reset();
    }
  }, [cards, start, reset]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        flip();
      }
      if (event.key.toLowerCase() === 'j') {
        void markCorrect();
      }
      if (event.key.toLowerCase() === 'k') {
        void markWrong();
      }
      if (event.key.toLowerCase() === 'n') {
        next();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [flip, markCorrect, markWrong, next]);

  const progressTotal = snapshot.deck.length;
  const progressCurrent =
    snapshot.phase === 'complete' ? progressTotal : Math.min(snapshot.index + 1, progressTotal);

  return (
    <aside className="flex w-full max-w-full flex-col gap-6 p-6 text-slate-100 lg:w-96">
      <div className="panel-card">
        <h2 className="text-lg font-semibold">Practice Deck</h2>
        <p className="text-slate-200/70">
          Flip the card with <strong>Space</strong>, mark with <strong>J</strong> (Correct) or{' '}
          <strong>K</strong> (Wrong), draw next using <strong>N</strong>.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <button
            className="control-button"
            onClick={shuffle}
            disabled={!progressTotal}
          >
            Shuffle
          </button>
          <button className="control-button" onClick={flip} disabled={!progressTotal}>
            Flip
          </button>
          <button className="control-button" onClick={() => void markCorrect()} disabled={!progressTotal}>
            Correct
          </button>
          <button className="control-button" onClick={() => void markWrong()} disabled={!progressTotal}>
            Wrong
          </button>
          <button className="control-button" onClick={next} disabled={!progressTotal}>
            Next
          </button>
        </div>
        <div className="mt-4 flex justify-between text-sm text-slate-200/80">
          <span className="font-medium">
            Progress: {progressCurrent}/{progressTotal}
          </span>
          <span className="font-medium">
            ✅ {snapshot.correct} &nbsp; ⚠️ {snapshot.wrong}
          </span>
        </div>
      </div>

      <div className="panel-card">
        {currentCard ? (
          <>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{currentCard.word}</h3>
                {currentCard.phonetics && <p className="text-sm text-slate-200/70">{currentCard.phonetics}</p>}
              </div>
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-500/20 text-lg text-slate-100 transition duration-200 ease-out hover:bg-slate-500/30"
                onClick={() => speak(currentCard.word)}
                aria-label={`Speak ${currentCard.word}`}
              >
                🔊
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {snapshot.flipped || snapshot.phase !== 'showingFront' ? (
                <>
                  <p className="leading-relaxed text-slate-100">{currentCard.definition}</p>
                  {currentCard.example && <p className="italic text-slate-200/70">“{currentCard.example}”</p>}
                  {currentCard.tags?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {currentCard.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-sky-500/20 px-3 py-1 text-xs text-slate-100">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <p className="text-sm text-slate-200/70">Think of the meaning then flip the card.</p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-slate-200/70">
            <h3 className="text-lg font-semibold text-white">No cards yet</h3>
            <p className="text-sm">Create a card to get started.</p>
          </div>
        )}
      </div>

      {!lowMotion && (
        <div className="panel-card">
          <h4 className="text-sm font-semibold text-slate-200">Shortcuts</h4>
          <ul className="mt-2 grid list-none gap-1 p-0 text-sm text-slate-200/80">
            <li className="flex items-center gap-2">
              <kbd className="rounded-md bg-slate-500/20 px-2 py-1 text-sm text-slate-100">Space</kbd> Flip
            </li>
            <li className="flex items-center gap-2">
              <kbd className="rounded-md bg-slate-500/20 px-2 py-1 text-sm text-slate-100">J</kbd> Mark Correct
            </li>
            <li className="flex items-center gap-2">
              <kbd className="rounded-md bg-slate-500/20 px-2 py-1 text-sm text-slate-100">K</kbd> Mark Wrong
            </li>
            <li className="flex items-center gap-2">
              <kbd className="rounded-md bg-slate-500/20 px-2 py-1 text-sm text-slate-100">N</kbd> Next Card
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};
