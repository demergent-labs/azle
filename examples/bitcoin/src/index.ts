import { blob, bool, Canister, ic, None, text, update, Vec } from 'azle';
import {
    GetUtxosResult,
    managementCanister,
    MillisatoshiPerByte,
    Satoshi
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;
const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

export default Canister({
    getBalance: update([text], Satoshi, async (address) => {
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
    }),
    getCurrentFeePercentiles: update([], Vec(MillisatoshiPerByte), async () => {
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
    }),
    getUtxos: update([text], GetUtxosResult, async (address) => {
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
    }),
    sendTransaction: update([blob], bool, async (transaction) => {
        const transactionFee =
            BITCOIN_BASE_TRANSACTION_COST +
            BigInt(transaction.length) *
                BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

        await ic.call(managementCanister.bitcoin_send_transaction, {
            args: [
                {
                    transaction,
                    network: { Regtest: null }
                }
            ],
            cycles: transactionFee
        });

        return true;
    })
});
