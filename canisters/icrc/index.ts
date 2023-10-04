import {
    Canister,
    nat,
    nat8,
    Opt,
    Record,
    query,
    update,
    text,
    Tuple,
    Vec
} from '../../src/lib';
import { Account, TransferArgs, TransferResult, Value } from './icrc_1';
import {
    AllowanceArgs,
    AllowanceResult,
    ApproveArgs,
    ApproveResult,
    TransferFromArgs,
    TransferFromResult
} from './icrc_2';

export const SupportedStandard = Record({
    name: text,
    url: text
});

export const ICRC = Canister({
    icrc1_metadata: query([], Vec(Tuple(text, Value))),
    icrc1_name: query([], text),
    icrc1_symbol: query([], text),
    icrc1_decimals: query([], nat8),
    icrc1_fee: query([], nat),
    icrc1_total_supply: query([], nat),
    icrc1_minting_account: query([], Opt(Account)),
    icrc1_balance_of: query([Account], nat),
    icrc1_transfer: update([TransferArgs], TransferResult),
    icrc1_supported_standards: query([], Vec(SupportedStandard)),
    icrc2_approve: update([ApproveArgs], ApproveResult),
    icrc2_transfer_from: update([TransferFromArgs], TransferFromResult),
    icrc2_allowance: query([AllowanceArgs], AllowanceResult)
});

export * from './icrc_1';
export * from './icrc_2';
