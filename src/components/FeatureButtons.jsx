import React from 'react';
import { FiUpload, FiImage, FiMic } from 'react-icons/fi';

const FeatureButtons = () => {
  return (
    <div className="flex justify-center mt-2 space-x-2">
      <button 
        className="p-2 text-xs text-text-secondary hover:text-text flex items-center gap-1 rounded-md hover:bg-hover transition-colors"
        title="Upload file"
      >
        <FiUpload size={14} />
        <span>Upload</span>
      </button>
      
      <button 
        className="p-2 text-xs text-text-secondary hover:text-text flex items-center gap-1 rounded-md hover:bg-hover transition-colors"
        title="Generate image"
      >
        <FiImage size={14} />
        <span>Image</span>
      </button>
      
      <button 
        className="p-2 text-xs text-text-secondary hover:text-text flex items-center gap-1 rounded-md hover:bg-hover transition-colors"
        title="Voice input"
      >
        <FiMic size={14} />
        <span>Voice</span>
      </button>
    </div>
  );
};

export default FeatureButtons;
