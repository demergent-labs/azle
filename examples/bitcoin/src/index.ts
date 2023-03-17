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
        Ok: Satoshi;
        Err: string;
    }>
> {
    return await management_canister
        .bitcoin_get_balance({
            address,
            min_confirmations: null,
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();
}

$update;
export async function get_current_fee_percentiles(): Promise<
    Variant<{
        Ok: MillisatoshiPerByte[];
        Err: string;
    }>
> {
    return await management_canister
        .bitcoin_get_current_fee_percentiles({
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();
}

$update;
export async function get_utxos(address: string): Promise<
    Variant<{
        Ok: GetUtxosResult;
        Err: string;
    }>
> {
    return await management_canister
        .bitcoin_get_utxos({
            address,
            filter: null,
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();
}

$update;
export async function send_transaction(transaction: blob): Promise<
    Variant<{
        Ok: null;
        Err: string;
    }>
> {
    const transaction_fee =
        BITCOIN_BASE_TRANSACTION_COST +
        BigInt(transaction.length) * BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

    return await management_canister
        .bitcoin_send_transaction({
            transaction,
            network: BitcoinNetwork.Regtest
        })
        .cycles(transaction_fee)
        .call();
}
