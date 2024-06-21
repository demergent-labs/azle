import {
    GetUtxosResult,
    MillisatoshiPerByte,
    Satoshi
} from 'azle/canisters/management';
import { IDL, query, update } from 'azle';

const BITCOIN_API_CYCLE_COST = 100_000_000n;
const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

export default class {
    @update([text], Satoshi)
    async getBalance(address) {
        const response = await fetch(`icp://aaaaa-aa/bitcoin_get_balance`, {
            body: serialize({
                args: [
                    {
                        address,
                        min_confirmations: [],
                        network: { regtest: null }
                    }
                ],
                cycles: BITCOIN_API_CYCLE_COST
            })
        });
        const responseJson = await response.json();

        return responseJson;
    }
    @update([], Vec(MillisatoshiPerByte))
    async getCurrentFeePercentiles() {
        const response = await fetch(
            `icp://aaaaa-aa/bitcoin_get_current_fee_percentiles`,
            {
                body: serialize({
                    args: [
                        {
                            network: { regtest: null }
                        }
                    ],
                    cycles: BITCOIN_API_CYCLE_COST
                })
            }
        );
        const responseJson = await response.json();

        return responseJson;
    }
    @update([text], GetUtxosResult)
    async getUtxos(address) {
        const response = await fetch(`icp://aaaaa-aa/bitcoin_get_utxos`, {
            body: serialize({
                args: [
                    {
                        address,
                        filter: [],
                        network: { regtest: null }
                    }
                ],
                cycles: BITCOIN_API_CYCLE_COST
            })
        });
        const responseJson = await response.json();

        return responseJson;
    }
    @update([IDL.Vec(IDL.Nat8)], bool)
    async sendTransaction(transaction) {
        const transactionFee =
            BITCOIN_BASE_TRANSACTION_COST +
            BigInt(transaction.length) *
                BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

        await fetch(`icp://aaaaa-aa/bitcoin_send_transaction`, {
            body: serialize({
                args: [
                    {
                        transaction,
                        network: { regtest: null }
                    }
                ],
                cycles: transactionFee
            })
        });

        return true;
    }
}
