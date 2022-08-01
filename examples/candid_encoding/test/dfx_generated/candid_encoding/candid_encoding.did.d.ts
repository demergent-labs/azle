import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    candid_decode: ActorMethod<[Array<number>], string>;
    candid_encode: ActorMethod<[string], Array<number>>;
}
