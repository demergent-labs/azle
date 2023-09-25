import { RequireExactlyOne } from './variant';

/**
 * Indicates an error was encountered during a canister method.
 */
export type RejectionCode = RequireExactlyOne<{
    NoError: null;
    SysFatal: null;
    SysTransient: null;
    DestinationInvalid: null;
    CanisterReject: null;
    CanisterError: null;
    Unknown: null;
}>;

// TODO we have decided to not use callresult or notifyresult
// TODO remove once we are more mature in the project
// TODO just keeping this so that we can see how to do a result
// TODO with a system method thing
// export const NotifyResult = Result(Null, RejectionCode);
// export type NotifyResult = Result<Null, RejectionCode>;
