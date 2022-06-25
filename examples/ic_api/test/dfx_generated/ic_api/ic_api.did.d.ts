import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    caller: ActorMethod<[], Principal>;
    canister_balance: ActorMethod<[], bigint>;
    canister_balance128: ActorMethod<[], bigint>;
    data_certificate: ActorMethod<[], [] | [Array<number>]>;
    data_certificate_null: ActorMethod<[], [] | [Array<number>]>;
    id: ActorMethod<[], Principal>;
    performance_counter: ActorMethod<[], bigint>;
    print: ActorMethod<[string], boolean>;
    time: ActorMethod<[], bigint>;
    trap: ActorMethod<[string], boolean>;
}
