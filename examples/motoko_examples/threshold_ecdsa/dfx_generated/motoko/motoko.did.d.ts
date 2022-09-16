import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    public_key: ActorMethod<
        [],
        { Ok: { public_key: Array<number> } } | { Err: string }
    >;
    sign: ActorMethod<
        [Array<number>],
        { Ok: { signature: Array<number> } } | { Err: string }
    >;
}
