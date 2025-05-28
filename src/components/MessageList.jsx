import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiUser } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const MessageList = ({ messages }) => {
  return (
    <div className="space-y-8 w-full">
      {messages.map((message, index) => (
        <Message key={index} message={message} index={index} />
      ))}
    </div>
  );
};

const Message = memo(({ message, index }) => {
  const { role, content, timestamp, isError, isStreaming } = message;
  const isUser = role === 'user';
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-start gap-4 message-animation">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary-color' : 'bg-accent'
      }`}>
        {isUser ? (
          <FiUser className="text-white text-lg" />
        ) : (
          <RiRobot2Line className="text-white text-lg" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center mb-2">
          <span className="font-medium">
            {isUser ? 'You' : 'xBAI'}
          </span>
          <span className="ml-2 text-xs text-text-secondary">
            {formatTime(timestamp)}
          </span>
          {isStreaming && (
            <span className="ml-2 text-xs text-primary-color animate-pulse">
              typing...
            </span>
          )}
        </div>
        
        <div className={`p-4 rounded-lg shadow-sm ${
          isUser 
            ? 'bg-primary-color bg-opacity-90 text-white' 
            : isError 
              ? 'bg-error/30 text-error-text border border-error' 
              : 'bg-message text-text'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="markdown prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="code-block relative rounded-md overflow-hidden">
                        <div className="flex items-center px-4 py-2 bg-black bg-opacity-50 text-xs font-mono">
                          <span>{match[1]}</span>
                        </div>
                        <SyntaxHighlighter
                          style={document.documentElement.classList.contains('light-theme') ? prism : vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-b-md !bg-code"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={`${className} bg-code-inline px-1.5 py-0.5 rounded text-sm font-mono`} {...props}>
                        {children}
                      </code>
                    );
                  },
                  a: ({ node, ...props }) => (
                    <a 
                      {...props} 
                      className="text-link hover:underline" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4 rounded-lg border border-divider">
                      <table {...props} className="border-collapse w-full" />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th {...props} className="border border-divider px-4 py-2 bg-table-header" />
                  ),
                  td: ({ node, ...props }) => (
                    <td {...props} className="border border-divider px-4 py-2" />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote {...props} className="border-l-4 border-blockquote pl-4 italic my-4 text-text-secondary" />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-disc pl-5 my-3" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} className="list-decimal pl-5 my-3" />
                  ),
                  li: ({ node, ...props }) => (
                    <li {...props} className="my-1" />
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="my-3" />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1 {...props} className="text-2xl font-bold my-4" />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 {...props} className="text-xl font-bold my-3" />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 {...props} className="text-lg font-bold my-2" />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 {...props} className="text-base font-bold my-2" />
                  ),
                  h5: ({ node, ...props }) => (
                    <h5 {...props} className="text-sm font-bold my-2" />
                  ),
                  h6: ({ node, ...props }) => (
                    <h6 {...props} className="text-xs font-bold my-2" />
                  ),
                }}
              >
                {content || " "}
              </ReactMarkdown>
              {isStreaming && (
                <span className="inline-block w-1.5 h-4 bg-primary-color ml-0.5 animate-blink"></span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default MessageList;
