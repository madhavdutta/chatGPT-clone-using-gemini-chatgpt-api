import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Logo = ({ size = 'medium' }) => {
  const { theme } = useContext(ThemeContext);
  
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-20 h-20',
    large: 'w-24 h-24',
    xlarge: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} logo-container`}>
      <img 
        src="https://www.xbesh.com/logos/xbesh_logo.svg" 
        alt="xBesh Logo" 
        className={`w-full h-full opacity-90 ${theme === 'dark' ? 'invert' : ''}`}
      />
    </div>
  );
};

export default Logo;
