import { Record, registerPlugin, Result, Variant, Vec } from 'azle';

type SQLite = {
    execute: (sql: string) => ExecuteResult;
    query: (sql: string) => QueryResult;
};

export type SQLiteError = Variant<{
    InvalidCanister: null;
    CanisterError: SQLiteCanisterError;
}>;

export type SQLiteCanisterError = Record<{
    message: string;
}>;

export type QueryResult = Result<Vec<Vec<string>>, SQLiteError>;

export type ExecuteResult = Result<string, SQLiteError>;

export const SQLite: SQLite = registerPlugin({
    globalObjectName: 'SQLite',
    rustRegisterFunctionName: '_ic_sqlite_plugin_register'
});
