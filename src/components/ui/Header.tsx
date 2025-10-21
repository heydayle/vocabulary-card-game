import { useEffect, useState } from 'react';
import { useUIStore, type PageKey } from '../../stores/useUIStore';
const links: { key: PageKey; label: string }[] = [
  { key: 'learn', label: 'Learn' },
  { key: 'manage', label: 'Manage' },
  { key: 'play', label: 'Play' }
];

export const Header = () => {
  const { activePage, setActivePage, lowMotion, toggleLowMotion, openCreateModal } = useUIStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const baseButtonClass = 'nav-button';
  const activeButtonClass = 'nav-button nav-button--active';

  useEffect(() => {
    setMenuOpen(false);
  }, [activePage]);

  const handleToggleMotion = () => {
    toggleLowMotion();
    setMenuOpen(false);
  };

  const handleOpenCreate = () => {
    openCreateModal();
    setMenuOpen(false);
  };

  const handleToggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  return (
    <header className="app-header">
      <div className="brand-row">
        <div className="brand">✨ LexiPlay</div>
        <button
          className={`menu-toggle${menuOpen ? ' menu-toggle--open' : ''}`}
          type="button"
          onClick={handleToggleMenu}
          aria-expanded={menuOpen}
          aria-controls="header-menu"
        >
          <span className="menu-toggle__bar" aria-hidden />
          <span className="menu-toggle__bar" aria-hidden />
          <span className="menu-toggle__bar" aria-hidden />
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>
      <div id="header-menu" className={`header-menu${menuOpen ? ' header-menu--open' : ''}`}>
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
          <button className="action-button" type="button" onClick={handleOpenCreate}>
            + New Word
          </button>
          <button className={baseButtonClass} onClick={handleToggleMotion} aria-pressed={lowMotion}>
            {lowMotion ? 'Enable Motion' : 'Low Motion'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
