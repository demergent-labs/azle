import { blob, $update, Variant } from 'azle';
import {
    BitcoinNetwork,
    GetUtxosResult,
    management_canister,
    MillisatoshiPerByte,
    Satoshi
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;
const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

$update;
export async function get_balance(address: string): Promise<
    Variant<{
        ok: Satoshi;
        err: string;
    }>
> {
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

$update;
export async function get_current_fee_percentiles(): Promise<
    Variant<{
        ok: MillisatoshiPerByte[];
        err: string;
    }>
> {
    const canister_result = await management_canister
        .bitcoin_get_current_fee_percentiles({
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();

    return canister_result;
}

$update;
export async function get_utxos(address: string): Promise<
    Variant<{
        ok: GetUtxosResult;
        err: string;
    }>
> {
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

$update;
export async function send_transaction(transaction: blob): Promise<
    Variant<{
        ok: null;
        err: string;
    }>
> {
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
