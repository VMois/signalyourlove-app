import SQL, { Database } from '@signalapp/better-sqlite3';

import { getDBPath, getDBKey } from './config';
import { Conversation, Statistics, MessagesPerDay } from '../types.d';

let db: Database | undefined = undefined;

function init_db(): void {
    if (db) {
        return;
    }

    db = new SQL(getDBPath(), { readonly: true });
    db.pragma(`key = "x'${getDBKey()}'"`);
}

export function getConversations(): Conversation[] {
    init_db();

    const stm = db.prepare(`SELECT id, name FROM conversations
                            WHERE type="private" AND active_at IS NOT NULL 
                            AND name IS NOT NULL ORDER BY active_at DESC`);

    const convos: Conversation[] = [];
    for (const convo of stm.all()) {
        convos.push({
            id: convo['id'],
            name: convo['name'],
        });
    }
    return convos;
}

export function getStatistics(conversationId: string): Statistics {
    const stats: Statistics = {
        'name': '',
        'total_messages': -1,
        'total_calls': -1,
        'messages_per_day': [],
        'top_day': {
            'date': '',
            'count': -1,
        },
        'total_days': -1,
        'first_date': '',
        'last_date': '',
    }

    init_db();

    stats['name'] = db.prepare('SELECT name FROM conversations WHERE id = ?').get(conversationId)['name'];

    stats['total_messages'] = db.prepare('SELECT COUNT(*) as total FROM messages WHERE conversationId = ? AND type != "call-history"').get(conversationId)['total'];

    const messagesPerDay: MessagesPerDay[] = db.prepare('SELECT DATE(sent_at/1000, "unixepoch") as date, COUNT(*) as count FROM messages WHERE conversationId = ? AND type != "call-history" GROUP BY DATE(sent_at/1000, "unixepoch") ORDER BY count DESC').all(conversationId);
    stats['top_day'] = messagesPerDay[0];
    stats['first_date'] = messagesPerDay.reduce((prev, curr) => (prev.date < curr.date) ? prev : curr).date;
    stats['last_date'] = messagesPerDay.reduce((prev, curr) => (prev.date > curr.date) ? prev : curr).date;
    stats['messages_per_day'] = messagesPerDay;

    stats['total_days'] = db.prepare('SELECT COUNT(DISTINCT DATE(sent_at/1000, "unixepoch")) as total FROM messages WHERE conversationId = ? AND type != "call-history"').get(conversationId)['total'];

    stats['total_calls'] = db.prepare('SELECT COUNT(*) as total FROM messages WHERE type = "call-history" AND json_extract(json, "$.callHistoryDetails.wasDeclined") = False AND conversationId = ?').get(conversationId)['total'];
    return stats;
}