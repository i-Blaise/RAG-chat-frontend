export interface Source {
    text: string;
    score: number;
}

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    sources?: Source[];
    timestamp: number;
}

export interface ChatResponse {
    answer: string;
    sources: Source[];
}
