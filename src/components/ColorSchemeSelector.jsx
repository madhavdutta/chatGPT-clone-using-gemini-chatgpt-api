import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCircle, FiCheck } from 'react-icons/fi';

const ColorSchemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState('green');
  const dropdownRef = useRef(null);

  const colorSchemes = [
    { id: 'green', name: 'Green', color: '#10b981' },
    { id: 'blue', name: 'Blue', color: '#3b82f6' },
    { id: 'purple', name: 'Purple', color: '#8b5cf6' },
    { id: 'pink', name: 'Pink', color: '#ec4899' },
    { id: 'orange', name: 'Orange', color: '#f97316' }
  ];

  const handleSchemeChange = (schemeId) => {
    setSelectedScheme(schemeId);
    setIsOpen(false);
    // Here you would implement the actual color scheme change
    // For now, we'll just update the CSS variable for primary color
    document.documentElement.style.setProperty(
      '--color-primary', 
      colorSchemes.find(scheme => scheme.id === schemeId).color
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedColor = colorSchemes.find(scheme => scheme.id === selectedScheme).color;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 rounded-lg hover:bg-hover transition-colors"
        aria-label="Select color scheme"
      >
        <div 
          className="w-4 h-4 rounded-full mr-2" 
          style={{ backgroundColor: selectedColor }}
        ></div>
        <span className="hidden md:inline text-text-secondary">Theme</span>
        <FiChevronDown className="ml-1 text-text-secondary" size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-card rounded-lg shadow-lg border border-divider z-50">
          <div className="py-1">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                className="flex items-center w-full px-4 py-2 text-left hover:bg-hover transition-colors"
                onClick={() => handleSchemeChange(scheme.id)}
              >
                <div className="flex items-center justify-center w-5 h-5 mr-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: scheme.color }}
                  ></div>
                </div>
                <span>{scheme.name}</span>
                {selectedScheme === scheme.id && (
                  <FiCheck className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorSchemeSelector;
