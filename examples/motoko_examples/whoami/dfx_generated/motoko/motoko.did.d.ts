import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface WhoAmI {
    argument: ActorMethod<[], Principal>;
    id: ActorMethod<[], Principal>;
    idQuick: ActorMethod<[], Principal>;
    installer: ActorMethod<[], Principal>;
    whoami: ActorMethod<[], Principal>;
}
export interface _SERVICE extends WhoAmI {}
