import type { Principal } from '@dfinity/principal';
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
}
