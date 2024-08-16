import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
    getTimerEnded: ActorMethod<[], boolean>;
    getTimerInstructions: ActorMethod<[], bigint>;
    getTimerStarted: ActorMethod<[], boolean>;
    measureSum: ActorMethod<[number, boolean], bigint>;
    measureSumTimer: ActorMethod<[number, boolean], undefined>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
