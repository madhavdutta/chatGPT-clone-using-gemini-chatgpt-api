import { useState, useContext, useRef, useEffect } from 'react';
import { FiSend, FiMic, FiStopCircle } from 'react-icons/fi';
import { ChatContext } from '../context/ChatContext';

const MessageInput = ({ isLoading }) => {
  const [message, setMessage] = useState('');
  const { sendMessage, stopGenerating } = useContext(ChatContext);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-end rounded-xl border border-divider bg-input shadow-sm focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message xBAI..."
          className="flex-1 max-h-[200px] p-4 pr-12 bg-transparent border-none resize-none focus:outline-none text-text placeholder-text-secondary"
          rows="1"
          disabled={isLoading}
        />
        
        <div className="absolute bottom-3 right-3 flex">
          {isLoading ? (
            <button
              type="button"
              onClick={stopGenerating}
              className="p-2 rounded-full text-red-500 hover:bg-hover transition-colors"
              title="Stop generating"
            >
              <FiStopCircle size={20} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!message.trim()}
              className={`p-2 rounded-full ${
                message.trim() 
                  ? 'text-primary hover:bg-hover' 
                  : 'text-text-secondary'
              } transition-colors`}
              title="Send message"
            >
              <FiSend size={20} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
