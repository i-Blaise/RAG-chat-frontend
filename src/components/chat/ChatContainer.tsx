import { useEffect, useRef } from 'react';
import { Bot, Trash2, X, FileText } from 'lucide-react';

const KB_PDF_URL = '/kb/Cybersecurity-Amendment-Draft-Bill-2025.pdf';
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
        <div className="flex flex-col h-full w-full mx-auto bg-background shadow-2xl relative">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b bg-background/95 backdrop-blur z-10 sticky top-0 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-xl text-primary ring-1 ring-primary/20 shadow-sm">
                        <Bot className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-none tracking-tight">CyberLaw Assistant</h1>
                        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mt-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Cybersecurity Bill 2025
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5">
                    <a
                        href={KB_PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                        title="View Source Document"
                    >
                        <FileText className="h-5 w-5" />
                    </a>
                    <button
                        onClick={clearChat}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                        title="Clear Chat"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
                        title="Close Chat"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-primary/10 p-4 rounded-2xl mb-6 ring-1 ring-primary/20 shadow-sm text-primary">
                            <Bot className="h-10 w-10" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-foreground">
                            Cybersecurity (Amendment) Draft Bill 2025
                        </h2>
                        <div className="text-muted-foreground mb-8 leading-relaxed max-w-xl flex flex-col gap-4">
                            <p>
                                I am a specialized assistant trained strictly on the new Ghana Cybersecurity amendment provisions.
                                Ask me about AI regulations, licensing, or enforcement powers.
                            </p>
                            <div className="bg-destructive/5 text-destructive border border-destructive/20 rounded-lg p-3 text-sm text-left flex gap-3 items-start">
                                <span className="text-lg">ℹ️</span>
                                <span>I will not be able to provide appropriate answers to questions outside this specific legislative scope.</span>
                            </div>
                        </div>
                        <a
                            href={KB_PDF_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 ring-1 ring-primary/20 text-sm font-semibold transition-all hover:shadow-md mb-6 group"
                        >
                            <FileText className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            Read the Source Document
                        </a>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                            <button
                                onClick={() => sendMessage("What does the bill say about Artificial Intelligence?")}
                                className="p-4 bg-background hover:bg-muted/50 transition-colors rounded-xl border border-border/60 shadow-sm text-sm text-left group"
                            >
                                <p className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">Definition & Scope</p>
                                <p className="text-muted-foreground line-clamp-2">"What does the bill say about Artificial Intelligence?"</p>
                            </button>
                            <button
                                onClick={() => sendMessage("What are the penalties for non-compliance?")}
                                className="p-4 bg-background hover:bg-muted/50 transition-colors rounded-xl border border-border/60 shadow-sm text-sm text-left group"
                            >
                                <p className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">Enforcement</p>
                                <p className="text-muted-foreground line-clamp-2">"What are the penalties for non-compliance?"</p>
                            </button>
                        </div>
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
