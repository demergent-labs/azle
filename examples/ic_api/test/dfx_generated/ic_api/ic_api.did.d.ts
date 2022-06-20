import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
    caller: () => Promise<Principal>;
    canister_balance: () => Promise<bigint>;
    canister_balance128: () => Promise<bigint>;
    id: () => Promise<Principal>;
    print: (arg_0: string) => Promise<boolean>;
    time: () => Promise<bigint>;
    trap: (arg_0: string) => Promise<boolean>;
}
