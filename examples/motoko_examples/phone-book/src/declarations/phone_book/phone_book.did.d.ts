import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface rec_0 {
    desc: string;
    phone: string;
}
export interface rec_1 {
    desc: string;
    phone: string;
}
export interface _SERVICE {
    insert: ActorMethod<[string, rec_0], undefined>;
    lookup: ActorMethod<[string], [] | [rec_1]>;
}
