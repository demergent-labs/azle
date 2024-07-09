import { IDL } from '@dfinity/candid';

/**
 * Indicates an error was encountered during a canister method.
 */
export const RejectionCode = IDL.Variant({
    NoError: IDL.Null,
    SysFatal: IDL.Null,
    SysTransient: IDL.Null,
    DestinationInvalid: IDL.Null,
    CanisterReject: IDL.Null,
    CanisterError: IDL.Null,
    Unknown: IDL.Null
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
