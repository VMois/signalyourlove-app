import SQL, { Database } from '@signalapp/better-sqlite3';

import { getDBPath, getDBKey } from './config';
import { Conversation } from '../data_types';

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
    for (let convo of stm.all()) {
        convos.push({
            id: convo['id'],
            name: convo['name'],
        });
    }
    return convos;
}

export function getStatistics(conversationId: string): any {
    let stats = {
        'name': '',
        'total_messages': -1,
        'top_day': {
            'date': '',
            'total': -1,
        },
        'total_days': -1,
    }

    init_db();

    stats['name'] = db.prepare('SELECT name FROM conversations WHERE id = ?').get(conversationId)['name'];

    stats['total_messages'] = db.prepare('SELECT COUNT(*) as total FROM messages WHERE conversationId = ? AND type != "call-history"').get(conversationId)['total'];

    const topDay = db.prepare('SELECT DATE(sent_at/1000, "unixepoch") as date, COUNT(*) as total FROM messages WHERE conversationId = ? AND type != "call-history" GROUP BY DATE(sent_at/1000, "unixepoch") ORDER BY total DESC LIMIT 1').get(conversationId);
    stats['top_day']['date'] = topDay['date'];
    stats['top_day']['total'] = topDay['total'];

    stats['total_days'] = db.prepare('SELECT COUNT(DISTINCT DATE(sent_at/1000, "unixepoch")) as total FROM messages WHERE conversationId = ? AND type != "call-history"').get(conversationId)['total'];
    return stats;
}