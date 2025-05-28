import { useState, useContext, useRef, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';
import { FiSend, FiMic } from 'react-icons/fi';

const MessageInput = ({ isLoading }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useContext(ChatContext);
  const textareaRef = useRef(null);

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

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-end rounded-xl border border-divider bg-input overflow-hidden">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What do you want to know?"
          className="w-full resize-none py-3 px-4 bg-transparent outline-none max-h-[200px] min-h-[56px]"
          rows={1}
          disabled={isLoading}
        />
        <div className="flex items-center p-2">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-hover transition-colors text-text-secondary"
            aria-label="Voice input"
          >
            <FiMic size={20} />
          </button>
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className={`p-2 rounded-full ${
              message.trim() && !isLoading
                ? 'text-primary hover:bg-hover'
                : 'text-text-secondary cursor-not-allowed'
            } transition-colors`}
            aria-label="Send message"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
