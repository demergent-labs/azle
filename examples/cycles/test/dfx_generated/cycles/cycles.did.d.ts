import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    get_canister_balance: ActorMethod<[], bigint>;
    get_canister_balance128: ActorMethod<[], bigint>;
    receive_cycles: ActorMethod<[], bigint>;
    receive_cycles128: ActorMethod<[], bigint>;
}
