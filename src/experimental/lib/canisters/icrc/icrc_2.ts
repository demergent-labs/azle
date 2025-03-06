import '#experimental/lib/assert_experimental';

import { blob } from '#experimental/lib/candid/types/constructed/blob';
import { Opt } from '#experimental/lib/candid/types/constructed/opt';
import { Record } from '#experimental/lib/candid/types/constructed/record';
import { Variant } from '#experimental/lib/candid/types/constructed/variant';
import { nat } from '#experimental/lib/candid/types/primitive/nats/nat';
import { nat64 } from '#experimental/lib/candid/types/primitive/nats/nat64';
import { Null } from '#experimental/lib/candid/types/primitive/null';

import {
    BadBurn,
    BadFee,
    Duplicate,
    GenericError,
    InsufficientFunds
} from './errors';
import { Account, CreatedInFuture } from './icrc_1';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
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
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type ApproveArgs = typeof ApproveArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const AllowanceChanged = Record({
    current_allowance: nat
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type AllowanceChanged = typeof AllowanceChanged.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Expired = Record({
    ledger_time: nat64
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Expired = typeof Expired.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const InsufficientAllowance = Record({
    allowance: nat
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type InsufficientAllowance = typeof InsufficientAllowance.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
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
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type ApproveError = typeof ApproveError.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const TransferFromArgs = Record({
    spender_subaccount: Opt(blob),
    from: Account,
    to: Account,
    amount: nat,
    fee: Opt(nat),
    memo: Opt(blob),
    created_at_time: Opt(nat64)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferFromArgs = typeof TransferFromArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
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
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferFromError = typeof TransferFromError.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const AllowanceArgs = Record({
    account: Account,
    spender: Account
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type AllowanceArgs = typeof AllowanceArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const ApproveResult = Variant({
    Ok: nat,
    Err: ApproveError
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type ApproveResult = typeof ApproveResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const TransferFromResult = Variant({
    Ok: nat,
    Err: TransferFromError
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferFromResult = typeof TransferFromResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const AllowanceResult = Record({
    allowance: nat,
    expires_at: Opt(nat64)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type AllowanceResult = typeof AllowanceResult.tsType;
