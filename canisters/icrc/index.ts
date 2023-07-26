import {
    CallResult,
    nat,
    nat8,
    nat64,
    Opt,
    Record,
    Service,
    serviceQuery,
    serviceUpdate,
    text,
    Tuple,
    Variant,
    Vec
} from '../../src/lib';
import {
    ICRC1Account,
    ICRC1TransferArgs,
    ICRC1TransferError,
    ICRC1Value
} from './icrc_1';
import {
    ICRC2AllowanceArgs,
    ICRC2ApproveArgs,
    ICRC2ApproveError,
    ICRC2TransferFromArgs,
    ICRC2TransferFromError
} from './icrc_2';

export class ICRC extends Service {
    @serviceQuery
    icrc1_metadata: () => CallResult<Vec<Tuple<[text, ICRC1Value]>>>;

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
    icrc1_minting_account: () => CallResult<Opt<ICRC1Account>>;

    @serviceQuery
    icrc1_balance_of: (account: ICRC1Account) => CallResult<nat>;

    @serviceUpdate
    icrc1_transfer: (
        transferArgs: ICRC1TransferArgs
    ) => CallResult<Variant<{ Ok: nat; Err: ICRC1TransferError }>>;

    @serviceQuery
    icrc1_supported_standards: () => CallResult<
        Vec<Record<{ name: text; url: text }>>
    >;

    @serviceUpdate
    icrc2_approve: (
        args: ICRC2ApproveArgs
    ) => CallResult<Variant<{ Ok: nat; Err: ICRC2ApproveError }>>;

    @serviceUpdate
    icrc2_transfer_from: (
        args: ICRC2TransferFromArgs
    ) => CallResult<Variant<{ Ok: nat; Err: ICRC2TransferFromError }>>;

    @serviceQuery
    icrc2_allowance: (
        args: ICRC2AllowanceArgs
    ) => CallResult<Record<{ allowance: nat; expires_at: Opt<nat64> }>>;
}

export * from './icrc_1';
export * from './icrc_2';
