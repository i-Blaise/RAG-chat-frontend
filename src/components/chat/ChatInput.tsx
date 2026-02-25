import React, { useState, useRef } from 'react';
import { SendHorizontal, Paperclip, Mic, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        e.target.style.height = 'auto'; // Reset height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set to scroll height
    };

    return (
        <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 pb-6">
            <div className="max-w-3xl mx-auto">
                <div className="relative flex flex-col gap-2 rounded-xl border bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring p-2 transition-all">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={input}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about the Cybersecurity Bill 2025..."
                        className="min-h-[44px] w-full resize-none bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 max-h-[200px]"
                        disabled={disabled}
                    />
                    <div className="flex items-center justify-between px-2 pb-1">
                        <div className="flex items-center gap-2">
                            <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted" title="Upload File (Demo)">
                                <Paperclip className="h-4 w-4" />
                            </button>
                            <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted" title="Generate Image (Demo)">
                                <ImageIcon className="h-4 w-4" />
                            </button>
                            <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted" title="Voice Input (Demo)">
                                <Mic className="h-4 w-4" />
                            </button>
                        </div>

                        <button
                            onClick={() => handleSubmit()}
                            disabled={!input.trim() || disabled}
                            className={cn(
                                "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed",
                                !input.trim() && "opacity-0 scale-90"
                            )}
                        >
                            <SendHorizontal className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </button>
                    </div>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-2">
                    AI can make mistakes. Please verify important information.
                </p>
            </div>
        </div>
    );
}
