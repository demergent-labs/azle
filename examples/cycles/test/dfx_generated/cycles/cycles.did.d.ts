import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
    getCanisterBalance: () => Promise<bigint>;
    getCanisterBalance128: () => Promise<bigint>;
    receiveCycles: () => Promise<bigint>;
    receiveCycles128: () => Promise<bigint>;
}
