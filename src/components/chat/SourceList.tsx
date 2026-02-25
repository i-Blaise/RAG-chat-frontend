import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Source } from '../../types';

interface SourceListProps {
    sources: Source[];
}

export function SourceList({ sources }: SourceListProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Filter sources with score >= 0.57
    const filteredSources = sources.filter((source) => source.score >= 0.57);

    if (filteredSources.length === 0) {
        return null;
    }

    return (
        <div className="mt-2">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                <BookOpen className="h-3 w-3 mr-1" />
                {filteredSources.length} Source{filteredSources.length !== 1 ? 's' : ''}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col gap-2 pt-2 pb-1">
                            {filteredSources.map((source, index) => {
                                const percentage = Math.round(source.score * 100);
                                return (
                                    <div
                                        key={index}
                                        className="p-3 rounded-lg bg-muted/50 border border-border/50 text-sm"
                                    >
                                        <p className="line-clamp-2 text-foreground/90 mb-2">{source.text}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span className="font-medium">{percentage}% relevance</span>
                                            <div className="h-1.5 flex-1 rounded-full bg-border overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
