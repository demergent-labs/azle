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
export type ICRCTimestamp = Alias<nat64>;

export type ICRCSubaccount = Alias<blob>;

export type ICRCAccount = Record<{
    owner: Principal;
    subaccount: Opt<ICRCSubaccount>;
}>;

export type ICRCTransferArgs = Record<{
    from_subaccount: Opt<ICRCSubaccount>;
    to: ICRCAccount;
    amount: nat;
    fee: Opt<nat>;
    memo: Opt<blob>;
    created_at_time: Opt<ICRCTimestamp>;
}>;

export type ICRCTransferError = Variant<{
    BadFee: Record<{ expected_fee: nat }>;
    BadBurn: Record<{ min_burn_amount: nat }>;
    InsufficientFunds: Record<{ balance: nat }>;
    TooOld: null;
    CreatedInFuture: Record<{ ledger_time: ICRCTimestamp }>;
    Duplicate: Record<{ duplicate_of: nat }>;
    TemporarilyUnavailable: null;
    GenericError: Record<{ error_code: nat; message: text }>;
}>;

export type ICRCValue = Variant<{
    Nat: nat;
    Int: int;
    Text: text;
    Blob: blob;
}>;

export class ICRC extends Service {
    @serviceQuery
    icrc1_metadata: () => CallResult<Vec<Tuple<[text, ICRCValue]>>>;

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
    icrc1_minting_account: () => CallResult<Opt<ICRCAccount>>;

    @serviceQuery
    icrc1_balance_of: (account: ICRCAccount) => CallResult<nat>;

    @serviceUpdate
    icrc1_transfer: (
        transferArgs: ICRCTransferArgs
    ) => CallResult<Variant<{ Ok: nat; Err: ICRCTransferError }>>;

    @serviceQuery
    icrc1_supported_standards: () => CallResult<
        Vec<Record<{ name: text; url: text }>>
    >;
}
