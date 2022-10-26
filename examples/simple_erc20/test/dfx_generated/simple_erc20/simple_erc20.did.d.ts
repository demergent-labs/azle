import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    balance: ActorMethod<[string], bigint>;
    initialize_supply: ActorMethod<[string, string, string, bigint], boolean>;
    name: ActorMethod<[], string>;
    ticker: ActorMethod<[], string>;
    total_supply: ActorMethod<[], bigint>;
    transfer: ActorMethod<[string, string, bigint], boolean>;
}
