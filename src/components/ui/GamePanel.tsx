import { useEffect } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { useCardsStore } from '../../stores/useCardsStore';
import { useUIStore } from '../../stores/useUIStore';
import { useSpeech } from '../../hooks/useSpeech';
import './GamePanel.css';

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
    <aside className="game-panel">
      <div className="panel-section">
        <h2>Practice Deck</h2>
        <p className="muted">
          Flip the card with <strong>Space</strong>, mark with <strong>J</strong> (Correct) or{' '}
          <strong>K</strong> (Wrong), draw next using <strong>N</strong>.
        </p>
        <div className="panel-controls">
          <button onClick={shuffle} disabled={!progressTotal}>
            Shuffle
          </button>
          <button onClick={flip} disabled={!progressTotal}>
            Flip
          </button>
          <button onClick={() => void markCorrect()} disabled={!progressTotal}>
            Correct
          </button>
          <button onClick={() => void markWrong()} disabled={!progressTotal}>
            Wrong
          </button>
          <button onClick={next} disabled={!progressTotal}>
            Next
          </button>
        </div>
        <div className="panel-progress">
          <span>
            Progress: {progressCurrent}/{progressTotal}
          </span>
          <span>
            ✅ {snapshot.correct} &nbsp; ⚠️ {snapshot.wrong}
          </span>
        </div>
      </div>

      <div className="panel-section">
        {currentCard ? (
          <>
            <div className="card-headline">
              <div>
                <h3>{currentCard.word}</h3>
                {currentCard.phonetics && <p className="muted">{currentCard.phonetics}</p>}
              </div>
              <button
                className="icon-button"
                onClick={() => speak(currentCard.word)}
                aria-label={`Speak ${currentCard.word}`}
              >
                🔊
              </button>
            </div>
            <div className="card-body">
              {snapshot.flipped || snapshot.phase !== 'showingFront' ? (
                <>
                  <p>{currentCard.definition}</p>
                  {currentCard.example && <p className="muted">“{currentCard.example}”</p>}
                  {currentCard.tags?.length ? (
                    <div className="tags">
                      {currentCard.tags.map((tag) => (
                        <span key={tag} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <p className="muted">Think of the meaning then flip the card.</p>
              )}
            </div>
          </>
        ) : (
          <div className="empty">
            <h3>No cards yet</h3>
            <p>Create a card to get started.</p>
          </div>
        )}
      </div>

      {!lowMotion && (
        <div className="panel-section keyboard">
          <h4>Shortcuts</h4>
          <ul>
            <li>
              <kbd>Space</kbd> Flip
            </li>
            <li>
              <kbd>J</kbd> Mark Correct
            </li>
            <li>
              <kbd>K</kbd> Mark Wrong
            </li>
            <li>
              <kbd>N</kbd> Next Card
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};
