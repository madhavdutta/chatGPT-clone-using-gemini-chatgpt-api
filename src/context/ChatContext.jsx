import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const ChatContext = createContext();

// Use the API key directly
const API_KEY = 'AIzaSyD0NIptTIblUjAhgMVa4BsUkA3dGB4NvpE';
// Initialize the API with the key
const genAI = new GoogleGenerativeAI(API_KEY);

// Updated to use Gemini 2.5 model
const MODEL_NAME = 'gemini-1.5-pro';

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [modelError, setModelError] = useState(null);
  const [selectedModel, setSelectedModel] = useState(MODEL_NAME);
  const [streamingChatId, setStreamingChatId] = useState(null);
  const [streamingMessageIndex, setStreamingMessageIndex] = useState(null);

  // Load available models on initial render
  useEffect(() => {
    const fetchModels = async () => {
      try {
        // Fetch available models using fetch API directly
        const response = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models?key=' + API_KEY
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setAvailableModels(data.models || []);
        console.log('Available models:', data.models);
        
        // Check if our selected model is available
        const modelNames = data.models.map(model => model.name.split('/').pop());
        console.log('Available model names:', modelNames);
        
        if (!modelNames.includes(MODEL_NAME)) {
          console.warn(`Model ${MODEL_NAME} not found in available models. Available models: ${modelNames.join(', ')}`);
        }
      } catch (error) {
        console.error('Error fetching models:', error);
        setModelError(error.message);
      }
    };
    
    fetchModels();
  }, []);

  // Load chats from localStorage on initial render
  useEffect(() => {
    const savedChats = localStorage.getItem('chats');
    const savedActiveChatId = localStorage.getItem('activeChatId');
    
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
    
    if (savedActiveChatId) {
      setActiveChatId(savedActiveChatId);
    } else if (JSON.parse(savedChats || '[]').length > 0) {
      // Set the first chat as active if there's no active chat saved
      setActiveChatId(JSON.parse(savedChats)[0].id);
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  // Save active chat ID to localStorage whenever it changes
  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem('activeChatId', activeChatId);
    }
  }, [activeChatId]);

  const createNewChat = () => {
    const newChatId = uuidv4();
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
    };
    
    setChats([newChat, ...chats]);
    setActiveChatId(newChatId);
    return newChatId;
  };

  const deleteChat = (chatId) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    // If the deleted chat was active, set the first chat as active or create a new one
    if (chatId === activeChatId) {
      if (updatedChats.length > 0) {
        setActiveChatId(updatedChats[0].id);
      } else {
        createNewChat();
      }
    }
  };

  const renameChat = (chatId, newTitle) => {
    const updatedChats = chats.map(chat => 
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    );
    setChats(updatedChats);
  };

  const getActiveChat = () => {
    return chats.find(chat => chat.id === activeChatId) || null;
  };

  // Helper function to update streaming message content
  const updateStreamingMessage = (content) => {
    if (streamingChatId && streamingMessageIndex !== null) {
      setChats(prevChats => 
        prevChats.map(chat => {
          if (chat.id === streamingChatId) {
            const updatedMessages = [...chat.messages];
            updatedMessages[streamingMessageIndex] = {
              ...updatedMessages[streamingMessageIndex],
              content
            };
            return {
              ...chat,
              messages: updatedMessages
            };
          }
          return chat;
        })
      );
    }
  };

  const sendMessage = async (message) => {
    if (!activeChatId) {
      const newChatId = createNewChat();
      setActiveChatId(newChatId);
    }

    // Add user message to chat
    const userMessage = { role: 'user', content: message, timestamp: new Date().toISOString() };
    
    // Update chat with user message
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChatId) {
        // If this is the first message, update the chat title
        const shouldUpdateTitle = chat.messages.length === 0;
        const newTitle = shouldUpdateTitle ? generateChatTitle(message) : chat.title;
        
        return {
          ...chat,
          title: newTitle,
          messages: [...chat.messages, userMessage],
        };
      }
      return chat;
    });
    
    setChats(updatedChats);
    
    // Generate AI response
    setLoading(true);
    try {
      // Get the active chat with the updated messages
      const activeChat = updatedChats.find(chat => chat.id === activeChatId);
      
      // Initialize the model with Gemini 2.5
      const model = genAI.getGenerativeModel({ model: selectedModel });
      
      // Convert previous messages to the format expected by the API
      const history = activeChat.messages
        .slice(0, -1) // Exclude the most recent message (which we'll send separately)
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));
      
      // Start a chat session
      const chat = model.startChat({
        history: history,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        }
      });
      
      // Create an empty AI response message
      const aiMessage = { 
        role: 'assistant', 
        content: '', 
        timestamp: new Date().toISOString(),
        isStreaming: true
      };
      
      // Add the empty message to the chat
      setChats(prevChats => 
        prevChats.map(chat => {
          if (chat.id === activeChatId) {
            return {
              ...chat,
              messages: [...chat.messages, aiMessage],
            };
          }
          return chat;
        })
      );
      
      // Set streaming state
      setStreamingChatId(activeChatId);
      setStreamingMessageIndex(activeChat.messages.length); // Index of the new message
      
      // Send the message and get the response stream
      const result = await chat.sendMessageStream(message);
      
      // Initialize accumulated response
      let accumulatedResponse = '';
      
      // Process the stream
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedResponse += chunkText;
        updateStreamingMessage(accumulatedResponse);
      }
      
      // Update the message with the final content and remove streaming flag
      setChats(prevChats => 
        prevChats.map(chat => {
          if (chat.id === activeChatId) {
            const updatedMessages = [...chat.messages];
            updatedMessages[updatedMessages.length - 1] = {
              ...updatedMessages[updatedMessages.length - 1],
              content: accumulatedResponse,
              isStreaming: false
            };
            return {
              ...chat,
              messages: updatedMessages
            };
          }
          return chat;
        })
      );
      
      // Reset streaming state
      setStreamingChatId(null);
      setStreamingMessageIndex(null);
      
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Add error message to chat
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error while processing your request. Please try again. Error: ' + error.message, 
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      setChats(prevChats => 
        prevChats.map(chat => {
          if (chat.id === activeChatId) {
            return {
              ...chat,
              messages: [...chat.messages, errorMessage],
            };
          }
          return chat;
        })
      );
      
      // Reset streaming state
      setStreamingChatId(null);
      setStreamingMessageIndex(null);
    } finally {
      setLoading(false);
    }
  };

  // Generate a title based on the first message
  const generateChatTitle = (message) => {
    // Truncate message if it's too long
    const maxLength = 30;
    if (message.length <= maxLength) {
      return message;
    }
    return message.substring(0, maxLength) + '...';
  };

  const clearChats = () => {
    setChats([]);
    createNewChat();
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChatId,
        loading,
        availableModels,
        modelError,
        selectedModel,
        streamingChatId,
        streamingMessageIndex,
        setSelectedModel,
        setActiveChatId,
        createNewChat,
        deleteChat,
        renameChat,
        getActiveChat,
        sendMessage,
        clearChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
