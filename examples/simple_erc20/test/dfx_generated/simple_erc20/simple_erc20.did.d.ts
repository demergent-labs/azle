import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
    balance: (arg_0: string) => Promise<bigint>;
    initializeSupply: (
        arg_0: string,
        arg_1: string,
        arg_2: bigint,
        arg_3: string
    ) => Promise<boolean>;
    name: () => Promise<string>;
    ticker: () => Promise<string>;
    totalSupply: () => Promise<bigint>;
    transfer: (arg_0: string, arg_1: string, arg_2: bigint) => Promise<boolean>;
}
