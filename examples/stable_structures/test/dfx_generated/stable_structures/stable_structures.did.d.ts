import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    contains_key: ActorMethod<[string], boolean>;
    get: ActorMethod<[string], string>;
    insert: ActorMethod<[string, string], string>;
    is_empty: ActorMethod<[], boolean>;
    len: ActorMethod<[], bigint>;
    remove: ActorMethod<[string], [] | [string]>;
}
