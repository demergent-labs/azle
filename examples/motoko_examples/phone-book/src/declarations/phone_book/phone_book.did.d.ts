import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    insert: ActorMethod<[string, { desc: string; phone: string }], undefined>;
    lookup: ActorMethod<[string], [] | [{ desc: string; phone: string }]>;
}
