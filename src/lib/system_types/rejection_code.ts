import { Variant } from '../candid/types/constructed/variant';
import { Null } from '../candid/types/primitive/null';

/**
 * Indicates an error was encountered during a canister method.
 */
export const RejectionCode = Variant({
    NoError: Null,
    SysFatal: Null,
    SysTransient: Null,
    DestinationInvalid: Null,
    CanisterReject: Null,
    CanisterError: Null,
    Unknown: Null
});
