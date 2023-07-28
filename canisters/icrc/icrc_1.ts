import {
    blob,
    int,
    nat,
    nat64,
    Opt,
    Principal,
    Record,
    text,
    Variant
} from '../../src/lib';

// Number of nanoseconds since the UNIX epoch in UTC timezone.
export type ICRC1Timestamp = nat64;

export type ICRC1Subaccount = blob;

export type ICRC1Account = Record<{
    owner: Principal;
    subaccount: Opt<ICRC1Subaccount>;
}>;

export type ICRC1TransferArgs = Record<{
    from_subaccount: Opt<ICRC1Subaccount>;
    to: ICRC1Account;
    amount: nat;
    fee: Opt<nat>;
    memo: Opt<blob>;
    created_at_time: Opt<ICRC1Timestamp>;
}>;

export type ICRC1TransferError = Variant<{
    BadFee: Record<{ expected_fee: nat }>;
    BadBurn: Record<{ min_burn_amount: nat }>;
    InsufficientFunds: Record<{ balance: nat }>;
    TooOld: null;
    CreatedInFuture: Record<{ ledger_time: ICRC1Timestamp }>;
    Duplicate: Record<{ duplicate_of: nat }>;
    TemporarilyUnavailable: null;
    GenericError: Record<{ error_code: nat; message: text }>;
}>;

export type ICRC1Value = Variant<{
    Nat: nat;
    Int: int;
    Text: text;
    Blob: blob;
}>;
