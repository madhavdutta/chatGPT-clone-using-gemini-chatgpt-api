import React, { useContext } from 'react';
import { FiMessageSquare, FiCode, FiSearch, FiHelpCircle } from 'react-icons/fi';
import Logo from './Logo';
import { ChatContext } from '../context/ChatContext';

const WelcomeScreen = () => {
  const { sendMessage } = useContext(ChatContext);

  const handleExampleClick = (example) => {
    sendMessage(example);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-6 text-center">
      <div className="mb-8">
        <Logo size="xlarge" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Welcome to xBAI</h1>
      <p className="text-text-secondary max-w-lg mb-8">
        Your intelligent AI assistant powered by xBesh. Ask me anything, and I'll do my best to help you.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <SuggestionCard 
          icon={<FiMessageSquare />}
          title="General Conversation"
          description="Chat about any topic or ask questions about virtually anything."
          examples={[
            "Tell me about quantum computing",
            "What are some healthy breakfast ideas?",
            "Explain climate change in simple terms"
          ]}
          onExampleClick={handleExampleClick}
        />
        
        <SuggestionCard 
          icon={<FiCode />}
          title="Coding & Development"
          description="Get help with programming, debugging, or learning new technologies."
          examples={[
            "Write a function to reverse a string in JavaScript",
            "Explain React hooks",
            "How do I implement a binary search tree?"
          ]}
          onExampleClick={handleExampleClick}
        />
        
        <SuggestionCard 
          icon={<FiSearch />}
          title="Research & Analysis"
          description="Explore topics in depth or get summaries of complex subjects."
          examples={[
            "Compare and contrast different economic systems",
            "Summarize the key points of machine learning",
            "What are the latest advancements in renewable energy?"
          ]}
          onExampleClick={handleExampleClick}
        />
        
        <SuggestionCard 
          icon={<FiHelpCircle />}
          title="Creative Assistance"
          description="Get help with writing, brainstorming, or creative projects."
          examples={[
            "Write a short story about a time traveler",
            "Help me brainstorm names for my new product",
            "Create a workout plan for beginners"
          ]}
          onExampleClick={handleExampleClick}
        />
      </div>
    </div>
  );
};

const SuggestionCard = ({ icon, title, description, examples, onExampleClick }) => {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <div className="text-primary text-xl mr-2">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-text-secondary text-sm mb-3">{description}</p>
      <div className="space-y-2">
        {examples.map((example, index) => (
          <div 
            key={index}
            className="text-xs bg-hover p-2 rounded-lg cursor-pointer hover:bg-active transition-colors"
            onClick={() => onExampleClick(example)}
          >
            "{example}"
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
