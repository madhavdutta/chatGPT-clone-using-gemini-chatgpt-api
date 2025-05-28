import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import Logo from './Logo';

const WelcomeScreen = () => {
  const { createNewChat } = useContext(ChatContext);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 md:p-6">
      <div className="flex items-center mb-8">
        <Logo size="xlarge" />
      </div>
      
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-medium">How can I help you today?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              className="p-4 border border-divider rounded-lg hover:bg-hover transition-colors text-left"
              onClick={createNewChat}
            >
              <h3 className="font-medium mb-1">Explain quantum computing</h3>
              <p className="text-text-secondary text-sm">Provide a simple explanation of quantum principles</p>
            </button>
            
            <button 
              className="p-4 border border-divider rounded-lg hover:bg-hover transition-colors text-left"
              onClick={createNewChat}
            >
              <h3 className="font-medium mb-1">Creative writing prompt</h3>
              <p className="text-text-secondary text-sm">Generate a story about a space explorer</p>
            </button>
            
            <button 
              className="p-4 border border-divider rounded-lg hover:bg-hover transition-colors text-left"
              onClick={createNewChat}
            >
              <h3 className="font-medium mb-1">Code a simple game</h3>
              <p className="text-text-secondary text-sm">Help me build a tic-tac-toe game with JavaScript</p>
            </button>
            
            <button 
              className="p-4 border border-divider rounded-lg hover:bg-hover transition-colors text-left"
              onClick={createNewChat}
            >
              <h3 className="font-medium mb-1">Plan a trip to Japan</h3>
              <p className="text-text-secondary text-sm">Create a 7-day itinerary for Tokyo and Kyoto</p>
            </button>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-4 right-4 bg-black text-white rounded-xl p-4 flex items-center shadow-lg">
        <div>
          <div className="font-bold">SuperxBAI</div>
          <div className="text-xs">Fewer rate limits, more capabilities</div>
        </div>
        <button className="ml-4 bg-white text-black rounded-full px-4 py-1 text-sm font-medium">
          Go Super
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
