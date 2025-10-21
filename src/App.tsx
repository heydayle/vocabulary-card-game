import { useEffect, useMemo } from 'react';
import Header from './components/ui/Header';
import { GamePanel } from './components/ui/GamePanel';
import { useCardsStore } from './stores/useCardsStore';
import { useUIStore } from './stores/useUIStore';
import LearnPage from './pages/LearnPage';
import ManagePage from './pages/ManagePage';
import { CreateModal } from './components/ui/CreateModal';
const App = () => {
  const init = useCardsStore((state) => state.init);
  const loading = useCardsStore((state) => state.loading);
  const activePage = useUIStore((state) => state.activePage);
  const isCreateModalOpen = useUIStore((state) => state.isCreateModalOpen);

  useEffect(() => {
    void init();
  }, [init]);

  const content = useMemo(() => {
    switch (activePage) {
      case 'learn':
        return <LearnPage />;
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
      {isCreateModalOpen ? <CreateModal /> : null}
      {loading ? <div className="loading-pill">Loading your deck…</div> : null}
    </div>
  );
};

export default App;
