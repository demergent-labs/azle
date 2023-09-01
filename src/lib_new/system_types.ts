import { candid } from './index';
import { Null } from './primitives';
import { Result } from './result';
import { variant, Variant } from './variant';

/**
 * Indicates an error was encountered during a canister method.
 */
@variant
export class RejectionCode extends Variant {
    @candid(Null)
    NoError?: null;

    @candid(Null)
    SysFatal?: null;

    @candid(Null)
    SysTransient?: null;

    @candid(Null)
    DestinationInvalid?: null;

    @candid(Null)
    CanisterReject?: null;

    @candid(Null)
    CanisterError?: null;

    @candid(Null)
    Unknown?: null;
}

export const NotifyResult = Result(Null, RejectionCode.getIDL());
export type NotifyResult = Result<Null, RejectionCode>;
