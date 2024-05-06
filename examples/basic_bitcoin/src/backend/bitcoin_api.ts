import { blob, nat64, serialize, Vec } from 'azle';
import {
    BitcoinNetwork,
    GetUtxosResult,
    MillisatoshiPerByte
} from 'azle/canisters/management/bitcoin';

// The fees for the various bitcoin endpoints.
const GET_BALANCE_COST_CYCLES: nat64 = 100_000_000n;
const GET_UTXOS_COST_CYCLES: nat64 = 10_000_000_000n;
const GET_CURRENT_FEE_PERCENTILES_CYCLES: nat64 = 100_000_000n;
const SEND_TRANSACTION_BASE_CYCLES: nat64 = 5_000_000_000n;
const SEND_TRANSACTION_PER_BYTE_CYCLES: nat64 = 20_000_000n;

/// Returns the balance of the given bitcoin address.
///
/// Relies on the `bitcoin_get_balance` endpoint.
/// See https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_get_balance
export async function getBalance(
    network: BitcoinNetwork,
    address: string
): Promise<nat64> {
    const response = await fetch(`icp://aaaaa-aa/bitcoin_get_balance`, {
        body: serialize({
            args: [
                {
                    address,
                    min_confirmations: [],
                    network
                }
            ],
            cycles: GET_BALANCE_COST_CYCLES
        })
    });
    return await response.json();
}

/// Returns the UTXOs of the given bitcoin address.
///
/// NOTE: Pagination is ignored in this example. If an address has many thousands
/// of UTXOs, then subsequent calls to `bitcoin_get_utxos` are required.
///
/// See https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_get_utxos
export async function getUtxos(
    network: BitcoinNetwork,
    address: string
): Promise<GetUtxosResult> {
    const response = await fetch(`icp://aaaaa-aa/bitcoin_get_utxos`, {
        body: serialize({
            args: [
                {
                    address,
                    filter: [],
                    network
                }
            ],
            cycles: GET_UTXOS_COST_CYCLES
        })
    });
    return await response.json();
}

/// Returns the 100 fee percentiles measured in millisatoshi/byte.
/// Percentiles are computed from the last 10,000 transactions (if available).
///
/// Relies on the `bitcoin_get_current_fee_percentiles` endpoint.
/// See https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_get_current_fee_percentiles
export async function getCurrentFeePercentiles(
    network: BitcoinNetwork
): Promise<Vec<MillisatoshiPerByte>> {
    const response = await fetch(
        `icp://aaaaa-aa/bitcoin_get_current_fee_percentiles`,
        {
            body: serialize({
                args: [
                    {
                        network
                    }
                ],
                cycles: GET_CURRENT_FEE_PERCENTILES_CYCLES
            })
        }
    );
    return await response.json();
}

/// Sends a (signed) transaction to the bitcoin network.
///
/// Relies on the `bitcoin_send_transaction` endpoint.
/// See https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin_send_transaction
export async function sendTransaction(
    network: BitcoinNetwork,
    transaction: blob
): Promise<void> {
    const transactionFee =
        SEND_TRANSACTION_BASE_CYCLES +
        BigInt(transaction.length) * SEND_TRANSACTION_PER_BYTE_CYCLES;

    try {
        await fetch(`icp://aaaaa-aa/bitcoin_send_transaction`, {
            body: serialize({
                args: [
                    {
                        transaction,
                        network
                    }
                ],
                cycles: transactionFee
            })
        });
    } catch (err: any) {
        console.log('There was an error sending the transaction');
        console.log(err.message);
        console.log(err);
        throw err;
    }
}
