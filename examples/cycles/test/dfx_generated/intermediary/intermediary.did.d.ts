import type { Principal } from '@dfinity/principal';
export type ReportRefundResult = { ok: bigint } | { err: string };
export type ReportRefundResult128 = { ok: bigint } | { err: string };
export interface _SERVICE {
    reportRefund: () => Promise<ReportRefundResult>;
    reportRefund128: () => Promise<ReportRefundResult128>;
}
