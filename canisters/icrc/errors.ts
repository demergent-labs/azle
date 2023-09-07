import { candid, nat, Record, text } from '../../src/lib_new';

export class BadFee extends Record {
    @candid(nat)
    expected_fee: nat;
}
export class BadBurn extends Record {
    @candid(nat)
    min_burn_amount: nat;
}
export class InsufficientFunds extends Record {
    @candid(nat)
    balance: nat;
}
export class Duplicate extends Record {
    @candid(nat)
    duplicate_of: nat;
}
export class GenericError extends Record {
    @candid(nat)
    error_code: nat;

    @candid(text)
    message: text;
}
