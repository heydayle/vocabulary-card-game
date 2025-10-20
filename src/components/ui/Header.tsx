import { useUIStore, type PageKey } from '../../stores/useUIStore';
const links: { key: PageKey; label: string }[] = [
  { key: 'learn', label: 'Learn' },
  { key: 'create', label: 'Create' },
  { key: 'manage', label: 'Manage' },
  { key: 'play', label: 'Play' }
];

export const Header = () => {
  const { activePage, setActivePage, lowMotion, toggleLowMotion } = useUIStore();
  const baseButtonClass = 'nav-button';
  const activeButtonClass = 'nav-button nav-button--active';

  return (
    <header className="app-header">
      <div className="brand">✨ LexiPlay</div>
      <nav className="nav-group">
        {links.map((link) => (
          <button
            key={link.key}
            className={link.key === activePage ? activeButtonClass : baseButtonClass}
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
