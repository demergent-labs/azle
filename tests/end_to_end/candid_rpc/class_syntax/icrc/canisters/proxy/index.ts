import { call, IDL, init, query, trap, update } from 'azle';
import {
    Account,
    AllowanceArgs,
    AllowanceResult,
    ApproveArgs,
    ApproveResult,
    ICRC,
    SupportedStandard,
    TransferArgs,
    TransferFromArgs,
    TransferFromResult,
    TransferResult,
    Value
} from 'azle/canisters/icrc';

let icrc: typeof ICRC;

export default class {
    @init([])
    init() {
        icrc = ICRC(Principal.fromText(getIcrcPrincipal()));
    }
    @query([], Vec(Tuple(IDL.Text, Value)))
    async icrc1_metadata() {
        return await call(icrc.icrc1_metadata);
    }
    @query([], IDL.Text)
    async icrc1_name() {
        return await call(icrc.icrc1_name);
    }
    @query([], nat8)
    async icrc1_decimals() {
        return await call(icrc.icrc1_decimals);
    }
    @query([], IDL.Text)
    async icrc1_symbol() {
        return await call(icrc.icrc1_symbol);
    }
    @query([], nat)
    async icrc1_fee() {
        return await call(icrc.icrc1_fee);
    }
    @query([], nat)
    async icrc1_total_supply() {
        return await call(icrc.icrc1_total_supply);
    }
    @query([], Opt(Account))
    async icrc1_minting_account() {
        return await call(icrc.icrc1_minting_account);
    }
    @query([Account], nat)
    async icrc1_balance_of(account) {
        return await call(icrc.icrc1_balance_of, {
            args: [account]
        });
    }
    @update([TransferArgs], TransferResult)
    async icrc1_transfer(transferArgs) {
        return await call(icrc.icrc1_transfer, {
            args: [transferArgs]
        });
    }
    @query([], Vec(SupportedStandard))
    async icrc1_supported_standards() {
        return await call(icrc.icrc1_supported_standards);
    }
    @update([ApproveArgs], ApproveResult)
    async icrc2_approve(approveArgs) {
        return await call(icrc.icrc2_approve, {
            args: [approveArgs]
        });
    }
    @update([TransferFromArgs], TransferFromResult)
    async icrc2_transfer_from(transferFromArgs) {
        return await call(icrc.icrc2_transfer_from, {
            args: [transferFromArgs]
        });
    }
    @update([AllowanceArgs], AllowanceResult)
    async icrc2_allowance(allowanceArgs) {
        return await call(icrc.icrc2_allowance, {
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
