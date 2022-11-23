import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Entry {
    key: string;
    value: bigint;
}
export interface _SERVICE {
    get_entries: ActorMethod<[], Array<Entry>>;
    set_entry: ActorMethod<[Entry], undefined>;
}
