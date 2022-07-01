import type { Principal } from '@dfinity/principal';
export type NotifyResult = { ok: null } | { err: string };
export type SendCyclesResult = { ok: bigint } | { err: string };
export type SendCyclesResult128 = { ok: bigint } | { err: string };
export interface _SERVICE {
    getCanisterBalance: () => Promise<bigint>;
    getCanisterBalance128: () => Promise<bigint>;
    sendCycles: () => Promise<SendCyclesResult>;
    sendCycles128: () => Promise<SendCyclesResult128>;
    sendCycles128Notify: () => Promise<NotifyResult>;
    sendCyclesNotify: () => Promise<NotifyResult>;
}
