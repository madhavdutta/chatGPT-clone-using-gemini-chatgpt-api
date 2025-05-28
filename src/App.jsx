import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import MobileHeader from './components/MobileHeader';
import Logo from './components/Logo';
import HeaderControls from './components/HeaderControls';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <ChatProvider>
      <ThemeProvider>
        <div className="flex h-screen bg-surface text-text transition-colors duration-200">
          <Sidebar 
            isOpen={isSidebarOpen} 
            closeSidebar={() => setIsSidebarOpen(false)} 
          />
          
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {isMobile ? (
              <MobileHeader 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
              />
            ) : (
              <header className="flex items-center justify-between p-3 border-b border-divider bg-header">
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-full hover:bg-hover transition-colors"
                    aria-label="Toggle sidebar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <HeaderControls />
              </header>
            )}
            
            <ChatArea />
          </div>
        </div>
      </ThemeProvider>
    </ChatProvider>
  );
}

export default App;
