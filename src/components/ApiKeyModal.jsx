import { useState, useContext, useEffect } from 'react';
import { FiX, FiInfo } from 'react-icons/fi';
import { ChatContext } from '../context/ChatContext';

const ApiKeyModal = ({ isOpen, onClose }) => {
  const { apiKey, updateApiKey } = useContext(ChatContext);
  const [inputKey, setInputKey] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInputKey(apiKey || '');
      setShowSuccess(false);
    }
  }, [isOpen, apiKey]);

  const handleSave = () => {
    updateApiKey(inputKey.trim());
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to the default API key?')) {
      updateApiKey(null);
      setInputKey('');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-divider">
          <h2 className="text-lg font-semibold">API Key Settings</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-hover"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="api-key" className="block mb-2 text-sm font-medium">
              Gemini API Key
            </label>
            <input
              id="api-key"
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full p-2 border border-divider rounded-md bg-input text-text"
            />
          </div>
          
          <div className="flex items-start mb-4 p-3 bg-hover rounded-md">
            <FiInfo className="text-primary-color mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm">
              <p className="mb-2">You can use your own Gemini API key or leave it blank to use the default key.</p>
              <p>Get your API key from the <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Google AI Studio</a>.</p>
            </div>
          </div>
          
          {showSuccess && (
            <div className="mb-4 p-3 bg-primary-color bg-opacity-10 text-primary-color rounded-md text-sm">
              API key settings saved successfully!
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-divider rounded-md hover:bg-hover"
            >
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-color text-white rounded-md hover:bg-opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
