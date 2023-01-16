import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ManualReply = { ok: string } | { err: string };
export type ManualReply_1 = { ok: bigint } | { err: string };
export interface _SERVICE {
    deep_query: ActorMethod<[], ManualReply>;
    inc_canister1: ActorMethod<[], ManualReply_1>;
    inc_canister2: ActorMethod<[], ManualReply_1>;
    inc_counter: ActorMethod<[], bigint>;
    manual_query: ActorMethod<[], ManualReply>;
    simple_composite_query: ActorMethod<[], ManualReply>;
    simple_query: ActorMethod<[], ManualReply>;
    simple_update: ActorMethod<[], ManualReply>;
    totally_manual_query: ActorMethod<[], ManualReply>;
    update_query: ActorMethod<[], ManualReply>;
}
