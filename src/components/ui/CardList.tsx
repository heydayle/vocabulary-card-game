import { useMemo, useState } from 'react';
import type { Card } from '../../models/Card';
import { useCardsStore } from '../../stores/useCardsStore';
import { useUIStore } from '../../stores/useUIStore';
interface EditableCard extends Card {
  isEditing?: boolean;
}

export const CardList = () => {
  const { cards, deleteCard, updateCard } = useCardsStore();
  const openCreateModal = useUIStore((state) => state.openCreateModal);
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
    <div className="manage-stack">
      <div className="glass-panel manage-toolbar">
        <div className="toolbar-fields">
          <input
            className="form-field"
            placeholder="Search word or meaning"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="form-field"
            value={activeTag}
            onChange={(event) => setActiveTag(event.target.value)}
          >
            <option value="all">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="action-button" onClick={openCreateModal}>
          + New Word
        </button>
      </div>

      <div className="manage-grid">
        {filtered.map((card) => {
          const draft = editing[card.id];
          const item = draft ?? card;
          const tagString = Array.isArray(item.tags) ? item.tags.join(', ') : '';
          return (
            <div key={card.id} className="glass-panel card-panel">
              {draft ? (
                <>
                  <input
                    className="form-field"
                    value={item.word}
                    onChange={(event) => handleChange(card.id, 'word', event.target.value)}
                  />
                  <textarea
                    className="form-field"
                    value={item.definition}
                    onChange={(event) => handleChange(card.id, 'definition', event.target.value)}
                    rows={2}
                  />
                  <input
                    className="form-field"
                    value={item.phonetics ?? ''}
                    onChange={(event) => handleChange(card.id, 'phonetics', event.target.value)}
                    placeholder="Phonetics"
                  />
                  <textarea
                    className="form-field"
                    value={item.example ?? ''}
                    onChange={(event) => handleChange(card.id, 'example', event.target.value)}
                    rows={2}
                    placeholder="Example"
                  />
                  <input
                    className="form-field"
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
                  <div className="flex items-center gap-2">
                    <button
                      className="action-button"
                      onClick={() =>
                        handleSave({
                          ...item,
                          tags: Array.isArray(item.tags) ? item.tags : []
                        })
                      }
                    >
                      Save
                    </button>
                    <button className="action-button secondary" onClick={() => handleEditToggle(card)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white">{card.word}</h3>
                    <div className="flex items-center gap-2">
                      <button className="action-button" onClick={() => handleEditToggle(card)}>
                        Edit
                      </button>
                      <button className="action-button danger" onClick={() => deleteCard(card.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  {card.phonetics && <p className="text-sm text-slate-200/70">{card.phonetics}</p>}
                  <p className="leading-relaxed text-slate-100">{card.definition}</p>
                  {card.example && <p className="italic text-slate-200/70">“{card.example}”</p>}
                  <div className="flex items-center justify-between text-xs text-slate-200/80">
                    <span className="font-medium">
                      ✅ {card.correctCount} / ❌ {card.wrongCount}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {card.tags?.map((tag) => (
                        <span key={tag} className="tag-chip">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
        {!filtered.length && <p className="text-center text-slate-200/60">No cards match your filters yet.</p>}
      </div>
    </div>
  );
};

export default CardList;
