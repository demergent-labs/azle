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
} from '../../src/lib_functional';
import {
    BadBurn,
    BadFee,
    Duplicate,
    GenericError,
    InsufficientFunds
} from './errors';

// Number of nanoseconds since the UNIX epoch in UTC timezone.
export type ICRC1Timestamp = nat64;
export const ICRC1Timestamp = nat64;

export type ICRC1Subaccount = blob;
export const ICRC1Subaccount = blob;

export const ICRC1Account = Record({
    owner: Principal,
    subaccount: Opt(ICRC1Subaccount)
});

export const ICRC1TransferArgs = Record({
    from_subaccount: Opt(ICRC1Subaccount),
    to: ICRC1Account,
    amount: nat,
    fee: Opt(nat),
    memo: Opt(blob),
    created_at_time: Opt(ICRC1Timestamp)
});

const CreatedInFuture = Record({
    ledger_time: ICRC1Timestamp
});

export const ICRC1TransferError = Variant({
    BadFee,
    BadBurn,
    InsufficientFunds,
    TooOld: Null,
    CreatedInFuture: CreatedInFuture,
    Duplicate: Duplicate,
    TemporarilyUnavailable: Null,
    GenericError: GenericError
});

export const ICRC1TransferResult = Variant({
    Ok: nat,
    Err: ICRC1TransferError
});

export const ICRC1Value = Variant({
    Nat: nat,
    Int: int,
    Text: text,
    Blob: blob
});
