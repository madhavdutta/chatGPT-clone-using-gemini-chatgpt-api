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

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat?.messages]);

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {!activeChat || activeChat.messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <div className="p-4 md:p-6">
            <MessageList messages={activeChat.messages} />
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="p-4 md:p-6 flex flex-col items-center">
        <div className="w-full max-w-3xl">
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
