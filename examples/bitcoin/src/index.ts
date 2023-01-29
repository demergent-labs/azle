import { blob, Update } from 'azle';
import { BitcoinNetwork, management_canister } from 'azle/canisters/management';
import {
    ExecuteGetBalanceResult,
    ExecuteGetCurrentFeePercentiles,
    ExecuteGetUtxosResult,
    ExecuteSendTransactionResult
} from './types';

const BITCOIN_API_CYCLE_COST = 100_000_000n;
const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

export async function get_balance(
    address: string
): Promise<Update<ExecuteGetBalanceResult>> {
    const canister_result = await management_canister
        .bitcoin_get_balance({
            address,
            min_confirmations: null,
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();

    return canister_result;
}

export async function get_current_fee_percentiles(): Promise<
    Update<ExecuteGetCurrentFeePercentiles>
> {
    const canister_result = await management_canister
        .bitcoin_get_current_fee_percentiles({
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();

    return canister_result;
}

export async function get_utxos(
    address: string
): Promise<Update<ExecuteGetUtxosResult>> {
    const canister_result = await management_canister
        .bitcoin_get_utxos({
            address,
            filter: null,
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();

    return canister_result;
}

export async function send_transaction(
    transaction: blob
): Promise<Update<ExecuteSendTransactionResult>> {
    const transaction_fee =
        BITCOIN_BASE_TRANSACTION_COST +
        BigInt(transaction.length) * BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

    const canister_result = await management_canister
        .bitcoin_send_transaction({
            transaction,
            network: BitcoinNetwork.Regtest
        })
        .cycles(transaction_fee)
        .call();

    return canister_result;
}

// class API

import { update } from 'azle';

export default class {
    @update
    async get_balance(address: string): Promise<ExecuteGetBalanceResult> {
        const canister_result = await management_canister
            .bitcoin_get_balance({
                address,
                min_confirmations: null,
                network: BitcoinNetwork.Regtest
            })
            .cycles(BITCOIN_API_CYCLE_COST)
            .call();

        return canister_result;
    }

    @update
    async get_current_fee_percentiles(): Promise<ExecuteGetCurrentFeePercentiles> {
        const canister_result = await management_canister
            .bitcoin_get_current_fee_percentiles({
                network: BitcoinNetwork.Regtest
            })
            .cycles(BITCOIN_API_CYCLE_COST)
            .call();

        return canister_result;
    }

    @update
    async get_utxos(address: string): Promise<ExecuteGetUtxosResult> {
        const canister_result = await management_canister
            .bitcoin_get_utxos({
                address,
                filter: null,
                network: BitcoinNetwork.Regtest
            })
            .cycles(BITCOIN_API_CYCLE_COST)
            .call();

        return canister_result;
    }

    @update
    async send_transaction(
        transaction: blob
    ): Promise<ExecuteSendTransactionResult> {
        const transaction_fee =
            BITCOIN_BASE_TRANSACTION_COST +
            BigInt(transaction.length) *
                BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

        const canister_result = await management_canister
            .bitcoin_send_transaction({
                transaction,
                network: BitcoinNetwork.Regtest
            })
            .cycles(transaction_fee)
            .call();

        return canister_result;
    }
}
