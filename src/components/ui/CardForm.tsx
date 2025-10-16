import { FormEvent, useEffect, useState } from 'react';
import { useCardsStore } from '../../stores/useCardsStore';
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

  const fieldClass =
    'rounded-xl border border-slate-500/20 bg-slate-900/80 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400/40';

  return (
    <form
      className="flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-slate-500/20 bg-slate-900/70 p-6 text-slate-100 shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold">Create Card</h2>
      <label className="flex flex-col gap-1 text-sm text-slate-200/90">
        Word
        <input className={fieldClass} value={word} onChange={(event) => setWord(event.target.value)} required />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-200/90">
        Definition (Vietnamese)
        <textarea
          className={fieldClass}
          value={definition}
          onChange={(event) => setDefinition(event.target.value)}
          required
          rows={3}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-200/90">
        Phonetics / IPA
        <input className={fieldClass} value={phonetics} onChange={(event) => setPhonetics(event.target.value)} />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-200/90">
        Example sentence
        <textarea
          className={fieldClass}
          value={example}
          onChange={(event) => setExample(event.target.value)}
          rows={3}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-200/90">
        Tags (comma separated)
        <input className={fieldClass} value={tags} onChange={(event) => setTags(event.target.value)} />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/80 to-blue-500/80 px-6 py-2 text-sm font-medium text-white shadow-md transition duration-200 ease-out hover:-translate-y-px"
      >
        Save Card
      </button>
      {success && <p className="text-sm text-emerald-400">{success}</p>}
    </form>
  );
};

export default CardForm;
