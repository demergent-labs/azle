import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    accept: ActorMethod<[], boolean>;
    error: ActorMethod<[], never>;
    reject: ActorMethod<[string], never>;
}
