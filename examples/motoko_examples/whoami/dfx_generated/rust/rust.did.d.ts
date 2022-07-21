import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    argument: ActorMethod<[], Principal>;
    id: ActorMethod<[], Principal>;
    id_quick: ActorMethod<[], Principal>;
    installer: ActorMethod<[], Principal>;
    whoami: ActorMethod<[], Principal>;
}
