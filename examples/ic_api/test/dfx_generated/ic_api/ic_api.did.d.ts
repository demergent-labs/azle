import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
    caller: () => Promise<Principal>;
    canister_balance: () => Promise<bigint>;
    canister_balance128: () => Promise<bigint>;
    data_certificate: () => Promise<[] | [Array<number>]>;
    data_certificate_null: () => Promise<[] | [Array<number>]>;
    id: () => Promise<Principal>;
    print: (arg_0: string) => Promise<boolean>;
    reject: (arg_0: string) => Promise<string>;
    time: () => Promise<bigint>;
    trap: (arg_0: string) => Promise<boolean>;
}
