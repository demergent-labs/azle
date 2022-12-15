import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    get_randomness_directly: ActorMethod<[], Uint8Array>;
    get_randomness_indirectly: ActorMethod<[], Uint8Array>;
    get_randomness_super_indirectly: ActorMethod<[], Uint8Array>;
}
