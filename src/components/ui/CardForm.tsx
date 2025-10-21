import { FormEvent, useEffect, useState } from 'react';
import { useCardsStore } from '../../stores/useCardsStore';

interface CardFormProps {
  onComplete?: () => void;
  className?: string;
  showSuccessMessage?: boolean;
  title?: string | null;
  submitLabel?: string;
  autoFocus?: boolean;
}

export const CardForm = ({
  onComplete,
  className,
  showSuccessMessage = true,
  title = 'Create Card',
  submitLabel = 'Save Card',
  autoFocus = false
}: CardFormProps) => {
  const addCard = useCardsStore((state) => state.addCard);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [phonetics, setPhonetics] = useState('');
  const [example, setExample] = useState('');
  const [tags, setTags] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!showSuccessMessage || !success) return;
    const timer = window.setTimeout(() => setSuccess(''), 2200);
    return () => window.clearTimeout(timer);
  }, [success, showSuccessMessage]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!word.trim() || !definition.trim()) return;
    await addCard({
      word: word.trim(),
      definition: definition.trim(),
      phonetics: phonetics.trim() || undefined,
      example: example.trim() || undefined,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    });
    if (onComplete) {
      onComplete();
    } else if (showSuccessMessage) {
      setSuccess('Card saved to your deck!');
    }
    setWord('');
    setDefinition('');
    setPhonetics('');
    setExample('');
    setTags('');
  };

  const fieldClass = 'form-field';
  const formClass = className ? className : 'glass-panel card-form';

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
      <label className="form-label">
        Word
        <input
          className={fieldClass}
          value={word}
          onChange={(event) => setWord(event.target.value)}
          required
          autoFocus={autoFocus}
        />
      </label>
      <label className="form-label">
        Definition (Vietnamese)
        <textarea
          className={fieldClass}
          value={definition}
          onChange={(event) => setDefinition(event.target.value)}
          required
          rows={3}
        />
      </label>
      <label className="form-label">
        Phonetics / IPA
        <input className={fieldClass} value={phonetics} onChange={(event) => setPhonetics(event.target.value)} />
      </label>
      <label className="form-label">
        Example sentence
        <textarea
          className={fieldClass}
          value={example}
          onChange={(event) => setExample(event.target.value)}
          rows={3}
        />
      </label>
      <label className="form-label">
        Tags (comma separated)
        <input className={fieldClass} value={tags} onChange={(event) => setTags(event.target.value)} />
      </label>
      <button type="submit" className="action-button">
        {submitLabel}
      </button>
      {showSuccessMessage && success ? <p className="text-sm text-emerald-400">{success}</p> : null}
    </form>
  );
};

export default CardForm;
