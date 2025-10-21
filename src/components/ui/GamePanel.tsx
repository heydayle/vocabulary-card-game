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
  const isShowingBack = snapshot.flipped || snapshot.phase !== 'showingFront';

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

  const handleCardFlip = () => {
    if (!currentCard) {
      return;
    }
    flip();
  };

  const renderHeader = (card: typeof currentCard) => {
    if (!card) {
      return null;
    }

    return (
      <div className="play-card__header">
        <div>
          <h2 className="play-card__title">{card.word}</h2>
          {card.phonetics && <p className="play-card__subtitle">{card.phonetics}</p>}
        </div>
        <button
          className="speak-button"
          onClick={(event) => {
            event.stopPropagation();
            speak(card.word);
          }}
          aria-label={`Speak ${card.word}`}
        >
          🔊
        </button>
      </div>
    );
  };

  return (
    <section className="page-shell play-shell">
      <div className="play-grid">
        <div className="glass-panel play-card">
          {currentCard ? (
            <div
              className={`play-card__flip${isShowingBack ? ' play-card__flip--flipped' : ''}${
                lowMotion ? ' play-card__flip--static' : ''
              }`}
              role="button"
              tabIndex={0}
              onClick={handleCardFlip}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleCardFlip();
                }
              }}
              aria-pressed={isShowingBack}
              aria-label={isShowingBack ? 'Show front of card' : 'Show back of card'}
            >
              <article className="play-card__face play-card__face--front" aria-hidden={isShowingBack}>
                {renderHeader(currentCard)}
                <div className="play-card__body play-card__body--front">
                  <p className="play-card__prompt">Visualize the meaning, then flip to reveal it.</p>
                </div>
              </article>
              <article className="play-card__face play-card__face--back" aria-hidden={!isShowingBack}>
                {renderHeader(currentCard)}
                <div className="play-card__body">
                  <p className="play-card__definition">{currentCard.definition}</p>
                  {currentCard.example && <p className="play-card__example">“{currentCard.example}”</p>}
                  {currentCard.tags?.length ? (
                    <div className="play-card__tags">
                      {currentCard.tags.map((tag) => (
                        <span key={tag} className="tag-chip">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            </div>
          ) : (
            <div className="play-card__empty">
              <h2 className="play-card__title">No cards yet</h2>
              <p className="play-card__subtitle">Create a card to get started.</p>
            </div>
          )}
        </div>

        <div className="glass-panel play-controls">
          <div>
            <h2 className="play-controls__title">Practice Deck</h2>
            <p className="play-controls__description">
              Flip with <strong>Space</strong>, mark answers with <strong>J</strong> or <strong>K</strong>, and draw next using{' '}
              <strong>N</strong>.
            </p>
          </div>
          <div className="play-actions">
            <button className="control-button" onClick={shuffle} disabled={!progressTotal}>
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
          <div className="play-progress">
            <span className="play-progress__stat">
              Progress: {progressCurrent}/{progressTotal}
            </span>
            <span className="play-progress__stat">
              ✅ {snapshot.correct} &nbsp; ⚠️ {snapshot.wrong}
            </span>
          </div>
        </div>

        {!lowMotion && (
          <div className="glass-panel play-shortcuts">
            <h3 className="play-shortcuts__title">Shortcuts</h3>
            <ul className="play-shortcuts__list">
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
      </div>
    </section>
  );
};
