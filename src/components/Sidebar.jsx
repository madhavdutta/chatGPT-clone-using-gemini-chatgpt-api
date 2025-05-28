import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiX, FiMessageSquare, FiSettings } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import ApiKeyModal from './ApiKeyModal';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { 
    chats, 
    activeChatId, 
    setActiveChatId, 
    createNewChat, 
    deleteChat, 
    renameChat,
    clearChats
  } = useContext(ChatContext);
  
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const handleChatClick = (chatId) => {
    setActiveChatId(chatId);
    closeSidebar();
  };

  const handleNewChat = () => {
    createNewChat();
    closeSidebar();
  };

  const startEditing = (chatId, currentTitle) => {
    setEditingChatId(chatId);
    setEditingTitle(currentTitle);
  };

  const saveEdit = () => {
    if (editingTitle.trim()) {
      renameChat(editingChatId, editingTitle);
    }
    setEditingChatId(null);
  };

  const cancelEdit = () => {
    setEditingChatId(null);
  };

  const handleClearChats = () => {
    if (window.confirm('Are you sure you want to clear all chats? This cannot be undone.')) {
      clearChats();
    }
  };

  return (
    <>
      <aside 
        className={`fixed md:relative z-30 h-full w-72 bg-sidebar border-r border-divider transition-all duration-300 shadow-lg ${
          isOpen ? 'left-0' : '-left-72 md:-left-72'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-divider">
            <div className="flex items-center justify-center mb-6">
              <Logo size="medium" />
            </div>
            <button
              onClick={handleNewChat}
              className="flex items-center justify-center w-full gap-2 p-3 rounded-lg border border-divider hover:bg-hover transition-colors"
            >
              <FiPlus />
              <span>New Chat</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3">
            {chats.length > 0 ? (
              <ul className="space-y-2">
                {chats.map((chat) => (
                  <li key={chat.id}>
                    {editingChatId === chat.id ? (
                      <div className="flex items-center p-3 rounded-lg bg-hover">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-text"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEdit();
                          }}
                        />
                        <button 
                          onClick={saveEdit}
                          className="p-1 text-text-secondary hover:text-text"
                        >
                          <FiCheck size={16} />
                        </button>
                        <button 
                          onClick={cancelEdit}
                          className="p-1 text-text-secondary hover:text-text"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : (
                      <div 
                        className={`flex items-center p-3 rounded-lg cursor-pointer group ${
                          activeChatId === chat.id ? 'bg-active text-text' : 'hover:bg-hover text-text-secondary'
                        }`}
                        onClick={() => handleChatClick(chat.id)}
                      >
                        <FiMessageSquare className="mr-3 flex-shrink-0" />
                        <span className="flex-1 truncate">{chat.title}</span>
                        
                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(chat.id, chat.title);
                            }}
                            className="p-1 text-text-secondary hover:text-text"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Are you sure you want to delete this chat?')) {
                                deleteChat(chat.id);
                              }
                            }}
                            className="p-1 text-text-secondary hover:text-red-500"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-text-secondary p-4">
                No chats yet. Create a new chat to get started.
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-divider">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handleClearChats}
                className="text-sm text-text-secondary hover:text-red-500 transition-colors"
              >
                Clear all chats
              </button>
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="flex items-center justify-center w-full gap-2 p-2 rounded-lg border border-divider hover:bg-hover transition-colors text-sm"
            >
              <FiSettings size={14} />
              <span>API Key Settings</span>
            </button>
          </div>
        </div>
      </aside>

      <ApiKeyModal 
        isOpen={isApiKeyModalOpen} 
        onClose={() => setIsApiKeyModalOpen(false)} 
      />
    </>
  );
};

export default Sidebar;
