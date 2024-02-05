import {
    blob,
    bool,
    Canister,
    ic,
    None,
    serialize,
    text,
    update,
    Vec
} from 'azle';
import {
    GetUtxosResult,
    managementCanister,
    MillisatoshiPerByte,
    Satoshi
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;
const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;
/*

    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(`icp://aaaaa-aa/raw_rand`);
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await ic.call(managementCanister.raw_rand);
    }

    */

export default Canister({
    getBalance: update([text], Satoshi, async (address) => {
        if (process.env.AZLE_TEST_FETCH === 'true' || true) {
            const response = await fetch(`icp://aaaaa-aa/bitcoin_get_balance`, {
                body: serialize({
                    args: [
                        {
                            address,
                            min_confirmations: [],
                            network: { Regtest: null }
                        }
                    ],
                    cycles: BITCOIN_API_CYCLE_COST
                })
            });
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(managementCanister.bitcoin_get_balance, {
                args: [
                    {
                        address,
                        min_confirmations: None,
                        network: { Regtest: null }
                    }
                ],
                cycles: BITCOIN_API_CYCLE_COST
            });
        }
    }),
    getCurrentFeePercentiles: update([], Vec(MillisatoshiPerByte), async () => {
        if (process.env.AZLE_TEST_FETCH === 'true' || true) {
            const response = await fetch(
                `icp://aaaaa-aa/bitcoin_get_current_fee_percentiles`,
                {
                    body: serialize({
                        args: [
                            {
                                network: { Regtest: null }
                            }
                        ],
                        cycles: BITCOIN_API_CYCLE_COST
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(
                managementCanister.bitcoin_get_current_fee_percentiles,
                {
                    args: [
                        {
                            network: { Regtest: null }
                        }
                    ],
                    cycles: BITCOIN_API_CYCLE_COST
                }
            );
        }
    }),
    getUtxos: update([text], GetUtxosResult, async (address) => {
        if (process.env.AZLE_TEST_FETCH === 'true' || true) {
            const response = await fetch(`icp://aaaaa-aa/bitcoin_get_utxos`, {
                body: serialize({
                    args: [
                        {
                            address,
                            filter: [],
                            network: { Regtest: null }
                        }
                    ],
                    cycles: BITCOIN_API_CYCLE_COST
                })
            });
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(managementCanister.bitcoin_get_utxos, {
                args: [
                    {
                        address,
                        filter: None,
                        network: { Regtest: null }
                    }
                ],
                cycles: BITCOIN_API_CYCLE_COST
            });
        }
    }),
    sendTransaction: update([blob], bool, async (transaction) => {
        const transactionFee =
            BITCOIN_BASE_TRANSACTION_COST +
            BigInt(transaction.length) *
                BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

        if (process.env.AZLE_TEST_FETCH === 'true' || true) {
            const response = await fetch(
                `icp://aaaaa-aa/bitcoin_send_transaction`,
                {
                    body: serialize({
                        args: [
                            {
                                transaction,
                                network: { Regtest: null }
                            }
                        ],
                        cycles: transactionFee
                    })
                }
            );
            await response.json();
        } else {
            await ic.call(managementCanister.bitcoin_send_transaction, {
                args: [
                    {
                        transaction,
                        network: { Regtest: null }
                    }
                ],
                cycles: transactionFee
            });
        }

        return true;
    })
});
