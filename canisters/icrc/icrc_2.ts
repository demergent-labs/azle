import { IDL } from '../../src/lib/stable';
import {
    BadBurn,
    BadFee,
    Duplicate,
    GenericError,
    InsufficientFunds
} from './errors';
import { Account, CreatedInFuture } from './icrc_1';

export const ApproveArgs = IDL.Record({
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    spender: Account,
    amount: IDL.Nat,
    expected_allowance: IDL.Opt(IDL.Nat),
    expires_at: IDL.Opt(IDL.Nat64),
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64)
});
export type ApproveArgs = {
    from_subaccount: [Uint8Array] | [];
    spender: Account;
    amount: bigint;
    expected_allowance: [bigint] | [];
    expires_at: [bigint] | [];
    fee: [bigint] | [];
    memo: [Uint8Array] | [];
    created_at_time: [bigint] | [];
};

export const AllowanceChanged = IDL.Record({
    current_allowance: IDL.Nat
});
export type AllowanceChanged = {
    current_allowance: bigint;
};

export const Expired = IDL.Record({
    ledger_time: IDL.Nat64
});
export type Expired = {
    ledger_time: bigint;
};

export const InsufficientAllowance = IDL.Record({
    allowance: IDL.Nat
});
export type InsufficientAllowance = {
    allowance: bigint;
};

export const ApproveError = IDL.Variant({
    BadFee,
    InsufficientFunds,
    AllowanceChanged,
    Expired,
    TooOld: IDL.Null,
    CreatedInFuture,
    Duplicate,
    TemporarilyUnavailable: IDL.Null,
    GenericError: GenericError
});
export type ApproveError =
    | {
          BadFee: BadFee;
      }
    | {
          InsufficientFunds: InsufficientFunds;
      }
    | {
          AllowanceChanged: AllowanceChanged;
      }
    | {
          Expired: Expired;
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

export const TransferFromArgs = IDL.Record({
    spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from: Account,
    to: Account,
    amount: IDL.Nat,
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64)
});
export type TransferFromArgs = {
    spender_subaccount: [Uint8Array] | [];
    from: Account;
    to: Account;
    amount: bigint;
    fee: [bigint] | [];
    memo: [Uint8Array] | [];
    created_at_time: [bigint] | [];
};

export const TransferFromError = IDL.Variant({
    BadFee,
    BadBurn,
    InsufficientFunds,
    InsufficientAllowance,
    TooOld: IDL.Null,
    CreatedInFuture,
    Duplicate,
    TemporarilyUnavailable: IDL.Null,
    GenericError
});
export type TransferFromError =
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
          InsufficientAllowance: InsufficientAllowance;
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

export const AllowanceArgs = IDL.Record({
    account: Account,
    spender: Account
});
export type AllowanceArgs = {
    account: Account;
    spender: Account;
};

export const ApproveResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: ApproveError
});
export type ApproveResult =
    | {
          Ok: bigint;
      }
    | {
          Err: ApproveError;
      };

export const TransferFromResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: TransferFromError
});
export type TransferFromResult =
    | {
          Ok: bigint;
      }
    | {
          Err: TransferFromError;
      };

export const AllowanceResult = IDL.Record({
    allowance: IDL.Nat,
    expires_at: IDL.Opt(IDL.Nat64)
});
export type AllowanceResult = {
    allowance: bigint;
    expires_at: [bigint] | [];
};
