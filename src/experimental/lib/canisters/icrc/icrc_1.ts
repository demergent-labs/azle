import '#experimental/lib/assert_experimental';

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
} from '#experimental/lib/index';

import {
    BadBurn,
    BadFee,
    Duplicate,
    GenericError,
    InsufficientFunds
} from './errors';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// Number of nanoseconds since the UNIX epoch in UTC timezone.
export const Timestamp = nat64;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Timestamp = nat64;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Subaccount = blob;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Subaccount = blob;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Account = Record({
    owner: Principal,
    subaccount: Opt(Subaccount)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Account = typeof Account.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const TransferArgs = Record({
    from_subaccount: Opt(Subaccount),
    to: Account,
    amount: nat,
    fee: Opt(nat),
    memo: Opt(blob),
    created_at_time: Opt(Timestamp)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferArgs = typeof TransferArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const CreatedInFuture = Record({
    ledger_time: Timestamp
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CreatedInFuture = typeof CreatedInFuture.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
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
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferError = typeof TransferError.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const TransferResult = Variant({
    Ok: nat,
    Err: TransferError
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferResult = typeof TransferResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Value = Variant({
    Nat: nat,
    Int: int,
    Text: text,
    Blob: blob
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Value = typeof Value.tsType;
