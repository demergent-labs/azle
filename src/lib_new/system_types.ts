import { candid } from './index';
import { Null } from './primitives';
import { Result } from './result';
import { Variant } from './variant';

/**
 * Indicates an error was encountered during a canister method.
 */
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

// TODO we have decided to not use callresult or notifyresult
// TODO remove once we are more mature in the project
// TODO just keeping this so that we can see how to do a result
// TODO with a system method thing
// export const NotifyResult = Result(Null, RejectionCode);
// export type NotifyResult = Result<Null, RejectionCode>;
