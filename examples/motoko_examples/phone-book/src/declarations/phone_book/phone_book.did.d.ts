import type { ActorMethod } from '@dfinity/agent';
import type { Principal } from '@dfinity/principal';

export interface _SERVICE {
    insert: ActorMethod<[string, { desc: string; phone: string }], undefined>;
    lookup: ActorMethod<[string], [] | [{ desc: string; phone: string }]>;
}
