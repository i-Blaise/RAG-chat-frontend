import type { Message } from '../../types';
import { cn } from '../../lib/utils';
import { SourceList } from './SourceList';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "flex w-full gap-4 p-4 md:p-6",
                isUser ? "flex-row-reverse bg-accent/20" : "bg-background"
            )}
        >
            <div className={cn(
                "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow-sm",
                isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div className={cn("flex-1 space-y-2 overflow-hidden", isUser && "text-right")}>
                <div className="prose prose-slate dark:prose-invert break-words max-w-none text-sm md:text-base leading-relaxed">
                    {message.text}
                </div>

                {!isUser && message.sources && (
                    <SourceList sources={message.sources} />
                )}
            </div>
        </motion.div>
    );
}
