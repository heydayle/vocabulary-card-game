import { FormEvent, useEffect, useState } from 'react';
import { useCardsStore } from '../../stores/useCardsStore';
import './CardForm.css';

export const CardForm = () => {
  const addCard = useCardsStore((state) => state.addCard);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [phonetics, setPhonetics] = useState('');
  const [example, setExample] = useState('');
  const [tags, setTags] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!success) return;
    const timer = window.setTimeout(() => setSuccess(''), 2200);
    return () => window.clearTimeout(timer);
  }, [success]);

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
    setSuccess('Card saved to your deck!');
    setWord('');
    setDefinition('');
    setPhonetics('');
    setExample('');
    setTags('');
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <h2>Create Card</h2>
      <label>
        Word
        <input value={word} onChange={(event) => setWord(event.target.value)} required />
      </label>
      <label>
        Definition (Vietnamese)
        <textarea
          value={definition}
          onChange={(event) => setDefinition(event.target.value)}
          required
          rows={3}
        />
      </label>
      <label>
        Phonetics / IPA
        <input value={phonetics} onChange={(event) => setPhonetics(event.target.value)} />
      </label>
      <label>
        Example sentence
        <textarea
          value={example}
          onChange={(event) => setExample(event.target.value)}
          rows={3}
        />
      </label>
      <label>
        Tags (comma separated)
        <input value={tags} onChange={(event) => setTags(event.target.value)} />
      </label>
      <button type="submit">Save Card</button>
      {success && <p className="success">{success}</p>}
    </form>
  );
};

export default CardForm;
