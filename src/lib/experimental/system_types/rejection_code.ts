import '../experimental';

import { Variant } from '../candid/types/constructed/variant';
import { Null } from '../candid/types/primitive/null';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
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
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type RejectionCode = typeof RejectionCode.tsType;
