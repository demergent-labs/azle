import {
    blob,
    candid,
    nat,
    nat64,
    Null,
    Opt,
    principal,
    Principal,
    Record,
    text,
    Variant
} from '../../src/lib_new';

import {
    BadFee,
    BadBurn,
    InsufficientFunds,
    Duplicate,
    GenericError
} from './errors';

export class ICRC2Account extends Record {
    @candid(principal)
    owner: Principal;

    @candid(Opt(blob))
    subaccount: Opt<blob>;
}

export class ICRC2ApproveArgs extends Record {
    @candid(Opt(blob))
    from_subaccount: Opt<blob>;

    @candid(ICRC2Account)
    spender: ICRC2Account;

    @candid(nat)
    amount: nat;

    @candid(Opt(nat))
    expected_allowance: Opt<nat>;

    @candid(Opt(nat64))
    expires_at: Opt<nat64>;

    @candid(Opt(nat))
    fee: Opt<nat>;

    @candid(Opt(blob))
    memo: Opt<blob>;

    @candid(Opt(nat64))
    created_at_time: Opt<nat64>;
}

class AllowanceChanged extends Record {
    @candid(nat)
    current_allowance: nat;
}
class Expired extends Record {
    @candid(nat64)
    ledger_time: nat64;
}
class CreatedInFuture extends Record {
    @candid(nat64)
    ledger_time: nat64;
}
class InsufficientAllowance extends Record {
    @candid(nat)
    allowance: nat;
}

export class ICRC2ApproveError extends Variant {
    @candid(BadFee)
    BadFee: BadFee;

    @candid(InsufficientFunds)
    InsufficientFunds: InsufficientFunds;

    @candid(AllowanceChanged)
    AllowanceChanged: AllowanceChanged;

    @candid(Expired)
    Expired: Expired;

    @candid(Null)
    TooOld: Null;

    @candid(CreatedInFuture)
    CreatedInFuture: CreatedInFuture;

    @candid(Duplicate)
    Duplicate: Duplicate;

    @candid(Null)
    TemporarilyUnavailable: Null;

    @candid(GenericError)
    GenericError: GenericError;
}

export class ICRC2TransferFromArgs extends Record {
    @candid(ICRC2Account)
    from: ICRC2Account;

    @candid(ICRC2Account)
    to: ICRC2Account;

    @candid(nat)
    amount: nat;

    @candid(Opt(nat))
    fee: Opt<nat>;

    @candid(Opt(blob))
    memo: Opt<blob>;

    @candid(Opt(nat64))
    created_at_time: Opt<nat64>;
}

export class ICRC2TransferFromError extends Variant {
    @candid(BadFee)
    BadFee: BadFee;

    @candid(BadBurn)
    BadBurn: BadBurn;

    @candid(InsufficientFunds)
    InsufficientFunds: InsufficientFunds;

    @candid(InsufficientAllowance)
    InsufficientAllowance: InsufficientAllowance;

    @candid(Null)
    TooOld: Null;

    @candid(CreatedInFuture)
    CreatedInFuture: CreatedInFuture;

    @candid(Duplicate)
    Duplicate: Duplicate;

    @candid(Null)
    TemporarilyUnavailable: null;

    @candid(GenericError)
    GenericError: GenericError;
}

export class ICRC2AllowanceArgs extends Record {
    @candid(ICRC2Account)
    account: ICRC2Account;

    @candid(ICRC2Account)
    spender: ICRC2Account;
}

export class ICRC2ApproveResult extends Variant {
    @candid(nat)
    Ok: nat;

    @candid(ICRC2ApproveError)
    Err: ICRC2ApproveError;
}

export class ICRC2TransferFromResult extends Variant {
    @candid(nat)
    Ok: nat;

    @candid(ICRC2TransferFromError)
    Err: ICRC2TransferFromError;
}

export class ICRC2AllowanceResults extends Record {
    @candid(nat)
    allowance: nat;

    @candid(Opt(nat64))
    expires_at: Opt<nat64>;
}
