import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    get_blob: ActorMethod<[], Array<number>>;
    get_blobs: ActorMethod<[], Array<Array<number>>>;
}
