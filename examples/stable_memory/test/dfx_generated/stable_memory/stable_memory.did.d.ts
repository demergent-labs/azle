import type { Principal } from '@dfinity/principal';
export type Stable64GrowResult = { ok: bigint } | { err: StableMemoryError };
export type StableGrowResult = { ok: number } | { err: StableMemoryError };
export type StableMemoryError = { OutOfBounds: null } | { OutOfMemory: null };
export interface _SERVICE {
    stable64_grow: (arg_0: bigint) => Promise<Stable64GrowResult>;
    stable64_size: () => Promise<bigint>;
    stable_grow: (arg_0: number) => Promise<StableGrowResult>;
    stable_size: () => Promise<number>;
    stable_write: (arg_0: number, arg_1: Array<number>) => Promise<undefined>;
}
