import ThemeToggle from './ThemeToggle';
import ColorSchemeSelector from './ColorSchemeSelector';

const HeaderControls = () => {
  return (
    <div className="flex items-center gap-2">
      <ColorSchemeSelector />
      <ThemeToggle />
      <div className="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center text-white">
        <span>U</span>
      </div>
    </div>
  );
};

export default HeaderControls;
