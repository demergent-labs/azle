import type { Principal } from '@dfinity/principal';
export type StableGrowResult = { ok: number } | { err: StableMemoryError };
export type StableMemoryError = { OutOfBounds: null } | { OutOfMemory: null };
export interface _SERVICE {
    stable64_size: () => Promise<bigint>;
    stable_grow: (arg_0: number) => Promise<StableGrowResult>;
    stable_size: () => Promise<number>;
}
