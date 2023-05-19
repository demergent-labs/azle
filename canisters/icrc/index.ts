import {
    Alias,
    blob,
    CallResult,
    int,
    nat,
    nat8,
    nat64,
    Opt,
    Principal,
    Record,
    Service,
    serviceQuery,
    serviceUpdate,
    text,
    Tuple,
    Variant,
    Vec
} from '../../src/lib';

// Number of nanoseconds since the UNIX epoch in UTC timezone.
export type Timestamp = Alias<nat64>;

export type Subaccount = Alias<blob>;

export type Account = Record<{
    owner: Principal;
    subaccount: Opt<Subaccount>;
}>;

export type TransferArgs = Record<{
    from_subaccount: Opt<Subaccount>;
    to: Account;
    amount: nat;
    fee: Opt<nat>;
    memo: Opt<blob>;
    created_at_time: Opt<Timestamp>;
}>;

export type TransferError = Variant<{
    BadFee: Record<{ expected_fee: nat }>;
    BadBurn: Record<{ min_burn_amount: nat }>;
    InsufficientFunds: Record<{ balance: nat }>;
    TooOld: null;
    CreatedInFuture: Record<{ ledger_time: Timestamp }>;
    Duplicate: Record<{ duplicate_of: nat }>;
    TemporarilyUnavailable: null;
    GenericError: Record<{ error_code: nat; message: text }>;
}>;

export type Value = Variant<{
    Nat: nat;
    Int: int;
    Text: text;
    Blob: blob;
}>;

export class ICRC extends Service {
    @serviceQuery
    icrc1_metadata: () => CallResult<Vec<Tuple<[text, Value]>>>;

    @serviceQuery
    icrc1_name: () => CallResult<text>;

    @serviceQuery
    icrc1_symbol: () => CallResult<text>;

    @serviceQuery
    icrc1_decimals: () => CallResult<nat8>;

    @serviceQuery
    icrc1_fee: () => CallResult<nat>;

    @serviceQuery
    icrc1_total_supply: () => CallResult<nat>;

    @serviceQuery
    icrc1_minting_account: () => CallResult<Opt<Account>>;

    @serviceQuery
    icrc1_balance_of: (account: Account) => CallResult<nat>;

    @serviceUpdate
    icrc1_transfer: (
        transferArgs: TransferArgs
    ) => CallResult<Variant<{ Ok: nat; Err: TransferError }>>;

    @serviceQuery
    icrc1_supported_standards: () => CallResult<
        Vec<Record<{ name: text; url: text }>>
    >;
}
