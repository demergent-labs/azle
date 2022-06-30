import type { Principal } from '@dfinity/principal';
export interface Account {
    id: string;
    balance: bigint;
}
export interface AccountArgs {
    id: string;
}
export interface _SERVICE {
    account: (arg_0: AccountArgs) => Promise<[] | [Account]>;
    accounts: () => Promise<Array<Account>>;
    balance: (arg_0: string) => Promise<bigint>;
    get_notification: () => Promise<string>;
    receive_notification: (arg_0: string) => Promise<undefined>;
    transfer: (arg_0: string, arg_1: string, arg_2: bigint) => Promise<bigint>;
    trap: () => Promise<string>;
}
