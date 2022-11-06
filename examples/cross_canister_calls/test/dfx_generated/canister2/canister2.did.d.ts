import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
    id: string;
    balance: bigint;
}
export interface AccountArgs {
    id: string;
}
export interface _SERVICE {
    account: ActorMethod<[AccountArgs], [] | [Account]>;
    accounts: ActorMethod<[], Array<Account>>;
    balance: ActorMethod<[string], bigint>;
    get_notification: ActorMethod<[], string>;
    receive_notification: ActorMethod<[string], undefined>;
    transfer: ActorMethod<[string, string, bigint], bigint>;
    trap: ActorMethod<[], string>;
}
