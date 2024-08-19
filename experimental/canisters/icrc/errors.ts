import { experimentalMessage } from '../../../src/lib/experimental/experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

import { nat, Record, text } from '../../';

export const BadFee = Record({
    expected_fee: nat
});
export type BadFee = typeof BadFee.tsType;

export const BadBurn = Record({
    min_burn_amount: nat
});
export type BadBurn = typeof BadBurn.tsType;

export const InsufficientFunds = Record({
    balance: nat
});
export type InsufficientFunds = typeof InsufficientFunds.tsType;

export const Duplicate = Record({
    duplicate_of: nat
});
export type Duplicate = typeof Duplicate.tsType;

export const GenericError = Record({
    error_code: nat,
    message: text
});
export type GenericError = typeof GenericError.tsType;
