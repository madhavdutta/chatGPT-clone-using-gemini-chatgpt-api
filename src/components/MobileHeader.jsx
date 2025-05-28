import { FiMenu } from 'react-icons/fi';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const MobileHeader = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-3 bg-header border-b border-divider">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-hover transition-colors"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <FiMenu size={20} />
        </button>
        <div className="ml-2">
          <Logo size="small" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center text-white">
          <span>U</span>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
