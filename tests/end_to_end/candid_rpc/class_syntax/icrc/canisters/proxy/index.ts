import { call, IDL, query, trap, update } from 'azle';
import {
    Account,
    AllowanceArgs,
    AllowanceResult,
    ApproveArgs,
    ApproveResult,
    SupportedStandard,
    TransferArgs,
    TransferFromArgs,
    TransferFromResult,
    TransferResult,
    Value
} from 'azle/canisters/icrc';

export default class {
    @query([], IDL.Vec(IDL.Tuple(IDL.Text, Value)), { composite: true })
    async icrc1_metadata(): Promise<[Text, Value][]> {
        return await call(getIcrcPrincipal(), 'icrc1_metadata', {
            returnIdlType: IDL.Vec(IDL.Tuple(IDL.Text, Value))
        });
    }

    @query([], IDL.Text, { composite: true })
    async icrc1_name(): Promise<string> {
        return await call(getIcrcPrincipal(), 'icrc1_name', {
            returnIdlType: IDL.Text
        });
    }

    @query([], IDL.Nat8, { composite: true })
    async icrc1_decimals(): Promise<number> {
        return await call(getIcrcPrincipal(), 'icrc1_decimals', {
            returnIdlType: IDL.Nat8
        });
    }

    @query([], IDL.Text, { composite: true })
    async icrc1_symbol(): Promise<string> {
        return await call(getIcrcPrincipal(), 'icrc1_symbol', {
            returnIdlType: IDL.Text
        });
    }

    @query([], IDL.Nat, { composite: true })
    async icrc1_fee(): Promise<string> {
        return await call(getIcrcPrincipal(), 'icrc1_fee', {
            returnIdlType: IDL.Nat
        });
    }

    @query([], IDL.Nat, { composite: true })
    async icrc1_total_supply(): Promise<bigint> {
        return await call(getIcrcPrincipal(), 'icrc1_total_supply', {
            returnIdlType: IDL.Nat
        });
    }

    @query([], IDL.Opt(Account), { composite: true })
    async icrc1_minting_account(): Promise<[Account] | []> {
        return await call(getIcrcPrincipal(), 'icrc1_minting_account', {
            returnIdlType: IDL.Opt(Account)
        });
    }

    @query([Account], IDL.Nat, { composite: true })
    async icrc1_balance_of(account: Account): Promise<bigint> {
        return await call(getIcrcPrincipal(), 'icrc1_balance_of', {
            paramIdlTypes: [Account],
            returnIdlType: IDL.Nat,
            args: [account]
        });
    }

    @update([TransferArgs], TransferResult)
    async icrc1_transfer(transferArgs: TransferArgs): Promise<TransferResult> {
        return await call(getIcrcPrincipal(), 'icrc1_transfer', {
            paramIdlTypes: [TransferArgs],
            returnIdlType: TransferResult,
            args: [transferArgs]
        });
    }

    @query([], IDL.Vec(SupportedStandard), { composite: true })
    async icrc1_supported_standards(): Promise<SupportedStandard[]> {
        return await call(getIcrcPrincipal(), 'icrc1_supported_standards', {
            returnIdlType: IDL.Vec(SupportedStandard)
        });
    }

    @update([ApproveArgs], ApproveResult)
    async icrc2_approve(approveArgs: ApproveArgs): Promise<ApproveResult> {
        return await call(getIcrcPrincipal(), 'icrc2_approve', {
            paramIdlTypes: [ApproveArgs],
            returnIdlType: ApproveResult,
            args: [approveArgs]
        });
    }

    @update([TransferFromArgs], TransferFromResult)
    async icrc2_transfer_from(
        transferFromArgs: TransferFromArgs
    ): Promise<TransferFromResult> {
        return await call(getIcrcPrincipal(), 'icrc2_transfer_from', {
            paramIdlTypes: [TransferFromArgs],
            returnIdlType: TransferFromResult,
            args: [transferFromArgs]
        });
    }

    @update([AllowanceArgs], AllowanceResult)
    async icrc2_allowance(
        allowanceArgs: AllowanceArgs
    ): Promise<AllowanceResult> {
        return await call(getIcrcPrincipal(), 'icrc2_allowance', {
            paramIdlTypes: [AllowanceArgs],
            returnIdlType: AllowanceResult,
            args: [allowanceArgs]
        });
    }
}

function getIcrcPrincipal(): string {
    return (
        process.env.ICRC_PRINCIPAL ??
        trap('process.env.ICRC_PRINCIPAL is undefined')
    );
}
