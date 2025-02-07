import '../../../src/lib/experimental/experimental';

import { Record } from '../../../src/lib/experimental/candid/types/constructed/record';
import { nat } from '../../../src/lib/experimental/candid/types/primitive/nats/nat';
import { text } from '../../../src/lib/experimental/candid/types/primitive/text';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const BadFee = Record({
    expected_fee: nat
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type BadFee = typeof BadFee.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const BadBurn = Record({
    min_burn_amount: nat
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type BadBurn = typeof BadBurn.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const InsufficientFunds = Record({
    balance: nat
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type InsufficientFunds = typeof InsufficientFunds.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Duplicate = Record({
    duplicate_of: nat
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Duplicate = typeof Duplicate.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const GenericError = Record({
    error_code: nat,
    message: text
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type GenericError = typeof GenericError.tsType;
