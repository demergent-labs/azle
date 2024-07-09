import { IDL } from '../../src/lib/stable';
import { Account, TransferArgs, TransferResult, Value } from './icrc_1';
import {
    AllowanceArgs,
    AllowanceResult,
    ApproveArgs,
    ApproveResult,
    TransferFromArgs,
    TransferFromResult
} from './icrc_2';

export const SupportedStandard = IDL.Record({
    name: IDL.Text,
    url: IDL.Text
});
export type SupportedStandard = {
    name: string;
    url: string;
};

export const ICRC = IDL.Service({
    icrc1_metadata: IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Value))],
        ['query']
    ),
    icrc1_name: IDL.Func([], [IDL.Text], ['query']),
    icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
    icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
    icrc1_fee: IDL.Func([], [IDL.Nat], ['query']),
    icrc1_total_supply: IDL.Func([], [IDL.Nat], ['query']),
    icrc1_minting_account: IDL.Func([], [IDL.Opt(Account)], ['query']),
    icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ['query']),
    icrc1_transfer: IDL.Func([TransferArgs], [TransferResult]),
    icrc1_supported_standards: IDL.Func(
        [],
        [IDL.Vec(SupportedStandard)],
        ['query']
    ),
    icrc2_approve: IDL.Func([ApproveArgs], [ApproveResult]),
    icrc2_transfer_from: IDL.Func([TransferFromArgs], [TransferFromResult]),
    icrc2_allowance: IDL.Func([AllowanceArgs], [AllowanceResult], ['query'])
});

export * from './icrc_1';
export * from './icrc_2';
