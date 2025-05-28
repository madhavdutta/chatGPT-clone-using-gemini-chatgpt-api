import { useContext, useRef, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import WelcomeScreen from './WelcomeScreen';
import FeatureButtons from './FeatureButtons';

const ChatArea = () => {
  const { getActiveChat, loading, modelError } = useContext(ChatContext);
  const activeChat = getActiveChat();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat?.messages]);

  return (
    <main className="flex-1 flex flex-col h-full relative">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto pb-32"
      >
        <div className="w-full max-w-3xl mx-auto px-4 md:px-6">
          {!activeChat || activeChat.messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="py-6">
              <MessageList messages={activeChat.messages} />
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 border-t border-divider bg-surface py-4 px-4">
        <div className="w-full max-w-3xl mx-auto">
          <MessageInput isLoading={loading} />
          <FeatureButtons />
          {modelError && (
            <div className="text-xs text-center mt-2 text-red-400">
              API Error: {modelError}
            </div>
          )}
          <div className="text-xs text-center mt-1 text-gray-400">
            AI may produce inaccurate information about people, places, or facts.
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatArea;
