import { call, IDL, query, update } from 'azle';
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
    @query([], Vec(Tuple(text, Value)))
    async icrc1_metadata() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_metadata`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call(icrc.icrc1_metadata);
        }
    }
    @query([], text)
    async icrc1_name() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_name`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call(icrc.icrc1_name);
        }
    }
    @query([], nat8)
    async icrc1_decimals() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_decimals`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call(icrc.icrc1_decimals);
        }
    }
    @query([], text)
    async icrc1_symbol() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_symbol`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call(icrc.icrc1_symbol);
        }
    }
    @query([], nat)
    async icrc1_fee() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_fee`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call(icrc.icrc1_fee);
        }
    }
    @query([], nat)
    async icrc1_total_supply() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_total_supply`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call(icrc.icrc1_total_supply);
        }
    }
    @query([], Opt(Account))
    async icrc1_minting_account() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_minting_account`,
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
            return await call(icrc.icrc1_minting_account);
        }
    }
    @query([Account], nat)
    async icrc1_balance_of(account) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_balance_of`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did',
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
            return await call(icrc.icrc1_balance_of, {
                args: [account]
            });
        }
    }
    @update([TransferArgs], TransferResult)
    async icrc1_transfer(transferArgs) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_transfer`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did',
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
            return await call(icrc.icrc1_transfer, {
                args: [transferArgs]
            });
        }
    }
    @query([], Vec(SupportedStandard))
    async icrc1_supported_standards() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc1_supported_standards`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did'
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call(icrc.icrc1_supported_standards);
        }
    }
    @update([ApproveArgs], ApproveResult)
    async icrc2_approve(approveArgs) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc2_approve`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did',
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
            return await call(icrc.icrc2_approve, {
                args: [approveArgs]
            });
        }
    }
    @update([TransferFromArgs], TransferFromResult)
    async icrc2_transfer_from(transferFromArgs) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc2_transfer_from`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did',
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
                                fee: azleOptToAgentOpt(transferFromArgs.fee),
                                memo: azleOptToAgentOpt(transferFromArgs.memo),
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
            return await call(icrc.icrc2_transfer_from, {
                args: [transferFromArgs]
            });
        }
    }
    @update([AllowanceArgs], AllowanceResult)
    async icrc2_allowance(allowanceArgs) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcrcPrincipal()}/icrc2_allowance`,
                {
                    body: serialize({
                        candidPath: '/candid/icp/icrc.did',
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
            return await call(icrc.icrc2_allowance, {
                args: [allowanceArgs]
            });
        }
    }
}

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