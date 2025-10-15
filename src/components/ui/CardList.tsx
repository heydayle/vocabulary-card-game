import { useMemo, useState } from 'react';
import type { Card } from '../../models/Card';
import { useCardsStore } from '../../stores/useCardsStore';
import './CardList.css';

interface EditableCard extends Card {
  isEditing?: boolean;
}

export const CardList = () => {
  const { cards, deleteCard, updateCard } = useCardsStore();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  const tags = useMemo(() => {
    const set = new Set<string>();
    cards.forEach((card) => card.tags?.forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, [cards]);

  const filtered = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        !search ||
        card.word.toLowerCase().includes(search.toLowerCase()) ||
        card.definition.toLowerCase().includes(search.toLowerCase());
      const matchesTag = activeTag === 'all' || card.tags?.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [cards, search, activeTag]);

  const [editing, setEditing] = useState<Record<string, EditableCard | undefined>>({});

  const handleEditToggle = (card: Card) => {
    setEditing((prev) => ({
      ...prev,
      [card.id]: prev[card.id]
        ? undefined
        : {
            ...card,
            isEditing: true
          }
    }));
  };

  const handleChange = (id: string, field: keyof Card, value: string | string[]) => {
    setEditing((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      } as EditableCard
    }));
  };

  const handleSave = async (card: EditableCard) => {
    const { id, word, definition, phonetics, example } = card;
    const tags = Array.isArray(card.tags) ? card.tags : [];
    await updateCard(id, {
      word,
      definition,
      phonetics,
      example,
      tags
    });
    setEditing((prev) => ({
      ...prev,
      [id]: undefined
    }));
  };

  return (
    <div className="card-list">
      <div className="card-list-controls">
        <input
          placeholder="Search word or meaning"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select value={activeTag} onChange={(event) => setActiveTag(event.target.value)}>
          <option value="all">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="card-list-items">
        {filtered.map((card) => {
          const draft = editing[card.id];
          const item = draft ?? card;
          const tagString = Array.isArray(item.tags) ? item.tags.join(', ') : '';
          return (
            <div key={card.id} className="card-list-item">
              {draft ? (
                <>
                  <input
                    value={item.word}
                    onChange={(event) => handleChange(card.id, 'word', event.target.value)}
                  />
                  <textarea
                    value={item.definition}
                    onChange={(event) => handleChange(card.id, 'definition', event.target.value)}
                    rows={2}
                  />
                  <input
                    value={item.phonetics ?? ''}
                    onChange={(event) => handleChange(card.id, 'phonetics', event.target.value)}
                    placeholder="Phonetics"
                  />
                  <textarea
                    value={item.example ?? ''}
                    onChange={(event) => handleChange(card.id, 'example', event.target.value)}
                    rows={2}
                    placeholder="Example"
                  />
                  <input
                    value={tagString}
                    onChange={(event) =>
                      handleChange(
                        card.id,
                        'tags',
                        event.target.value
                          .split(',')
                          .map((tag) => tag.trim())
                          .filter(Boolean)
                      )
                    }
                    placeholder="tag1, tag2"
                  />
                  <div className="actions">
                    <button
                      onClick={() =>
                        handleSave({
                          ...item,
                          tags: Array.isArray(item.tags) ? item.tags : []
                        })
                      }
                    >
                      Save
                    </button>
                    <button className="secondary" onClick={() => handleEditToggle(card)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="item-header">
                    <h3>{card.word}</h3>
                    <div className="actions">
                      <button onClick={() => handleEditToggle(card)}>Edit</button>
                      <button className="danger" onClick={() => deleteCard(card.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  {card.phonetics && <p className="phonetics">{card.phonetics}</p>}
                  <p>{card.definition}</p>
                  {card.example && <p className="example">“{card.example}”</p>}
                  <div className="meta">
                    <span>
                      ✅ {card.correctCount} / ❌ {card.wrongCount}
                    </span>
                    <div className="tags">
                      {card.tags?.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
        {!filtered.length && <p className="empty">No cards match your filters yet.</p>}
      </div>
    </div>
  );
};

export default CardList;
