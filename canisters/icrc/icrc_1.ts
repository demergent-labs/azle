import {
    blob,
    int,
    nat,
    nat64,
    Null,
    Opt,
    Principal,
    Record,
    text,
    Variant
} from '../../src/lib';
import {
    BadBurn,
    BadFee,
    Duplicate,
    GenericError,
    InsufficientFunds
} from './errors';

// Number of nanoseconds since the UNIX epoch in UTC timezone.
export const Timestamp = nat64;
export type Timestamp = nat64;

export const Subaccount = blob;
export type Subaccount = blob;

export const Account = Record({
    owner: Principal,
    subaccount: Opt(Subaccount)
});
export type Account = typeof Account.tsType;

export const TransferArgs = Record({
    from_subaccount: Opt(Subaccount),
    to: Account,
    amount: nat,
    fee: Opt(nat),
    memo: Opt(blob),
    created_at_time: Opt(Timestamp)
});
export type TransferArgs = typeof TransferArgs.tsType;

export const CreatedInFuture = Record({
    ledger_time: Timestamp
});
export type CreatedInFuture = typeof CreatedInFuture.tsType;

export const TransferError = Variant({
    BadFee,
    BadBurn,
    InsufficientFunds,
    TooOld: Null,
    CreatedInFuture: CreatedInFuture,
    Duplicate: Duplicate,
    TemporarilyUnavailable: Null,
    GenericError: GenericError
});
export type TransferError = typeof TransferError.tsType;

export const TransferResult = Variant({
    Ok: nat,
    Err: TransferError
});
export type TransferResult = typeof TransferResult.tsType;

export const Value = Variant({
    Nat: nat,
    Int: int,
    Text: text,
    Blob: blob
});
export type Value = typeof Value.tsType;
