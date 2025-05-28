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
          {isMobile && (
            <MobileHeader 
              isSidebarOpen={isSidebarOpen} 
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            />
          )}
          
          <Sidebar 
            isOpen={isSidebarOpen} 
            closeSidebar={() => setIsSidebarOpen(false)} 
          />
          
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {!isMobile && (
              <header className="flex items-center justify-between p-4 border-b border-divider">
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-full hover:bg-hover transition-colors"
                  >
                    <Logo size="small" />
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
