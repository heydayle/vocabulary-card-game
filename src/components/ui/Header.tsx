import { useUIStore, type PageKey } from '../../stores/useUIStore';
import './Header.css';

const links: { key: PageKey; label: string }[] = [
  { key: 'learn', label: 'Learn' },
  { key: 'create', label: 'Create' },
  { key: 'manage', label: 'Manage' },
  { key: 'play', label: 'Play' }
];

export const Header = () => {
  const { activePage, setActivePage, lowMotion, toggleLowMotion } = useUIStore();

  return (
    <header className="app-header">
      <div className="logo">✨ LexiPlay</div>
      <nav className="nav">
        {links.map((link) => (
          <button
            key={link.key}
            className={link.key === activePage ? 'nav-button active' : 'nav-button'}
            onClick={() => setActivePage(link.key)}
          >
            {link.label}
          </button>
        ))}
      </nav>
      <button className="nav-button" onClick={toggleLowMotion} aria-pressed={lowMotion}>
        {lowMotion ? 'Enable Motion' : 'Low Motion'}
      </button>
    </header>
  );
};

export default Header;
