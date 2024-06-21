import { IDL } from '../../src/lib/stable';

export const BadFee = IDL.Record({
    expected_fee: IDL.Nat
});
export type BadFee = {
    expected_fee: bigint;
};

export const BadBurn = IDL.Record({
    min_burn_amount: IDL.Nat
});
export type BadBurn = {
    min_burn_amount: bigint;
};

export const InsufficientFunds = IDL.Record({
    balance: IDL.Nat
});
export type InsufficientFunds = {
    balance: bigint;
};

export const Duplicate = IDL.Record({
    duplicate_of: IDL.Nat
});
export type Duplicate = {
    duplicate_of: bigint;
};

export const GenericError = IDL.Record({
    error_code: IDL.Nat,
    message: IDL.Text
});
export type GenericError = {
    error_code: bigint;
    message: string;
};
