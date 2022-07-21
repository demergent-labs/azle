import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    count: ActorMethod<[], bigint>;
    get_count: ActorMethod<[], bigint>;
    reset: ActorMethod<[], bigint>;
}
