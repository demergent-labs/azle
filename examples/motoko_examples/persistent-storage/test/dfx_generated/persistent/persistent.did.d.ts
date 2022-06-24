import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    get: ActorMethod<[], bigint>;
    increment: ActorMethod<[], bigint>;
    reset: ActorMethod<[], bigint>;
}
