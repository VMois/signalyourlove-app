export type Conversation = {
    name: string;
    id: string;
}

export interface MessagesPerDay {
    date: string,
    count: number,
}

export interface Statistics {
    name: string,
    total_messages: number,
    total_calls: number,
    messages_per_day: MessagesPerDay[],
    top_day: MessagesPerDay,
    total_days: number,
    first_date: string,
    last_date: string,
}

export interface APIGetConversations {
    (): Promise<Conversation[]>;
}

export interface APIGetStatistics {
    (conversationId: string): Promise<Statistics>;
}

declare global {
  interface Window {
    electronAPI: {
        getConversations: APIGetConversations;
        getStatistics: APIGetStatistics;
    };
  }
}
