import * as azle from 'azle';

export type StarRecord = azle.Record<{ star: boolean }>;
export type StartRecordAlias<T extends object> = azle.Record<T>;
