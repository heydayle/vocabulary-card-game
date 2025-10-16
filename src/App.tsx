import { useEffect, useMemo } from 'react';
import Scene from './components/3d/Scene';
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
    <div className="relative flex min-h-screen flex-col text-slate-100">
      <Header />
      <div className="flex flex-1 flex-col backdrop-blur-xl lg:flex-row">
        <Scene />
        <div className="flex max-w-full flex-1 justify-center overflow-y-auto border-t border-slate-500/20 bg-slate-900/60 p-6 lg:w-96 lg:border-l lg:border-t-0 lg:h-screen-minus-header lg:max-h-screen-minus-header">
          {content}
        </div>
      </div>
      {loading ? (
        <div className="absolute left-1/2 top-20 -translate-x-1/2 rounded-full border border-slate-500/30 bg-slate-900/70 px-5 py-2 text-sm shadow-md">
          Loading your deck…
        </div>
      ) : null}
    </div>
  );
};

export default App;
