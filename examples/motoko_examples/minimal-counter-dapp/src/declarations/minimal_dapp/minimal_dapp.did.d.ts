import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
    count: () => Promise<bigint>;
    getCount: () => Promise<bigint>;
    reset: () => Promise<bigint>;
}
