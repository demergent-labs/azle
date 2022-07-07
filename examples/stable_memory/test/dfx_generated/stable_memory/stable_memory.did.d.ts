import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
    stable64_size: () => Promise<bigint>;
    stable_size: () => Promise<number>;
}
