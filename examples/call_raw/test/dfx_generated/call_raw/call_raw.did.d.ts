import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ExecuteCallRaw128Result = { ok: string } | { err: string };
export type ExecuteCallRawResult = { ok: string } | { err: string };
export interface _SERVICE {
    execute_call_raw: ActorMethod<
        [Principal, string, string, bigint],
        ExecuteCallRawResult
    >;
    execute_call_raw128: ActorMethod<
        [Principal, string, string, bigint],
        ExecuteCallRaw128Result
    >;
}
