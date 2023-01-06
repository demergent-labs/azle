import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type StringQueryResult = { ok: string } | { err: string };
export interface _SERVICE {
    deep_query: ActorMethod<[], StringQueryResult>;
    inc_counter: ActorMethod<[], bigint>;
    manual_query: ActorMethod<[], string>;
    simple_query: ActorMethod<[], string>;
    update_query: ActorMethod<[], string>;
}
