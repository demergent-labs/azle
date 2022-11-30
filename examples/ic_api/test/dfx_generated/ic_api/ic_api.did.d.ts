import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    arg_data_raw: ActorMethod<
        [Uint8Array, number, boolean, string],
        Uint8Array
    >;
    arg_data_raw_size: ActorMethod<
        [Uint8Array, number, boolean, string],
        number
    >;
    caller: ActorMethod<[], Principal>;
    canister_balance: ActorMethod<[], bigint>;
    canister_balance128: ActorMethod<[], bigint>;
    data_certificate: ActorMethod<[], [] | [Uint8Array]>;
    data_certificate_null: ActorMethod<[], [] | [Uint8Array]>;
    id: ActorMethod<[], Principal>;
    performance_counter: ActorMethod<[], bigint>;
    print: ActorMethod<[string], boolean>;
    reject: ActorMethod<[string], never>;
    set_certified_data: ActorMethod<[Uint8Array], undefined>;
    time: ActorMethod<[], bigint>;
    trap: ActorMethod<[string], boolean>;
}
