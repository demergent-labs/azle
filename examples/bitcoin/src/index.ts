import { blob, bool, ic, None, Service, text, update, Vec } from 'azle';
import {
    GetUtxosResult,
    managementCanister,
    MillisatoshiPerByte,
    Satoshi
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;
const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

export default class extends Service {
    @update([text], Satoshi)
    async getBalance(address: string): Promise<Satoshi> {
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

    @update([], Vec(MillisatoshiPerByte))
    async getCurrentFeePercentiles(): Promise<Vec<MillisatoshiPerByte>> {
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

    @update([text], GetUtxosResult)
    async getUtxos(address: text): Promise<GetUtxosResult> {
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

    @update([blob], bool)
    async sendTransaction(transaction: blob): Promise<bool> {
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
    }
}
