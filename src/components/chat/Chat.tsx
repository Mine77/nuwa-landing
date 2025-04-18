import { useState } from 'react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { useScrollToBottom } from './useScrollToBottom';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
}

export function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

    const handleSubmit = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            role: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // TODO: Add actual AI response logic here
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: 'This is a simulated AI response message.',
                role: 'assistant'
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1000);
    };

    const handleStop = () => {
        setIsLoading(false);
        // TODO: Implement stop generation logic
    };

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] md:h-[600px] bg-background rounded-xl">
            {/* Chat Header */}
            <div className="p-4 text-center">
                <h2 className="text-xl font-semibold">Chat with AI Assistant</h2>
            </div>

            {/* Messages Container */}
            <div
                ref={messagesContainerRef}
                role="log"
                aria-live="polite"
                className="flex-1 overflow-y-scroll p-4 space-y-4 bg-white dark:bg-gray-900 max-h-[calc(100vh-300px)]"
            >
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        content={message.content}
                        role={message.role}
                        isLoading={isLoading && message.id === messages[messages.length - 1]?.id}
                    />
                ))}
                <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
            </div>

            {/* Input Form */}
            <div className="p-4">
                <ChatInput
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSubmit}
                    onStop={handleStop}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
} 