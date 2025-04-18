import { useState, useEffect } from 'react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { useScrollToBottom } from './useScrollToBottom';
import { Greeting } from './Greeting';
import { SuggestedActions } from './SuggestedActions';

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

    const handleSelectSuggestion = (suggestion: string) => {
        if (isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: suggestion,
            role: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
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

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] md:h-[600px] bg-background rounded-xl">
            {/* Messages Container */}
            <div
                ref={messagesContainerRef}
                role="log"
                aria-live="polite"
                className={`flex-1 p-4 space-y-4 bg-white dark:bg-gray-900 max-h-[calc(100vh-300px)] ${messages.length > 0 ? 'overflow-y-scroll' : 'overflow-hidden'
                    }`}
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <Greeting />
                    </div>
                ) : (
                    messages.map((message) => (
                        <Message
                            key={message.id}
                            content={message.content}
                            role={message.role}
                            isLoading={isLoading && message.id === messages[messages.length - 1]?.id}
                        />
                    ))
                )}
                <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
            </div>

            {/* Suggested Actions and Input Form */}
            <div className="p-4 space-y-4">
                {messages.length === 0 && (
                    <SuggestedActions onSelectSuggestion={handleSelectSuggestion} />
                )}
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