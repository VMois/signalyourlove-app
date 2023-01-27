export type Result<T, E> = { isOk: true; value: T } | { isOk: false; error: E };

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

export type GetConversations = Result<Conversation[], string>;
export type GetStatistics = Result<Statistics, string>;

export interface APIGetConversations {
    (): Promise<GetConversations>;
}

export interface APIGetStatistics {
    (conversationId: string): Promise<GetStatistics>;
}

declare global {
  interface Window {
    electronAPI: {
        getConversations: APIGetConversations;
        getStatistics: APIGetStatistics;
    };
  }
}
