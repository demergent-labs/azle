import { call } from 'azle';
import {
    AccountBalanceArgs,
    Archives,
    DecimalsResult,
    GetBlocksArgs,
    NameResult,
    QueryBlocksResponse,
    SymbolResult,
    Tokens,
    TransferArgs,
    TransferFee,
    TransferFeeArg,
    TransferResult
} from 'azle/canisters/icp';
import {
    Canister,
    nat32,
    nat64,
    None,
    Opt,
    Principal,
    query,
    serialize,
    Some,
    text,
    update
} from 'azle/experimental';
import {
    Address,
    Archives as ArchivesExperimental,
    binaryAddressFromAddress,
    GetBlocksArgs as GetBlocksArgsExperimental,
    hexAddressFromPrincipal,
    QueryBlocksResponse as QueryBlocksResponseExperimental,
    Tokens as TokensExperimental,
    TransferFee as TransferFeeExperimental,
    TransferResult as TransferResultExperimental
} from 'azle/experimental/canisters/ledger';

export default Canister({
    executeTransfer: update(
        [Address, nat64, nat64, Opt(nat64)],
        TransferResultExperimental,
        async (to, amount, fee, createdAtTime) => {
            const icpCanisterPrincipal = getIcpCanisterPrincipal();

            const arg: TransferArgs = {
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
                                  timestamp_nanos: createdAtTime.Some
                              }
                          ]
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${icpCanisterPrincipal}/transfer`,
                    {
                        body: serialize({
                            candidPath: `/src/ledger.did`,
                            args: [arg]
                        })
                    }
                );

                return await response.json();
            } else {
                return await call<[TransferArgs], TransferResult>(
                    icpCanisterPrincipal,
                    'transfer',
                    {
                        paramIdlTypes: [TransferArgs],
                        returnIdlType: TransferResult,
                        args: [arg]
                    }
                );
            }
        }
    ),
    getAccountBalance: update(
        [Address],
        TokensExperimental,
        async (address) => {
            const icpCanisterPrincipal = getIcpCanisterPrincipal();

            const arg: AccountBalanceArgs = {
                account: binaryAddressFromAddress(address)
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${icpCanisterPrincipal}/account_balance`,
                    {
                        body: serialize({
                            candidPath: `/src/ledger.did`,
                            args: [arg]
                        })
                    }
                );

                return await response.json();
            } else {
                return await call<[AccountBalanceArgs], Tokens>(
                    icpCanisterPrincipal,
                    'account_balance',
                    {
                        paramIdlTypes: [AccountBalanceArgs],
                        returnIdlType: Tokens,
                        args: [arg]
                    }
                );
            }
        }
    ),
    getTransferFee: update([], TransferFeeExperimental, async () => {
        const icpCanisterPrincipal = getIcpCanisterPrincipal();

        const arg: TransferFeeArg = {};

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${icpCanisterPrincipal}/transfer_fee`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`,
                        args: [arg]
                    })
                }
            );

            return await response.json();
        } else {
            return await call<[TransferFeeArg], TransferFee>(
                icpCanisterPrincipal,
                'transfer_fee',
                {
                    paramIdlTypes: [TransferFeeArg],
                    returnIdlType: TransferFee,
                    args: [arg]
                }
            );
        }
    }),
    getBlocks: update(
        [GetBlocksArgsExperimental],
        QueryBlocksResponseExperimental,
        async (getBlocksArgs) => {
            const icpCanisterPrincipal = getIcpCanisterPrincipal();

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${icpCanisterPrincipal}/query_blocks`,
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
                const {
                    archived_blocks,
                    blocks,
                    certificate,
                    chain_length,
                    first_block_index
                } = await call<[GetBlocksArgs], QueryBlocksResponse>(
                    icpCanisterPrincipal,
                    'query_blocks',
                    {
                        paramIdlTypes: [GetBlocksArgs],
                        returnIdlType: QueryBlocksResponse,
                        args: [getBlocksArgs]
                    }
                );
                const azleBlocks = blocks.map((block) => {
                    const { parent_hash, timestamp, transaction } = block;
                    const { created_at_time, memo, operation } = transaction;

                    return {
                        parent_hash,
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
                    certificate,
                    chain_length,
                    first_block_index
                } as unknown as QueryBlocksResponseExperimental;
            }
        }
    ),
    getSymbol: update([], text, async () => {
        const icpCanisterPrincipal = getIcpCanisterPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${icpCanisterPrincipal}/symbol`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`
                    })
                }
            );

            return (await response.json()).symbol;
        } else {
            const result = await call<undefined, SymbolResult>(
                icpCanisterPrincipal,
                'symbol',
                {
                    returnIdlType: SymbolResult
                }
            );

            return result.symbol;
        }
    }),
    getName: update([], text, async () => {
        const icpCanisterPrincipal = getIcpCanisterPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(`icp://${icpCanisterPrincipal}/name`, {
                body: serialize({
                    candidPath: `/src/ledger.did`
                })
            });

            return (await response.json()).name;
        } else {
            const result = await call<undefined, NameResult>(
                icpCanisterPrincipal,
                'name',
                {
                    returnIdlType: NameResult
                }
            );

            return result.name;
        }
    }),
    getDecimals: update([], nat32, async () => {
        const icpCanisterPrincipal = getIcpCanisterPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${icpCanisterPrincipal}/decimals`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`
                    })
                }
            );

            return (await response.json()).decimals;
        } else {
            const result = await call<undefined, DecimalsResult>(
                icpCanisterPrincipal,
                'decimals',
                {
                    returnIdlType: DecimalsResult
                }
            );

            return result.decimals;
        }
    }),
    getArchives: update([], ArchivesExperimental, async () => {
        const icpCanisterPrincipal = getIcpCanisterPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${icpCanisterPrincipal}/archives`,
                {
                    body: serialize({
                        candidPath: `/src/ledger.did`
                    })
                }
            );

            return await response.json();
        } else {
            return await call<undefined, Archives>(
                icpCanisterPrincipal,
                'archives',
                {
                    returnIdlType: Archives
                }
            );
        }
    }),
    getAddressFromPrincipal: query([Principal], text, (principal) => {
        return hexAddressFromPrincipal(principal, 0);
    })
});

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
