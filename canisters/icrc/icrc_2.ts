import {
    blob,
    nat,
    nat64,
    Opt,
    Principal,
    Record,
    text,
    Variant
} from '../../src/lib';

export type ICRC2Account = Record<{
    owner: Principal;
    subaccount: Opt<blob>;
}>;

export type ICRC2ApproveArgs = Record<{
    from_subaccount: Opt<blob>;
    spender: ICRC2Account;
    amount: nat;
    expected_allowance: Opt<nat>;
    expires_at: Opt<nat64>;
    fee: Opt<nat>;
    memo: Opt<blob>;
    created_at_time: Opt<nat64>;
}>;

export type ICRC2ApproveError = Variant<{
    BadFee: Record<{ expected_fee: nat }>;
    InsufficientFunds: Record<{ balance: nat }>;
    AllowanceChanged: Record<{ current_allowance: nat }>;
    Expired: Record<{ ledger_time: nat64 }>;
    TooOld: null;
    CreatedInFuture: Record<{ ledger_time: nat64 }>;
    Duplicate: Record<{ duplicate_of: nat }>;
    TemporarilyUnavailable: null;
    GenericError: Record<{ error_code: nat; message: text }>;
}>;

export type ICRC2TransferFromArgs = Record<{
    from: ICRC2Account;
    to: ICRC2Account;
    amount: nat;
    fee: Opt<nat>;
    memo: Opt<blob>;
    created_at_time: Opt<nat64>;
}>;

export type ICRC2TransferFromError = Variant<{
    BadFee: Record<{ expected_fee: nat }>;
    BadBurn: Record<{ min_burn_amount: nat }>;
    InsufficientFunds: Record<{ balance: nat }>;
    InsufficientAllowance: Record<{ allowance: nat }>;
    TooOld: null;
    CreatedInFuture: Record<{ ledger_time: nat64 }>;
    Duplicate: Record<{ duplicate_of: nat }>;
    TemporarilyUnavailable: null;
    GenericError: Record<{ error_code: nat; message: text }>;
}>;

export type ICRC2AllowanceArgs = Record<{
    account: ICRC2Account;
    spender: ICRC2Account;
}>;
