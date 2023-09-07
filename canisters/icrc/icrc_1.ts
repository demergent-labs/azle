import {
    blob,
    candid,
    int,
    nat,
    nat64,
    Null,
    Opt,
    principal,
    Principal,
    Record,
    text,
    Variant
} from '../../src/lib_new';
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

export class ICRC1Account extends Record {
    @candid(principal)
    owner: Principal;

    @candid(Opt(ICRC1Subaccount))
    subaccount: Opt<ICRC1Subaccount>;
}

export class ICRC1TransferArgs extends Record {
    @candid(Opt(ICRC1Subaccount))
    from_subaccount: Opt<ICRC1Subaccount>;

    @candid(ICRC1Account)
    to: ICRC1Account;

    @candid(nat)
    amount: nat;

    @candid(Opt(nat))
    fee: Opt<nat>;

    @candid(Opt(blob))
    memo: Opt<blob>;

    @candid(Opt(ICRC1Timestamp))
    created_at_time: Opt<ICRC1Timestamp>;
}

class CreatedInFuture extends Record {
    @candid(ICRC1Timestamp)
    ledger_time: ICRC1Timestamp;
}

export class ICRC1TransferError extends Variant {
    @candid(BadFee)
    BadFee: BadFee;

    @candid(BadBurn)
    BadBurn: BadBurn;

    @candid(InsufficientFunds)
    InsufficientFunds: InsufficientFunds;

    @candid(Null)
    TooOld: Null;

    @candid(CreatedInFuture)
    CreatedInFuture: CreatedInFuture;

    @candid(Duplicate)
    Duplicate: Duplicate;

    @candid(Null)
    TemporarilyUnavailable: Null;

    @candid(GenericError)
    GenericError: GenericError;
}

export class ICRC1TransferResult extends Variant {
    @candid(nat)
    Ok: nat;

    @candid(ICRC1TransferError)
    Err: ICRC1TransferError;
}

export class ICRC1Value extends Variant {
    @candid(nat)
    Nat: nat;

    @candid(int)
    Int: int;

    @candid(text)
    Text: text;

    @candid(blob)
    Blob: blob;
}
