import {
    Canister,
    ic,
    init,
    nat,
    nat8,
    None,
    Opt,
    Principal,
    query,
    serialize,
    Some,
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
        icrc = ICRC(Principal.fromText(getIcrcPrincipal()));
    }),
    icrc1_metadata: query([], Vec(Tuple(text, Value)), async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_metadata`,
                {
                    body: serialize({
                        candidPath: '/candid/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(icrc.icrc1_metadata);
        }
    }),
    icrc1_name: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_name`,
                {
                    body: serialize({
                        candidPath: '/candid/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(icrc.icrc1_name);
        }
    }),
    icrc1_decimals: query([], nat8, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_decimals`,
                {
                    body: serialize({
                        candidPath: '/candid/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(icrc.icrc1_decimals);
        }
    }),
    icrc1_symbol: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_symbol`,
                {
                    body: serialize({
                        candidPath: '/candid/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(icrc.icrc1_symbol);
        }
    }),
    icrc1_fee: query([], nat, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_fee`,
                {
                    body: serialize({
                        candidPath: '/candid/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(icrc.icrc1_fee);
        }
    }),
    icrc1_total_supply: query([], nat, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_total_supply`,
                {
                    body: serialize({
                        candidPath: '/candid/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(icrc.icrc1_total_supply);
        }
    }),
    icrc1_minting_account: query([], Opt(Account), async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_minting_account`,
                {
                    body: serialize({
                        candidPath: '/candid/icrc.did'
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
            return await ic.call(icrc.icrc1_minting_account);
        }
    }),
    icrc1_balance_of: query([Account], nat, async (account) => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_balance_of`,
                {
                    body: serialize({
                        candidPath: '/candid/icrc.did',
                        args: [
                            {
                                ...account,
                                subaccount: azleOptToAgentOpt(
                                    account.subaccount
                                )
                            }
                        ]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(icrc.icrc1_balance_of, {
                args: [account]
            });
        }
    }),
    icrc1_transfer: update(
        [TransferArgs],
        TransferResult,
        async (transferArgs) => {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${getIcrcPrincipal()}/icrc1_transfer`,
                    {
                        body: serialize({
                            candidPath: '/candid/icrc.did',
                            args: [
                                {
                                    ...transferArgs,
                                    from_subaccount: azleOptToAgentOpt(
                                        transferArgs.from_subaccount
                                    ),
                                    to: {
                                        ...transferArgs.to,
                                        subaccount: azleOptToAgentOpt(
                                            transferArgs.to.subaccount
                                        )
                                    },
                                    fee: azleOptToAgentOpt(transferArgs.fee),
                                    memo: azleOptToAgentOpt(transferArgs.memo),
                                    created_at_time: azleOptToAgentOpt(
                                        transferArgs.created_at_time
                                    )
                                }
                            ]
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await ic.call(icrc.icrc1_transfer, {
                    args: [transferArgs]
                });
            }
        }
    ),
    icrc1_supported_standards: query([], Vec(SupportedStandard), async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_supported_standards`,
                {
                    body: serialize({
                        candidPath: '/candid/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(icrc.icrc1_supported_standards);
        }
    }),
    icrc2_approve: update([ApproveArgs], ApproveResult, async (approveArgs) => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc2_approve`,
                {
                    body: serialize({
                        candidPath: '/candid/icrc.did',
                        args: [
                            {
                                ...approveArgs,
                                from_subaccount: azleOptToAgentOpt(
                                    approveArgs.from_subaccount
                                ),
                                spender: {
                                    ...approveArgs.spender,
                                    subaccount: azleOptToAgentOpt(
                                        approveArgs.spender.subaccount
                                    )
                                },
                                expected_allowance: azleOptToAgentOpt(
                                    approveArgs.expected_allowance
                                ),
                                expires_at: azleOptToAgentOpt(
                                    approveArgs.expires_at
                                ),
                                fee: azleOptToAgentOpt(approveArgs.fee),
                                memo: azleOptToAgentOpt(approveArgs.memo),
                                created_at_time: azleOptToAgentOpt(
                                    approveArgs.created_at_time
                                )
                            }
                        ]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(icrc.icrc2_approve, {
                args: [approveArgs]
            });
        }
    }),
    icrc2_transfer_from: update(
        [TransferFromArgs],
        TransferFromResult,
        async (transferFromArgs) => {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${getIcrcPrincipal()}/icrc2_transfer_from`,
                    {
                        body: serialize({
                            candidPath: '/candid/icrc.did',
                            args: [
                                {
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
                                    fee: azleOptToAgentOpt(
                                        transferFromArgs.fee
                                    ),
                                    memo: azleOptToAgentOpt(
                                        transferFromArgs.memo
                                    ),
                                    created_at_time: azleOptToAgentOpt(
                                        transferFromArgs.created_at_time
                                    )
                                }
                            ]
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await ic.call(icrc.icrc2_transfer_from, {
                    args: [transferFromArgs]
                });
            }
        }
    ),
    icrc2_allowance: update(
        [AllowanceArgs],
        AllowanceResult,
        async (allowanceArgs) => {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${getIcrcPrincipal()}/icrc2_allowance`,
                    {
                        body: serialize({
                            candidPath: '/candid/icrc.did',
                            args: [
                                {
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
                                }
                            ]
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await ic.call(icrc.icrc2_allowance, {
                    args: [allowanceArgs]
                });
            }
        }
    )
});

function getIcrcPrincipal(): string {
    return (
        process.env.ICRC_PRINCIPAL ??
        ic.trap('process.env.ICRC_PRINCIPAL is undefined')
    );
}

function azleOptToAgentOpt<T>(opt: Opt<T>): [T] | [] {
    if ('None' in opt) {
        return [];
    } else {
        return [opt.Some];
    }
}
