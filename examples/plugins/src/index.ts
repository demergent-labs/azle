import { $query, $update } from 'azle';
import { ExecuteResult, QueryResult, SQLite } from '../ic_sqlite_plugin';

$update;
export function execute(sql: string): ExecuteResult {
    return SQLite.execute(sql);
}

$query;
export function query(sql: string): QueryResult {
    return SQLite.query(sql);
}
