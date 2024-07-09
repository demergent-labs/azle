import { IDL, Principal } from '../../src/lib/stable';
import {
    BadBurn,
    BadFee,
    Duplicate,
    GenericError,
    InsufficientFunds
} from './errors';

// Number of nanoseconds since the UNIX epoch in UTC timezone.
export const Timestamp = IDL.Nat64;
export type Timestamp = bigint;

export const Subaccount = IDL.Vec(IDL.Nat8);
export type Subaccount = Uint8Array;

export const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(Subaccount)
});
export type Account = {
    owner: Principal;
    subaccount: [Subaccount] | [];
};

export const TransferArgs = IDL.Record({
    from_subaccount: IDL.Opt(Subaccount),
    to: Account,
    amount: IDL.Nat,
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(Timestamp)
});
export type TransferArgs = {
    from_subaccount: [Subaccount] | [];
    to: Account;
    amount: bigint;
    fee: [bigint] | [];
    memo: [Uint8Array] | [];
    created_at_time: [Timestamp] | [];
};

export const CreatedInFuture = IDL.Record({
    ledger_time: Timestamp
});
export type CreatedInFuture = {
    ledger_time: Timestamp;
};

export const TransferError = IDL.Variant({
    BadFee,
    BadBurn,
    InsufficientFunds,
    TooOld: IDL.Null,
    CreatedInFuture: CreatedInFuture,
    Duplicate: Duplicate,
    TemporarilyUnavailable: IDL.Null,
    GenericError: GenericError
});
export type TransferError =
    | {
          BadFee: BadFee;
      }
    | {
          BadBurn: BadBurn;
      }
    | {
          InsufficientFunds: InsufficientFunds;
      }
    | {
          TooOld: null;
      }
    | {
          CreatedInFuture: CreatedInFuture;
      }
    | {
          Duplicate: Duplicate;
      }
    | {
          TemporarilyUnavailable: null;
      }
    | {
          GenericError: GenericError;
      };

export const TransferResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: TransferError
});
export type TransferResult = { Ok: bigint } | { Err: TransferError };

export const Value = IDL.Variant({
    Nat: IDL.Nat,
    Int: IDL.Int,
    Text: IDL.Text,
    Blob: IDL.Vec(IDL.Nat8)
});
export type Value =
    | {
          Nat: bigint;
      }
    | {
          Int: bigint;
      }
    | {
          Text: string;
      }
    | {
          Blob: Uint8Array;
      };
