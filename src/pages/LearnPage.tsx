import './Page.css';

export const LearnPage = () => (
  <section className="page">
    <div className="glass">
      <h2>How to Master Vocabulary with LexiPlay</h2>
      <ol>
        <li>Create or edit cards in your collection.</li>
        <li>Press <strong>Play</strong> to enter the 3D table and draw cards.</li>
        <li>Read the word, pronounce it, then flip to check the meaning.</li>
        <li>Self-assess using Correct/Wrong buttons to track progress.</li>
        <li>Repeat daily and watch your stats climb!</li>
      </ol>
      <p className="muted">
        Tip: enable Low Motion mode if you prefer a calmer experience or have motion sensitivity.
      </p>
    </div>
  </section>
);

export default LearnPage;
