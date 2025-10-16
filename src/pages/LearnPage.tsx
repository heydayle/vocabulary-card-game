export const LearnPage = () => (
  <section className="page-shell">
    <div className="glass-card">
      <h2 className="text-2xl font-semibold text-white">How to Master Vocabulary with LexiPlay</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-100">
        <li>Create or edit cards in your collection.</li>
        <li>Press <strong>Play</strong> to enter the 3D table and draw cards.</li>
        <li>Read the word, pronounce it, then flip to check the meaning.</li>
        <li>Self-assess using Correct/Wrong buttons to track progress.</li>
        <li>Repeat daily and watch your stats climb!</li>
      </ol>
      <p className="mt-4 text-sm text-slate-200/70">
        Tip: enable Low Motion mode if you prefer a calmer experience or have motion sensitivity.
      </p>
    </div>
  </section>
);

export default LearnPage;
