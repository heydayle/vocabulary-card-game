import { useUIStore, type PageKey } from '../../stores/useUIStore';
const links: { key: PageKey; label: string }[] = [
  { key: 'learn', label: 'Learn' },
  { key: 'manage', label: 'Manage' },
  { key: 'play', label: 'Play' }
];

export const Header = () => {
  const { activePage, setActivePage, lowMotion, toggleLowMotion, openCreateModal } = useUIStore();
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
      <div className="header-actions">
        <button className="action-button" type="button" onClick={openCreateModal}>
          + New Word
        </button>
        <button className={baseButtonClass} onClick={toggleLowMotion} aria-pressed={lowMotion}>
          {lowMotion ? 'Enable Motion' : 'Low Motion'}
        </button>
      </div>
    </header>
  );
};

export default Header;
