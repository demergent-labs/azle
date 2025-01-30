import { call, IDL, trap } from 'azle';
import {
    Account,
    Metadatum,
    SupportedStandard,
    TransferArgs,
    TransferResult
} from 'azle/canisters/icrc_1';
import {
    AllowanceArgs,
    AllowanceResult,
    ApproveArgs,
    ApproveResult,
    TransferFromArgs,
    TransferFromResult
} from 'azle/canisters/icrc_2';
import {
    Canister,
    nat,
    nat8,
    None,
    Opt,
    query,
    serialize,
    Some,
    text,
    Tuple,
    update,
    Vec
} from 'azle/experimental';
import {
    Account as AccountExperimental,
    AllowanceArgs as AllowanceArgsExperimental,
    AllowanceResult as AllowanceResultExperimental,
    ApproveArgs as ApproveArgsExperimental,
    ApproveResult as ApproveResultExperimental,
    SupportedStandard as SupportedStandardExperimental,
    TransferArgs as TransferArgsExperimental,
    TransferFromArgs as TransferFromArgsExperimental,
    TransferFromResult as TransferFromResultExperimental,
    TransferResult as TransferResultExperimental,
    Value
} from 'azle/experimental/canisters/icrc';

export default Canister({
    icrc1_metadata: query([], Vec(Tuple(text, Value)), async () => {
        const icrcPrincipal = getIcrcPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${icrcPrincipal}/icrc1_metadata`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, Metadatum[]>(
                icrcPrincipal,
                'icrc1_metadata',
                {
                    returnIdlType: IDL.Vec(Metadatum)
                }
            );
        }
    }),
    icrc1_name: query([], text, async () => {
        const icrcPrincipal = getIcrcPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(`icp://${icrcPrincipal}/icrc1_name`, {
                body: serialize({
                    candidPath: '/candid/icp/icrc.did'
                })
            });
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, string>(icrcPrincipal, 'icrc1_name', {
                returnIdlType: IDL.Text
            });
        }
    }),
    icrc1_decimals: query([], nat8, async () => {
        const icrcPrincipal = getIcrcPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${icrcPrincipal}/icrc1_decimals`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, nat8>(
                icrcPrincipal,
                'icrc1_decimals',
                {
                    returnIdlType: IDL.Nat8
                }
            );
        }
    }),
    icrc1_symbol: query([], text, async () => {
        const icrcPrincipal = getIcrcPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${icrcPrincipal}/icrc1_symbol`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, string>(
                icrcPrincipal,
                'icrc1_symbol',
                {
                    returnIdlType: IDL.Text
                }
            );
        }
    }),
    icrc1_fee: query([], nat, async () => {
        const icrcPrincipal = getIcrcPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(`icp://${icrcPrincipal}/icrc1_fee`, {
                body: serialize({
                    candidPath: '/candid/icp/icrc.did'
                })
            });
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, nat>(icrcPrincipal, 'icrc1_fee', {
                returnIdlType: IDL.Nat
            });
        }
    }),
    icrc1_total_supply: query([], nat, async () => {
        const icrcPrincipal = getIcrcPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${icrcPrincipal}/icrc1_total_supply`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, nat>(
                icrcPrincipal,
                'icrc1_total_supply',
                {
                    returnIdlType: IDL.Nat
                }
            );
        }
    }),
    icrc1_minting_account: query([], Opt(AccountExperimental), async () => {
        const icrcPrincipal = getIcrcPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${icrcPrincipal}/icrc1_minting_account`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            if (responseJson.length === 1) {
                return Some(responseJson[0]);
            } else {
                return None;
            }
        } else {
            const result = await call<undefined, [Account] | []>(
                icrcPrincipal,
                'icrc1_minting_account',
                {
                    returnIdlType: IDL.Opt(Account)
                }
            );

            if (result.length === 1) {
                return Some(result[0]);
            } else {
                return None;
            }
        }
    }),
    icrc1_balance_of: query([AccountExperimental], nat, async (account) => {
        const icrcPrincipal = getIcrcPrincipal();

        const arg: Account = {
            ...account,
            subaccount: azleOptToAgentOpt(account.subaccount)
        };

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${icrcPrincipal}/icrc1_balance_of`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did',
                        args: [arg]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<[Account], nat>(
                icrcPrincipal,
                'icrc1_balance_of',
                {
                    paramIdlTypes: [Account],
                    returnIdlType: IDL.Nat,
                    args: [arg]
                }
            );
        }
    }),
    icrc1_transfer: update(
        [TransferArgsExperimental],
        TransferResultExperimental,
        async (transferArgs) => {
            const icrcPrincipal = getIcrcPrincipal();

            const arg: TransferArgs = {
                ...transferArgs,
                from_subaccount: azleOptToAgentOpt(
                    transferArgs.from_subaccount
                ),
                to: {
                    ...transferArgs.to,
                    subaccount: azleOptToAgentOpt(transferArgs.to.subaccount)
                },
                fee: azleOptToAgentOpt(transferArgs.fee),
                memo: azleOptToAgentOpt(transferArgs.memo),
                created_at_time: azleOptToAgentOpt(transferArgs.created_at_time)
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${icrcPrincipal}/icrc1_transfer`,
                    {
                        body: serialize({
                            candidPath: '/candid/icp/icrc.did',
                            args: [arg]
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await call<[TransferArgs], TransferResult>(
                    icrcPrincipal,
                    'icrc1_transfer',
                    {
                        paramIdlTypes: [TransferArgs],
                        returnIdlType: TransferResult,
                        args: [arg]
                    }
                );
            }
        }
    ),
    icrc1_supported_standards: query(
        [],
        Vec(SupportedStandardExperimental),
        async () => {
            const icrcPrincipal = getIcrcPrincipal();

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${icrcPrincipal}/icrc1_supported_standards`,
                    {
                        body: serialize({
                            candidPath: '/candid/icp/icrc.did'
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await call<undefined, SupportedStandard[]>(
                    icrcPrincipal,
                    'icrc1_supported_standards',
                    {
                        returnIdlType: IDL.Vec(SupportedStandard)
                    }
                );
            }
        }
    ),
    icrc2_approve: update(
        [ApproveArgsExperimental],
        ApproveResultExperimental,
        async (approveArgs) => {
            const icrcPrincipal = getIcrcPrincipal();

            const arg: ApproveArgs = {
                ...approveArgs,
                from_subaccount: azleOptToAgentOpt(approveArgs.from_subaccount),
                spender: {
                    ...approveArgs.spender,
                    subaccount: azleOptToAgentOpt(
                        approveArgs.spender.subaccount
                    )
                },
                expected_allowance: azleOptToAgentOpt(
                    approveArgs.expected_allowance
                ),
                expires_at: azleOptToAgentOpt(approveArgs.expires_at),
                fee: azleOptToAgentOpt(approveArgs.fee),
                memo: azleOptToAgentOpt(approveArgs.memo),
                created_at_time: azleOptToAgentOpt(approveArgs.created_at_time)
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${icrcPrincipal}/icrc2_approve`,
                    {
                        body: serialize({
                            candidPath: '/candid/icp/icrc.did',
                            args: [arg]
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await call<[ApproveArgs], ApproveResult>(
                    icrcPrincipal,
                    'icrc2_approve',
                    {
                        paramIdlTypes: [ApproveArgs],
                        returnIdlType: ApproveResult,
                        args: [arg]
                    }
                );
            }
        }
    ),
    icrc2_transfer_from: update(
        [TransferFromArgsExperimental],
        TransferFromResultExperimental,
        async (transferFromArgs) => {
            const icrcPrincipal = getIcrcPrincipal();

            const arg: TransferFromArgs = {
                ...transferFromArgs,
                spender_subaccount: azleOptToAgentOpt(
                    transferFromArgs.spender_subaccount
                ),
                from: {
                    ...transferFromArgs.from,
                    subaccount: azleOptToAgentOpt(
                        transferFromArgs.from.subaccount
                    )
                },
                to: {
                    ...transferFromArgs.to,
                    subaccount: azleOptToAgentOpt(
                        transferFromArgs.from.subaccount
                    )
                },
                fee: azleOptToAgentOpt(transferFromArgs.fee),
                memo: azleOptToAgentOpt(transferFromArgs.memo),
                created_at_time: azleOptToAgentOpt(
                    transferFromArgs.created_at_time
                )
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${icrcPrincipal}/icrc2_transfer_from`,
                    {
                        body: serialize({
                            candidPath: '/candid/icp/icrc.did',
                            args: [arg]
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await call<[TransferFromArgs], TransferFromResult>(
                    icrcPrincipal,
                    'icrc2_transfer_from',
                    {
                        paramIdlTypes: [TransferFromArgs],
                        returnIdlType: TransferFromResult,
                        args: [arg]
                    }
                );
            }
        }
    ),
    icrc2_allowance: update(
        [AllowanceArgsExperimental],
        AllowanceResultExperimental,
        async (allowanceArgs) => {
            const icrcPrincipal = getIcrcPrincipal();

            const arg: AllowanceArgs = {
                ...allowanceArgs,
                account: {
                    ...allowanceArgs.account,
                    subaccount: azleOptToAgentOpt(
                        allowanceArgs.account.subaccount
                    )
                },
                spender: {
                    ...allowanceArgs.spender,
                    subaccount: azleOptToAgentOpt(
                        allowanceArgs.spender.subaccount
                    )
                }
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${icrcPrincipal}/icrc2_allowance`,
                    {
                        body: serialize({
                            candidPath: '/candid/icp/icrc.did',
                            args: [arg]
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await call<[AllowanceArgs], AllowanceResult>(
                    icrcPrincipal,
                    'icrc2_allowance',
                    {
                        paramIdlTypes: [AllowanceArgs],
                        returnIdlType: AllowanceResult,
                        args: [arg]
                    }
                );
            }
        }
    )
});

function getIcrcPrincipal(): string {
    return (
        process.env.ICRC_PRINCIPAL ??
        trap('process.env.ICRC_PRINCIPAL is undefined')
    );
}

function azleOptToAgentOpt<T>(opt: Opt<T>): [T] | [] {
    if ('None' in opt) {
        return [];
    } else {
        return [opt.Some];
    }
}
