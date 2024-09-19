import { call, IDL, update } from 'azle';
import {
    bitcoin_get_balance_args,
    bitcoin_get_balance_result,
    bitcoin_get_current_fee_percentiles_args,
    bitcoin_get_current_fee_percentiles_result,
    bitcoin_get_utxos_args,
    bitcoin_get_utxos_result,
    bitcoin_send_transaction_args
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;
const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

export default class {
    @update([IDL.Text], bitcoin_get_balance_result)
    async getBalance(address: string): Promise<bitcoin_get_balance_result> {
        return await call<
            [bitcoin_get_balance_args],
            bitcoin_get_balance_result
        >('aaaaa-aa', 'bitcoin_get_balance', {
            paramIdlTypes: [bitcoin_get_balance_args],
            returnIdlType: bitcoin_get_balance_result,
            args: [
                {
                    address,
                    min_confirmations: [],
                    network: { regtest: null }
                }
            ],
            payment: BITCOIN_API_CYCLE_COST
        });
    }

    @update([], bitcoin_get_current_fee_percentiles_result)
    async getCurrentFeePercentiles(): Promise<bitcoin_get_current_fee_percentiles_result> {
        return await call<
            [bitcoin_get_current_fee_percentiles_args],
            bitcoin_get_current_fee_percentiles_result
        >('aaaaa-aa', 'bitcoin_get_current_fee_percentiles', {
            paramIdlTypes: [bitcoin_get_current_fee_percentiles_args],
            returnIdlType: bitcoin_get_current_fee_percentiles_result,
            args: [
                {
                    network: { regtest: null }
                }
            ],
            payment: BITCOIN_API_CYCLE_COST
        });
    }

    @update([IDL.Text], bitcoin_get_utxos_result)
    async getUtxos(address: string): Promise<bitcoin_get_utxos_result> {
        return await call<[bitcoin_get_utxos_args], bitcoin_get_utxos_result>(
            'aaaaa-aa',
            'bitcoin_get_utxos',
            {
                paramIdlTypes: [bitcoin_get_utxos_args],
                returnIdlType: bitcoin_get_utxos_result,
                args: [
                    {
                        address,
                        filter: [],
                        network: { regtest: null }
                    }
                ],
                payment: BITCOIN_API_CYCLE_COST
            }
        );
    }

    @update([IDL.Vec(IDL.Nat8)], IDL.Bool)
    async sendTransaction(transaction: Uint8Array): Promise<boolean> {
        const transactionFee =
            BITCOIN_BASE_TRANSACTION_COST +
            BigInt(transaction.length) *
                BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

        await call<[bitcoin_send_transaction_args], void>(
            'aaaaa-aa',
            'bitcoin_send_transaction',
            {
                paramIdlTypes: [bitcoin_send_transaction_args],
                args: [
                    {
                        transaction,
                        network: { regtest: null }
                    }
                ],
                payment: transactionFee
            }
        );

        return true;
    }
}
