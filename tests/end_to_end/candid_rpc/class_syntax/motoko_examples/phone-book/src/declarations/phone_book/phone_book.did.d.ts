import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
    insert: ActorMethod<[string, { desc: string; phone: string }], undefined>;
    lookup: ActorMethod<[string], [] | [{ desc: string; phone: string }]>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
