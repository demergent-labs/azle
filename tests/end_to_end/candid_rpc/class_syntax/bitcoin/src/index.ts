import { call, IDL, update } from 'azle';
import {
    FUNCS,
    GetBalanceArgs,
    GetCurrentFeePercentilesArgs,
    GetUtxosArgs,
    GetUtxosResult,
    MillisatoshiPerByte,
    PRINCIPAL,
    Satoshi,
    SendTransactionArgs
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;
const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

export default class {
    @update([IDL.Text], Satoshi)
    async getBalance(address: string) {
        return await call(PRINCIPAL, FUNCS.bitcoin_get_balance, {
            paramIdls: [GetBalanceArgs],
            returnIdl: Satoshi,
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

    @update([], IDL.Vec(MillisatoshiPerByte))
    async getCurrentFeePercentiles() {
        return await call(
            PRINCIPAL,
            FUNCS.bitcoin_get_current_fee_percentiles,
            {
                paramIdls: [GetCurrentFeePercentilesArgs],
                returnIdl: IDL.Vec(MillisatoshiPerByte),
                args: [
                    {
                        network: { regtest: null }
                    }
                ],
                payment: BITCOIN_API_CYCLE_COST
            }
        );
    }

    @update([IDL.Text], GetUtxosResult)
    async getUtxos(address: string) {
        return await call(PRINCIPAL, FUNCS.bitcoin_get_utxos, {
            paramIdls: [GetUtxosArgs],
            returnIdl: GetUtxosResult,
            args: [
                {
                    address,
                    filter: [],
                    network: { regtest: null }
                }
            ],
            payment: BITCOIN_API_CYCLE_COST
        });
    }

    @update([IDL.Vec(IDL.Nat8)], bool)
    async sendTransaction(transaction: Uint8Array): Promise<boolean> {
        const transactionFee =
            BITCOIN_BASE_TRANSACTION_COST +
            BigInt(transaction.length) *
                BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

        await call(PRINCIPAL, FUNCS.bitcoin_send_transaction, {
            paramIdls: [SendTransactionArgs],
            args: [
                {
                    transaction,
                    network: { regtest: null }
                }
            ],
            payment: transactionFee
        });

        return true;
    }
}
