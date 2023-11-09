import { blob, nat, nat64, Null, Opt, Record, Variant } from '../../src/lib';

import {
    BadFee,
    BadBurn,
    InsufficientFunds,
    Duplicate,
    GenericError
} from './errors';
import { Account, CreatedInFuture } from './icrc_1';

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
export type ApproveArgs = typeof ApproveArgs.tsType;

export const AllowanceChanged = Record({
    current_allowance: nat
});
export type AllowanceChanged = typeof AllowanceChanged.tsType;

export const Expired = Record({
    ledger_time: nat64
});
export type Expired = typeof Expired.tsType;

export const InsufficientAllowance = Record({
    allowance: nat
});
export type InsufficientAllowance = typeof InsufficientAllowance.tsType;

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
export type ApproveError = typeof ApproveError.tsType;

export const TransferFromArgs = Record({
    from: Account,
    to: Account,
    amount: nat,
    fee: Opt(nat),
    memo: Opt(blob),
    created_at_time: Opt(nat64)
});
export type TransferFromArgs = typeof TransferFromArgs.tsType;

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
export type TransferFromError = typeof TransferFromError.tsType;

export const AllowanceArgs = Record({
    account: Account,
    spender: Account
});
export type AllowanceArgs = typeof AllowanceArgs.tsType;

export const ApproveResult = Variant({
    Ok: nat,
    Err: ApproveError
});
export type ApproveResult = typeof ApproveResult.tsType;

export const TransferFromResult = Variant({
    Ok: nat,
    Err: TransferFromError
});
export type TransferFromResult = typeof TransferFromResult.tsType;

export const AllowanceResult = Record({
    allowance: nat,
    expires_at: Opt(nat64)
});
export type AllowanceResult = typeof AllowanceResult.tsType;
