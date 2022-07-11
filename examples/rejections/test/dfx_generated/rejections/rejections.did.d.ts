import type { Principal } from '@dfinity/principal';
export type GetResultResult = { ok: null } | { err: string };
export type Outcome = { Reject: null } | { Accept: null };
export type RejectionCode =
    | { NoError: null }
    | { CanisterError: null }
    | { SysTransient: null }
    | { DestinationInvalid: null }
    | { Unknown: null }
    | { SysFatal: null }
    | { CanisterReject: null };
export interface _SERVICE {
    getRejectionCodeCanisterError: () => Promise<RejectionCode>;
    getRejectionCodeCanisterReject: () => Promise<RejectionCode>;
    getRejectionCodeDestinationInvalid: () => Promise<RejectionCode>;
    getRejectionCodeNoError: () => Promise<RejectionCode>;
    getRejectionMessage: (arg_0: string) => Promise<string>;
    getResult: (arg_0: Outcome, arg_1: string) => Promise<GetResultResult>;
}
