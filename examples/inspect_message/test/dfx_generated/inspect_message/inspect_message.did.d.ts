import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    accessible: ActorMethod<[], boolean>;
    also_inaccessible: ActorMethod<[], boolean>;
    inaccessible: ActorMethod<[], boolean>;
}
