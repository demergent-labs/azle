import { blob, CanisterResult, Update } from 'azle';
import {
    BitcoinNetwork,
    GetUtxosResult,
    ManagementCanister,
    MillisatoshiPerByte,
    Satoshi
} from 'azle/canisters/management';
import {
    ExecuteGetBalanceResult,
    ExecuteGetCurrentFeePercentiles,
    ExecuteGetUtxosResult,
    ExecuteSendTransactionResult
} from './types';

const BITCOIN_API_CYCLE_COST = 100_000_000n;
const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

export function* get_balance(address: string): Update<ExecuteGetBalanceResult> {
    const canister_result: CanisterResult<Satoshi> =
        yield ManagementCanister.bitcoin_get_balance({
            address,
            min_confirmations: null,
            network: BitcoinNetwork.Regtest
        }).with_cycles(BITCOIN_API_CYCLE_COST);

    return canister_result;
}

export function* get_current_fee_percentiles(): Update<ExecuteGetCurrentFeePercentiles> {
    const canister_result: CanisterResult<MillisatoshiPerByte[]> =
        yield ManagementCanister.bitcoin_get_current_fee_percentiles({
            network: BitcoinNetwork.Regtest
        }).with_cycles(BITCOIN_API_CYCLE_COST);

    return canister_result;
}

export function* get_utxos(address: string): Update<ExecuteGetUtxosResult> {
    const canister_result: CanisterResult<GetUtxosResult> =
        yield ManagementCanister.bitcoin_get_utxos({
            address,
            filter: null,
            network: BitcoinNetwork.Regtest
        }).with_cycles(BITCOIN_API_CYCLE_COST);

    return canister_result;
}

export function* send_transaction(
    transaction: blob
): Update<ExecuteSendTransactionResult> {
    const transaction_fee =
        BITCOIN_BASE_TRANSACTION_COST +
        BigInt(transaction.length) * BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

    const canister_result: CanisterResult<null> =
        yield ManagementCanister.bitcoin_send_transaction({
            transaction,
            network: BitcoinNetwork.Regtest
        }).with_cycles(transaction_fee);

    return canister_result;
}
