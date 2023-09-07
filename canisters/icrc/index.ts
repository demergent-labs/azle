import {
    nat,
    nat8,
    Opt,
    Record,
    Service,
    query,
    update,
    text,
    Tuple,
    Vec,
    candid
} from '../../src/lib_new';
import {
    ICRC1Account,
    ICRC1TransferArgs,
    ICRC1TransferResult,
    ICRC1Value
} from './icrc_1';
import {
    ICRC2AllowanceArgs,
    ICRC2AllowanceResults,
    ICRC2ApproveArgs,
    ICRC2ApproveResult,
    ICRC2TransferFromArgs,
    ICRC2TransferFromResult
} from './icrc_2';

export class ICRC1SupportedStandard extends Record {
    @candid(text)
    name: text;

    @candid(text)
    url: text;
}

export class ICRC extends Service {
    @query([], Vec(Tuple(text, ICRC1Value)))
    icrc1_metadata: () => [text, ICRC1Value][];

    @query([], text)
    icrc1_name: () => text;

    @query([], text)
    icrc1_symbol: () => text;

    @query([], nat8)
    icrc1_decimals: () => nat8;

    @query([], nat)
    icrc1_fee: () => nat;

    @query([], nat)
    icrc1_total_supply: () => nat;

    @query([], Opt(ICRC1Account))
    icrc1_minting_account: () => Opt<ICRC1Account>;

    @query([ICRC1Account], nat)
    icrc1_balance_of: (account: ICRC1Account) => nat;

    @update([ICRC1TransferArgs], ICRC1TransferResult)
    icrc1_transfer: (transferArgs: ICRC1TransferArgs) => ICRC1TransferResult;

    @query([], Vec(ICRC1SupportedStandard))
    icrc1_supported_standards: () => Vec<ICRC1SupportedStandard>;

    @update([ICRC2ApproveArgs], ICRC2ApproveResult)
    icrc2_approve: (args: ICRC2ApproveArgs) => ICRC2ApproveResult;

    @update([ICRC2TransferFromArgs], ICRC2TransferFromResult)
    icrc2_transfer_from: (
        args: ICRC2TransferFromArgs
    ) => ICRC2TransferFromResult;

    @query([ICRC2AllowanceArgs], ICRC2AllowanceResults)
    icrc2_allowance: (args: ICRC2AllowanceArgs) => ICRC2AllowanceResults;
}

export * from './icrc_1';
export * from './icrc_2';
