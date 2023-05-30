import { blob, $init, match, nat64, $postUpgrade, $update, Vec } from 'azle';
import {
    BitcoinNetwork,
    GetUtxosResult,
    MillisatoshiPerByte
} from 'azle/canisters/management';

import * as bitcoinApi from './bitcoin_api';
import * as bitcoinWallet from './bitcoin_wallet';
import { SendRequest } from './types';

// The bitcoin network to connect to.
//
// When developing locally this should be `Regtest`.
// When deploying to the IC this should be `Testnet`.
// `Mainnet` is currently unsupported.
let NETWORK: BitcoinNetwork = {
    Testnet: null
};

// The derivation path to use for ECDSA secp256k1.
let DERIVATION_PATH: Vec<blob> = [];

// The ECDSA key name.
let KEY_NAME: string = '';

$init;
export function init(network: BitcoinNetwork): void {
    NETWORK = network;

    KEY_NAME = match(network, {
        Mainnet: () => 'test_key_1',
        Testnet: () => 'test_key_1',
        Regtest: () => 'dfx_test_key'
    });
}

$postUpgrade;
export function postUpgrade(network: BitcoinNetwork): void {
    NETWORK = network;

    KEY_NAME = match(network, {
        Mainnet: () => 'test_key_1',
        Testnet: () => 'test_key_1',
        Regtest: () => 'dfx_test_key'
    });
}

/// Returns the balance of the given bitcoin address.
$update;
export async function getBalance(address: string): Promise<nat64> {
    return await bitcoinApi.getBalance(NETWORK, address);
}

/// Returns the UTXOs of the given bitcoin address.
$update;
export async function getUtxos(address: string): Promise<GetUtxosResult> {
    return await bitcoinApi.getUtxos(NETWORK, address);
}

/// Returns the 100 fee percentiles measured in millisatoshi/byte.
/// Percentiles are computed from the last 10,000 transactions (if available).
$update;
export async function getCurrentFeePercentiles(): Promise<
    Vec<MillisatoshiPerByte>
> {
    return await bitcoinApi.getCurrentFeePercentiles(NETWORK);
}

/// Returns the P2PKH address of this canister at a specific derivation path.
$update;
export async function getP2PKHAddress(): Promise<string> {
    return await bitcoinWallet.getP2PKHAddress(
        NETWORK,
        KEY_NAME,
        DERIVATION_PATH
    );
}

$update;
export async function send(request: SendRequest): Promise<string> {
    const txId = await bitcoinWallet.send(
        NETWORK,
        DERIVATION_PATH,
        KEY_NAME,
        request.destinationAddress,
        request.amountInSatoshi
    );

    return txId.to_string();
}
