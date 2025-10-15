import { useEffect, useMemo } from 'react';
import Scene from './components/3d/Scene';
import Header from './components/ui/Header';
import { GamePanel } from './components/ui/GamePanel';
import { useCardsStore } from './stores/useCardsStore';
import { useUIStore } from './stores/useUIStore';
import LearnPage from './pages/LearnPage';
import CreatePage from './pages/CreatePage';
import ManagePage from './pages/ManagePage';
import './App.css';

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
    <div className="app-shell">
      <Header />
      <div className="app-main">
        <Scene />
        <div className="app-sidebar">{content}</div>
      </div>
      {loading ? <div className="loader">Loading your deck…</div> : null}
    </div>
  );
};

export default App;
