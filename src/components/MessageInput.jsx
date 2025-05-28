import { useState, useContext, useRef, useEffect } from 'react';
import { FiSend, FiX } from 'react-icons/fi';
import { ChatContext } from '../context/ChatContext';

const MessageInput = ({ isLoading }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useContext(ChatContext);
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
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
      <div className="relative flex items-end rounded-xl border border-divider bg-input shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message xBAI..."
          disabled={isLoading}
          className="w-full resize-none bg-transparent py-3 pl-4 pr-12 text-text focus:outline-none min-h-[56px] max-h-[200px]"
          rows={1}
        />
        
        <div className="absolute bottom-2 right-2 flex">
          {message && (
            <button
              type="button"
              onClick={() => setMessage('')}
              className="p-2 text-text-secondary hover:text-text rounded-full hover:bg-hover mr-1"
            >
              <FiX size={18} />
            </button>
          )}
          
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className={`p-2 rounded-full ${
              message.trim() && !isLoading
                ? 'bg-primary-color text-white hover:bg-opacity-90'
                : 'bg-hover text-text-secondary cursor-not-allowed'
            }`}
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
