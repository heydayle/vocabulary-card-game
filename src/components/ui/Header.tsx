import { useUIStore, type PageKey } from '../../stores/useUIStore';
const links: { key: PageKey; label: string }[] = [
  { key: 'learn', label: 'Learn' },
  { key: 'create', label: 'Create' },
  { key: 'manage', label: 'Manage' },
  { key: 'play', label: 'Play' }
];

export const Header = () => {
  const { activePage, setActivePage, lowMotion, toggleLowMotion } = useUIStore();
  const baseButtonClass =
    'rounded-full border border-transparent bg-slate-500/10 px-4 py-2 text-sm font-medium text-slate-200 transition duration-200 ease-out hover:bg-slate-500/30';
  const activeButtonClass =
    'bg-gradient-to-br from-sky-400/70 to-blue-500/70 border-slate-500/30 text-white shadow-md';

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-500/20 bg-slate-900/40 px-8 py-4 backdrop-blur-xl">
      <div className="text-xl font-semibold">✨ LexiPlay</div>
      <nav className="flex items-center gap-3">
        {links.map((link) => (
          <button
            key={link.key}
            className={
              link.key === activePage ? `${baseButtonClass} ${activeButtonClass}` : baseButtonClass
            }
            onClick={() => setActivePage(link.key)}
          >
            {link.label}
          </button>
        ))}
      </nav>
      <button className={baseButtonClass} onClick={toggleLowMotion} aria-pressed={lowMotion}>
        {lowMotion ? 'Enable Motion' : 'Low Motion'}
      </button>
    </header>
  );
};

export default Header;
