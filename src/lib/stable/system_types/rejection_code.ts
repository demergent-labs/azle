import { IDL } from '..';

/**
 * Indicates an error was encountered during a canister method.
 */
export const RejectionCode = IDL.Variant({
    NoError: IDL.Null
    // TODO we are getting some sort of error when all of these are added in. It
    // is happening during what looks like a sort of the properties (which might
    // explain why one is fine (it doesn't need to be sorted)). The error is
    // ReferenceError: 'TextEncoder' is not defined
    // SysFatal: IDL.Null,
    // SysTransient: IDL.Null,
    // DestinationInvalid: IDL.Null
    // CanisterReject: IDL.Null,
    // CanisterError: IDL.Null,
    // Unknown: IDL.Null,
});

export type RejectionCode =
    | {
          NoError: null;
      }
    | {
          SysFatal: null;
      }
    | {
          SysTransient: null;
      }
    | {
          DestinationInvalid: null;
      }
    | {
          CanisterReject: null;
      }
    | {
          CanisterError: null;
      }
    | {
          Unknown: null;
      };
