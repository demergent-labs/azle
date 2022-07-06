import type { Principal } from '@dfinity/principal';
export type Stable64GrowResult = { ok: bigint } | { err: StableMemoryError };
export type StableGrowResult = { ok: number } | { err: StableMemoryError };
export type StableMemoryError = { OutOfBounds: null } | { OutOfMemory: null };
export interface _SERVICE {
    stable64_grow: (arg_0: bigint) => Promise<Stable64GrowResult>;
    stable64_read: (arg_0: bigint, arg_1: bigint) => Promise<Array<number>>;
    stable64_size: () => Promise<bigint>;
    stable64_write: (arg_0: bigint, arg_1: Array<number>) => Promise<undefined>;
    stable_bytes: () => Promise<Array<number>>;
    stable_grow: (arg_0: number) => Promise<StableGrowResult>;
    stable_read: (arg_0: number, arg_1: number) => Promise<Array<number>>;
    stable_size: () => Promise<number>;
    stable_write: (arg_0: number, arg_1: Array<number>) => Promise<undefined>;
}
