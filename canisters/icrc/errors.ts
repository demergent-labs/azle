import { nat, Record, text } from '../../src/lib';

export const BadFee = Record({
    expected_fee: nat
});

export const BadBurn = Record({
    min_burn_amount: nat
});

export const InsufficientFunds = Record({
    balance: nat
});

export const Duplicate = Record({
    duplicate_of: nat
});

export const GenericError = Record({
    error_code: nat,
    message: text
});
