import { call, IDL, query, update } from 'azle';
import {
    Address,
    Archives,
    binaryAddressFromAddress,
    GetBlocksArgs,
    hexAddressFromPrincipal,
    Ledger,
    QueryBlocksResponse,
    Tokens,
    TransferFee,
    TransferResult
} from 'azle/canisters/ledger';

let icpCanister: typeof Ledger;

export default class {
    @init([])
    init() {
        icpCanister = Ledger(Principal.fromText(getIcpCanisterPrincipal()));
    }
    @update([Address, nat64, nat64, Opt(nat64)], TransferResult)
    async executeTransfer(to, amount, fee, createdAtTime) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcpCanisterPrincipal()}/transfer`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`,
                        args: [
                            {
                                memo: 0n,
                                amount: {
                                    e8s: amount
                                },
                                fee: {
                                    e8s: fee
                                },
                                from_subaccount: [],
                                to: binaryAddressFromAddress(to),
                                created_at_time:
                                    'None' in createdAtTime
                                        ? []
                                        : [
                                              {
                                                  timestamp_nanos:
                                                      createdAtTime.Some
                                              }
                                          ]
                            }
                        ]
                    })
                }
            );

            return await response.json();
        } else {
            return await call(icpCanister.transfer, {
                args: [
                    {
                        memo: 0n,
                        amount: {
                            e8s: amount
                        },
                        fee: {
                            e8s: fee
                        },
                        from_subaccount: None,
                        to: binaryAddressFromAddress(to),
                        created_at_time:
                            'None' in createdAtTime
                                ? None
                                : Some({
                                      timestamp_nanos: createdAtTime.Some
                                  })
                    }
                ]
            });
        }
    }
    @update([Address], Tokens)
    async getAccountBalance(address) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcpCanisterPrincipal()}/account_balance`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`,
                        args: [
                            {
                                account: binaryAddressFromAddress(address)
                            }
                        ]
                    })
                }
            );

            return await response.json();
        } else {
            return await call(icpCanister.account_balance, {
                args: [
                    {
                        account: binaryAddressFromAddress(address)
                    }
                ]
            });
        }
    }
    @update([], TransferFee)
    async getTransferFee() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcpCanisterPrincipal()}/transfer_fee`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`,
                        args: [{}]
                    })
                }
            );

            return await response.json();
        } else {
            return await call(icpCanister.transfer_fee, { args: [{}] });
        }
    }
    @update([GetBlocksArgs], QueryBlocksResponse)
    async getBlocks(getBlocksArgs) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcpCanisterPrincipal()}/query_blocks`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`,
                        args: [getBlocksArgs]
                    })
                }
            );
            const {
                archived_blocks,
                blocks,
                certificate,
                chain_length,
                first_block_index
            } = await response.json();
            const azleBlocks = blocks.map((block: any) => {
                const { parent_hash, timestamp, transaction } = block;
                const { created_at_time, memo, operation } = transaction;

                return {
                    parent_hash: agentOptToAzleOpt(parent_hash),
                    timestamp,
                    transaction: {
                        created_at_time,
                        memo,
                        operation: agentOptToAzleOpt(operation)
                    }
                };
            });

            return {
                archived_blocks,
                blocks: azleBlocks,
                certificate: agentOptToAzleOpt(certificate),
                chain_length,
                first_block_index
            };
        } else {
            return await call(icpCanister.query_blocks, {
                args: [getBlocksArgs]
            });
        }
    }
    @update([], text)
    async getSymbol() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcpCanisterPrincipal()}/symbol`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`
                    })
                }
            );

            return (await response.json()).symbol;
        } else {
            const symbolResult = await call(icpCanister.symbol);

            return symbolResult.symbol;
        }
    }
    @update([], text)
    async getName() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcpCanisterPrincipal()}/name`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`
                    })
                }
            );

            return (await response.json()).name;
        } else {
            const nameResult = await call(icpCanister.name);

            return nameResult.name;
        }
    }
    @update([], nat32)
    async getDecimals() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcpCanisterPrincipal()}/decimals`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`
                    })
                }
            );

            return (await response.json()).decimals;
        } else {
            const decimalsResult = await call(icpCanister.decimals);

            return decimalsResult.decimals;
        }
    }
    @update([], Archives)
    async getArchives() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getIcpCanisterPrincipal()}/archives`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`
                    })
                }
            );

            return await response.json();
        } else {
            return await call(icpCanister.archives);
        }
    }
    @query([Principal], text)
    getAddressFromPrincipal(principal) {
        return hexAddressFromPrincipal(principal, 0);
    }
}

function agentOptToAzleOpt<T>(opt: [T] | []): Opt<T> {
    if (opt.length === 0) {
        return None;
    } else {
        return Some(opt[0]);
    }
}

function getIcpCanisterPrincipal(): string {
    if (process.env.ICP_CANISTER_PRINCIPAL !== undefined) {
        return process.env.ICP_CANISTER_PRINCIPAL;
    } else {
        throw new Error('process.env.ICP_CANISTER_PRINCIPAL is undefined');
    }
}