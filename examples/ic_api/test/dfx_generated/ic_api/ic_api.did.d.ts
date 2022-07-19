import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    arg_data_raw: ActorMethod<
        [Array<number>, number, boolean, string],
        Array<number>
    >;
    arg_data_raw_size: ActorMethod<
        [Array<number>, number, boolean, string],
        number
    >;
    caller: ActorMethod<[], Principal>;
    canister_balance: ActorMethod<[], bigint>;
    canister_balance128: ActorMethod<[], bigint>;
    data_certificate: ActorMethod<[], [] | [Array<number>]>;
    data_certificate_null: ActorMethod<[], [] | [Array<number>]>;
    id: ActorMethod<[], Principal>;
    performance_counter: ActorMethod<[], bigint>;
    print: ActorMethod<[string], boolean>;
    reject: ActorMethod<[string], never>;
    set_certified_data: ActorMethod<[Array<number>], undefined>;
    time: ActorMethod<[], bigint>;
    trap: ActorMethod<[string], boolean>;
}
