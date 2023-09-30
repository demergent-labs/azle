import {
    Canister,
    ic,
    init,
    nat,
    nat8,
    Opt,
    Principal,
    query,
    text,
    Tuple,
    update,
    Vec
} from 'azle';
import {
    Account,
    ICRC,
    TransferArgs,
    TransferResult,
    Value,
    SupportedStandard,
    ApproveArgs,
    ApproveResult,
    TransferFromArgs,
    TransferFromResult,
    AllowanceArgs,
    AllowanceResult
} from 'azle/canisters/icrc';

let icrc: typeof ICRC;

export default Canister({
    init: init([], () => {
        icrc = ICRC(
            Principal.fromText(
                process.env.ICRC_PRINCIPAL ??
                    ic.trap('process.env.ICRC_PRINCIPAL is undefined')
            )
        );
    }),
    icrc1_metadata: query([], Vec(Tuple(text, Value)), async () => {
        return await ic.call(icrc.icrc1_metadata);
    }),
    icrc1_name: query([], text, async () => {
        return await ic.call(icrc.icrc1_name);
    }),
    icrc1_decimals: query([], nat8, async () => {
        return await ic.call(icrc.icrc1_decimals);
    }),
    icrc1_symbol: query([], text, async () => {
        return await ic.call(icrc.icrc1_symbol);
    }),
    icrc1_fee: query([], nat, async () => {
        return await ic.call(icrc.icrc1_fee);
    }),
    icrc1_total_supply: query([], nat, async () => {
        return await ic.call(icrc.icrc1_total_supply);
    }),
    icrc1_minting_account: query([], Opt(Account), async () => {
        return await ic.call(icrc.icrc1_minting_account);
    }),
    icrc1_balance_of: query([Account], nat, async (account) => {
        return await ic.call(icrc.icrc1_balance_of, {
            args: [account]
        });
    }),
    icrc1_transfer: update(
        [TransferArgs],
        TransferResult,
        async (transferArgs) => {
            return await ic.call(icrc.icrc1_transfer, {
                args: [transferArgs]
            });
        }
    ),
    icrc1_supported_standards: query([], Vec(SupportedStandard), async () => {
        return await ic.call(icrc.icrc1_supported_standards);
    }),
    icrc2_approve: update([ApproveArgs], ApproveResult, async (approveArgs) => {
        return await ic.call(icrc.icrc2_approve, {
            args: [approveArgs]
        });
    }),
    icrc2_transfer_from: update(
        [TransferFromArgs],
        TransferFromResult,
        async (transferFromArgs) => {
            return await ic.call(icrc.icrc2_transfer_from, {
                args: [transferFromArgs]
            });
        }
    ),
    icrc2_allowance: update(
        [AllowanceArgs],
        AllowanceResult,
        async (allowanceArgs) => {
            return await ic.call(icrc.icrc2_allowance, {
                args: [allowanceArgs]
            });
        }
    )
});
