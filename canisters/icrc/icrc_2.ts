import {
    blob,
    nat,
    nat64,
    Null,
    Opt,
    Principal,
    Record,
    Variant
} from '../../src/lib_functional';

import {
    BadFee,
    BadBurn,
    InsufficientFunds,
    Duplicate,
    GenericError
} from './errors';

export const ICRC2Account = Record({
    owner: Principal,
    subaccount: Opt(blob)
});

export const ICRC2ApproveArgs = Record({
    from_subaccount: Opt(blob),
    spender: ICRC2Account,
    amount: nat,
    expected_allowance: Opt(nat),
    expires_at: Opt(nat64),
    fee: Opt(nat),
    memo: Opt(blob),
    created_at_time: Opt(nat64)
});

export const AllowanceChanged = Record({
    current_allowance: nat
});

export const Expired = Record({
    ledger_time: nat64
});

export const CreatedInFuture = Record({
    ledger_time: nat64
});

export const InsufficientAllowance = Record({
    allowance: nat
});

export const ICRC2ApproveError = Variant({
    BadFee,
    InsufficientFunds,
    AllowanceChanged,
    Expired,
    TooOld: Null,
    CreatedInFuture,
    Duplicate,
    TemporarilyUnavailable: Null,
    GenericError: GenericError
});

export const ICRC2TransferFromArgs = Record({
    from: ICRC2Account,
    to: ICRC2Account,
    amount: nat,
    fee: Opt(nat),
    memo: Opt(blob),
    created_at_time: Opt(nat64)
});

export const ICRC2TransferFromError = Variant({
    BadFee,
    BadBurn,
    InsufficientFunds,
    InsufficientAllowance,
    TooOld: Null,
    CreatedInFuture,
    Duplicate,
    TemporarilyUnavailable: Null,
    GenericError
});

export const ICRC2AllowanceArgs = Record({
    account: ICRC2Account,
    spender: ICRC2Account
});

export const ICRC2ApproveResult = Variant({
    Ok: nat,
    Err: ICRC2ApproveError
});

export const ICRC2TransferFromResult = Variant({
    Ok: nat,
    Err: ICRC2TransferFromError
});

export const ICRC2AllowanceResults = Record({
    allowance: nat,
    expires_at: Opt(nat64)
});
