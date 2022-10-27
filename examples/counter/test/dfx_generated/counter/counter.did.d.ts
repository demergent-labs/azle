import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    increment_count: ActorMethod<[], bigint>;
    read_count: ActorMethod<[], bigint>;
}
