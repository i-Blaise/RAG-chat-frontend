import { motion } from 'framer-motion';

export function TypingIndicator() {
    return (
        <div className="flex space-x-1 items-center p-4 bg-muted/50 rounded-2xl rounded-tl-none w-fit">
            <motion.div
                className="w-2 h-2 bg-foreground/40 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="w-2 h-2 bg-foreground/40 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div
                className="w-2 h-2 bg-foreground/40 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
        </div>
    );
}
