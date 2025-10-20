import { useEffect, useMemo } from 'react';
import Header from './components/ui/Header';
import { GamePanel } from './components/ui/GamePanel';
import { useCardsStore } from './stores/useCardsStore';
import { useUIStore } from './stores/useUIStore';
import LearnPage from './pages/LearnPage';
import CreatePage from './pages/CreatePage';
import ManagePage from './pages/ManagePage';
const App = () => {
  const init = useCardsStore((state) => state.init);
  const loading = useCardsStore((state) => state.loading);
  const activePage = useUIStore((state) => state.activePage);

  useEffect(() => {
    void init();
  }, [init]);

  const content = useMemo(() => {
    switch (activePage) {
      case 'learn':
        return <LearnPage />;
      case 'create':
        return <CreatePage />;
      case 'manage':
        return <ManagePage />;
      case 'play':
      default:
        return <GamePanel />;
    }
  }, [activePage]);

  return (
    <div className="app-frame text-slate-100">
      <div className="app-orb app-orb--one" aria-hidden="true" />
      <div className="app-orb app-orb--two" aria-hidden="true" />
      <Header />
      <main className="app-main">{content}</main>
      {loading ? <div className="loading-pill">Loading your deck…</div> : null}
    </div>
  );
};

export default App;
