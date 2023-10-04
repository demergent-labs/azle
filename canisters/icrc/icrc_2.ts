import { blob, nat, nat64, Null, Opt, Record, Variant } from '../../src/lib';

import {
    BadFee,
    BadBurn,
    InsufficientFunds,
    Duplicate,
    GenericError
} from './errors';
import { Account } from './icrc_1';

export const ApproveArgs = Record({
    from_subaccount: Opt(blob),
    spender: Account,
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

export const ApproveError = Variant({
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

export const TransferFromArgs = Record({
    from: Account,
    to: Account,
    amount: nat,
    fee: Opt(nat),
    memo: Opt(blob),
    created_at_time: Opt(nat64)
});

export const TransferFromError = Variant({
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

export const AllowanceArgs = Record({
    account: Account,
    spender: Account
});

export const ApproveResult = Variant({
    Ok: nat,
    Err: ApproveError
});

export const TransferFromResult = Variant({
    Ok: nat,
    Err: TransferFromError
});

export const AllowanceResult = Record({
    allowance: nat,
    expires_at: Opt(nat64)
});
