/*
  Author(s): Vladyslav Moisieienkov
  License: GNU General Public License version 3 (GPL-3.0)
*/

import SQL, { Database } from '@signalapp/better-sqlite3';

import { getDBPath, getDBKey } from './config';
import { GetStatistics, GetConversations, Conversation, Statistics, MessagesPerDay, Result } from '../types.d';

let db: Database | undefined = undefined;

function init_db(): Result<void, string> {
    if (db) {
        return {
            isOk: true,
            value: undefined,
        };
    }

    try {
        db = new SQL(getDBPath(), { readonly: true });
        db.pragma(`key = "x'${getDBKey()}'"`);
        return {
            isOk: true,
            value: undefined,
        };
    } catch (e) {
        return {
            isOk: false,
            error: 'Could not open Signal Desktop database. Please make sure Signal Desktop is installed.',
        };
    }
}

export function getConversations(): GetConversations {
    const result = init_db();
    if (result.isOk == false) {
        return {
            isOk: false,
            error: result.error,
        };
    }

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
    return {
        isOk: true,
        value: convos,
    };
}

export function getStatistics(conversationId: string): GetStatistics {
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

    const result = init_db();
    if (result.isOk == false) {
        return {
            isOk: false,
            error: result.error,
        };
    }

    stats['name'] = db.prepare('SELECT name FROM conversations WHERE id = ?').get(conversationId)['name'];

    stats['total_messages'] = db.prepare('SELECT COUNT(*) as total FROM messages WHERE conversationId = ? AND type != "call-history"').get(conversationId)['total'];

    const messagesPerDay: MessagesPerDay[] = db.prepare('SELECT DATE(sent_at/1000, "unixepoch") as date, COUNT(*) as count FROM messages WHERE conversationId = ? AND type != "call-history" GROUP BY DATE(sent_at/1000, "unixepoch") ORDER BY count DESC').all(conversationId);
    stats['top_day'] = messagesPerDay[0];
    stats['first_date'] = messagesPerDay.reduce((prev, curr) => (prev.date < curr.date) ? prev : curr).date;
    stats['last_date'] = messagesPerDay.reduce((prev, curr) => (prev.date > curr.date) ? prev : curr).date;
    stats['messages_per_day'] = messagesPerDay;

    stats['total_days'] = db.prepare('SELECT COUNT(DISTINCT DATE(sent_at/1000, "unixepoch")) as total FROM messages WHERE conversationId = ? AND type != "call-history"').get(conversationId)['total'];

    stats['total_calls'] = db.prepare('SELECT COUNT(*) as total FROM messages WHERE type = "call-history" AND json_extract(json, "$.callHistoryDetails.wasDeclined") = False AND conversationId = ?').get(conversationId)['total'];
    return {
        isOk: true,
        value: stats,
    };
}
