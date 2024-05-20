import { jsonParse, jsonStringify } from 'azle';
import { BitcoinNetwork } from 'azle/canisters/management';
import { determineKeyName, determineNetwork } from 'basic_bitcoin/src';
import * as bitcoinApi from 'basic_bitcoin/src/bitcoin_api';
import express, { Request } from 'express';

import * as bitcoinWallet from './bitcoin_wallet';

// The bitcoin network to connect to.
//
// When developing locally this should be `Regtest`.
// When deploying to the IC this should be `Testnet`.
// `Mainnet` is currently unsupported.
const NETWORK: BitcoinNetwork = determineNetwork(
    process.env.BITCOIN_NETWORK
) ?? {
    testnet: null
};

// The derivation path to use for ECDSA secp256k1.
const DERIVATION_PATH: Uint8Array[] = [];

// The ECDSA key name.
const KEY_NAME: string = determineKeyName(NETWORK);

const app = express();

app.use(express.json());

/// Returns the balance of the given bitcoin address.
app.get(
    '/get-balance',
    async (req: Request<any, any, any, { address: string }>, res) => {
        const balance = await bitcoinApi.getBalance(NETWORK, req.query.address);

        res.send(jsonStringify(balance));
    }
);

/// Returns the UTXOs of the given bitcoin address.
app.get(
    '/get-utxos',
    async (req: Request<any, any, any, { address: string }>, res) => {
        const utxos = await bitcoinApi.getUtxos(NETWORK, req.query.address);

        res.send(jsonStringify(utxos));
    }
);

/// Returns the 100 fee percentiles measured in millisatoshi/byte.
/// Percentiles are computed from the last 10,000 transactions (if available).
app.get('/get-current-fee-percentiles', async (req, res) => {
    const feePercentiles = await bitcoinApi.getCurrentFeePercentiles(NETWORK);

    res.send(jsonStringify(feePercentiles));
});

/// Returns the P2WPKH address of this canister at a specific derivation path.
app.get('/get-p2wpkh-address', async (req, res) => {
    const address = await bitcoinWallet.getP2wpkhAddress(
        NETWORK,
        KEY_NAME,
        DERIVATION_PATH
    );

    res.send(address);
});

/// Sends the given amount of bitcoin from this canister to the given address.
/// Returns the transaction ID.
app.post('/send', async (req, res) => {
    const { destinationAddress, amountInSatoshi } = req.body;

    const txId = await bitcoinWallet.send(
        NETWORK,
        DERIVATION_PATH,
        KEY_NAME,
        destinationAddress,
        BigInt(jsonParse(JSON.stringify(amountInSatoshi)))
    );

    res.send(txId);
});

app.listen();
