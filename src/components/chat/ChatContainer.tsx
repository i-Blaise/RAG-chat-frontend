import { useEffect, useRef } from 'react';
import { Bot, Trash2 } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

export function ChatContainer() {
    const { messages, isLoading, sendMessage, clearChat } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    return (
        <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background shadow-xl border-x overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b bg-background/95 backdrop-blur z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                        <Bot className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-lg leading-none">AI Assistant</h1>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Online
                        </span>
                    </div>
                </div>

                <button
                    onClick={clearChat}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                    title="Clear Chat"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8 opacity-50">
                        <Bot className="h-16 w-16 mb-4 stroke-1" />
                        <p className="text-lg font-medium">How can I help you today?</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))
                )}

                {isLoading && (
                    <div className="flex gap-4 p-4 md:p-6 bg-background">
                        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow-sm bg-muted text-muted-foreground">
                            <Bot className="h-4 w-4" />
                        </div>
                        <TypingIndicator />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
    );
}
