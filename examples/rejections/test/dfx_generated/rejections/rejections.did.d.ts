import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type RejectionCode =
    | { NoError: null }
    | { CanisterError: null }
    | { SysTransient: null }
    | { DestinationInvalid: null }
    | { Unknown: null }
    | { SysFatal: null }
    | { CanisterReject: null };
export interface _SERVICE {
    get_rejection_code_canister_error: ActorMethod<[], RejectionCode>;
    get_rejection_code_canister_reject: ActorMethod<[], RejectionCode>;
    get_rejection_code_destination_invalid: ActorMethod<[], RejectionCode>;
    get_rejection_code_no_error: ActorMethod<[], RejectionCode>;
    get_rejection_message: ActorMethod<[string], string>;
}
