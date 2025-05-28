import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ showLabel = false }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-lg hover:bg-hover transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <FiSun className="text-text-secondary" size={18} />
          {showLabel && <span className="ml-2 text-text-secondary">Light mode</span>}
        </>
      ) : (
        <>
          <FiMoon className="text-text-secondary" size={18} />
          {showLabel && <span className="ml-2 text-text-secondary">Dark mode</span>}
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
