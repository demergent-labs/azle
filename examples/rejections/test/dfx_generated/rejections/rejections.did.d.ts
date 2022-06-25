import type { Principal } from '@dfinity/principal';
export type RejectCodeResult = { ok: RejectionCode } | { err: string };
export type RejectionCode =
    | { NoError: null }
    | { CanisterError: null }
    | { SysTransient: null }
    | { DestinationInvalid: null }
    | { Unknown: null }
    | { SysFatal: null }
    | { CanisterReject: null };
export interface _SERVICE {
    getRejectionCodeCanisterError: () => Promise<RejectCodeResult>;
    getRejectionCodeCanisterReject: (
        arg_0: string
    ) => Promise<RejectCodeResult>;
    getRejectionCodeDestinationInvalid: () => Promise<RejectCodeResult>;
    getRejectionCodeNoError: () => Promise<RejectCodeResult>;
}
