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
export type Timestamp = nat64;
export const Timestamp = nat64;

export type Subaccount = blob;
export const Subaccount = blob;

export const Account = Record({
    owner: Principal,
    subaccount: Opt(Subaccount)
});

export const TransferArgs = Record({
    from_subaccount: Opt(Subaccount),
    to: Account,
    amount: nat,
    fee: Opt(nat),
    memo: Opt(blob),
    created_at_time: Opt(Timestamp)
});

const CreatedInFuture = Record({
    ledger_time: Timestamp
});

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

export const TransferResult = Variant({
    Ok: nat,
    Err: TransferError
});

export const Value = Variant({
    Nat: nat,
    Int: int,
    Text: text,
    Blob: blob
});
