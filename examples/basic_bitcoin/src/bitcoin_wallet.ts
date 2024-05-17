//! A demo of a very bare-bones bitcoin "wallet".
//!
//! The wallet here showcases how bitcoin addresses can be be computed
//! and how bitcoin transactions can be signed. It is missing several
//! pieces that any production-grade wallet would have, including:
//!
//! * Support for address types that aren't P2PKH.
//! * Caching spent UTXOs so that they are not reused in future transactions.
//! * Option to set the fee.
import {
    BitcoinNetwork,
    MillisatoshiPerByte,
    Satoshi,
    Utxo
} from 'azle/canisters/management';
import * as bitcoin from 'bitcoinjs-lib';
import { Network, networks, Transaction } from 'bitcoinjs-lib';
import { Buffer } from 'buffer';

import * as bitcoinApi from './bitcoin_api';
import * as ecdsaApi from './ecdsa_api';

export type SignFun = (
    keyName: string,
    derivationPath: Uint8Array[],
    messageHash: Uint8Array
) => Promise<Uint8Array> | Uint8Array;

const SIG_HASH_TYPE = Transaction.SIGHASH_ALL;

/// Returns the P2PKH address of this canister at the given derivation path.
export async function getP2pkhAddress(
    network: BitcoinNetwork,
    keyName: string,
    derivationPath: Uint8Array[]
): Promise<string> {
    // Fetch the public key of the given derivation path.
    const publicKey = await ecdsaApi.ecdsaPublicKey(keyName, derivationPath);

    // Compute the address.
    return publicKeyToP2pkhAddress(network, publicKey);
}

/// Sends a transaction to the network that transfers the given amount to the
/// given destination, where the source of the funds is the canister itself
/// at the given derivation path.
export async function send(
    network: BitcoinNetwork,
    derivationPath: Uint8Array[],
    keyName: string,
    dstAddress: string,
    amount: Satoshi
): Promise<string> {
    // Get fee percentiles from previous transactions to estimate our own fee.
    const feePercentiles = await bitcoinApi.getCurrentFeePercentiles(network);

    const feePerByte =
        feePercentiles.length === 0
            ? // There are no fee percentiles. This case can only happen on a regtest
              // network where there are no non-coinbase transactions. In this case,
              // we use a default of 2000 millisatoshis/byte (i.e. 2 satoshi/byte)
              2_000n
            : // Choose the 50th percentile for sending fees.
              feePercentiles[50];

    // Fetch our public key, P2PKH address, and UTXOs.
    const ownPublicKey = await ecdsaApi.ecdsaPublicKey(keyName, derivationPath);
    const ownAddress = publicKeyToP2pkhAddress(network, ownPublicKey);

    console.info('Fetching UTXOs...');
    // Note that pagination may have to be used to get all UTXOs for the given address.
    // For the sake of simplicity, it is assumed here that the `utxo` field in the response
    // contains all UTXOs.
    const ownUtxos = (await bitcoinApi.getUtxos(network, ownAddress.toString()))
        .utxos;

    // Build the transaction that sends `amount` to the destination address.
    const transaction = await buildTransaction(
        ownPublicKey,
        ownAddress,
        ownUtxos,
        dstAddress,
        amount,
        feePerByte,
        network
    );

    console.info(`Transaction to sign: ${transaction.toHex()}`);

    const signedTransaction = await signTransaction(
        ownPublicKey,
        ownAddress,
        transaction,
        keyName,
        derivationPath,
        ecdsaApi.signWithECDSA,
        network
    );

    const signedTransactionBytes = signedTransaction.toBuffer();
    console.info(
        `Signed transaction: ${signedTransactionBytes.toString('hex')}`
    );

    console.info('Sending transaction...');
    await bitcoinApi.sendTransaction(network, signedTransactionBytes);
    console.info('Done');

    return signedTransaction.getId();
}

// Builds a transaction to send the given `amount` of satoshis to the
// destination address.
async function buildTransaction(
    ownPublicKey: Uint8Array,
    ownAddress: string,
    ownUtxos: Utxo[],
    dstAddress: string,
    amount: Satoshi,
    feePerByte: MillisatoshiPerByte,
    network: BitcoinNetwork
): Promise<Transaction> {
    // We have a chicken-and-egg problem where we need to know the length
    // of the transaction in order to compute its proper fee, but we need
    // to know the proper fee in order to figure out the inputs needed for
    // the transaction.
    //
    // We solve this problem iteratively. We start with a fee of zero, build
    // and sign a transaction, see what its size is, and then update the fee,
    // rebuild the transaction, until the fee is set to the correct amount.
    console.info('Building transaction...');
    let totalFee = 0n;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const transaction = buildTransactionWithFee(
            ownUtxos,
            ownAddress,
            dstAddress,
            amount,
            totalFee,
            network
        );

        // Sign the transaction. In this case, we only care about the size
        // of the signed transaction.
        const signedTransaction = await signTransaction(
            ownPublicKey,
            ownAddress,
            transaction.clone(),
            '', // mock key name
            [], // mock derivation path
            mockSigner,
            network
        );

        const signedTxBytesLen = BigInt(signedTransaction.byteLength());

        if ((signedTxBytesLen * feePerByte) / 1_000n === totalFee) {
            console.info(`Transaction built with fee ${totalFee}.`);
            return transaction;
        } else {
            totalFee = (signedTxBytesLen * feePerByte) / 1_000n;
        }
    }
}

function buildTransactionWithFee(
    ownUtxos: Utxo[],
    ownAddress: string,
    destAddress: string,
    amount: bigint,
    fee: bigint,
    network: BitcoinNetwork
): Transaction {
    // Assume that any amount below this threshold is dust.
    const dustThreshold = 1_000n;

    // Select which UTXOs to spend. We naively spend the oldest available UTXOs,
    // even if they were previously spent in a transaction. This isn't a
    // problem as long as at most one transaction is created per block and
    // we're using min_confirmations of 1.
    let utxosToSpend: Utxo[] = [];
    let totalSpent = 0n;
    for (const utxo of [...ownUtxos].reverse()) {
        totalSpent += utxo.value;
        utxosToSpend.push(utxo);
        if (totalSpent >= amount + fee) {
            // We have enough inputs to cover the amount we want to spend.
            break;
        }
    }

    if (totalSpent < amount + fee) {
        throw new Error(
            `Insufficient balance: ${totalSpent}, trying to transfer ${amount} satoshi with fee ${fee}`
        );
    }

    let transaction = new Transaction();
    transaction.version = 1;

    for (const utxo of utxosToSpend) {
        transaction.addInput(
            Buffer.from(utxo.outpoint.txid),
            utxo.outpoint.vout
        );
    }

    transaction.addOutput(
        createScriptPubkey(destAddress, network),
        Number(amount)
    );

    const remainingAmount = totalSpent - amount - fee;

    if (remainingAmount >= dustThreshold) {
        transaction.addOutput(
            createScriptPubkey(ownAddress, network),
            Number(remainingAmount)
        );
    }

    return transaction;
}

// Sign a bitcoin transaction.
//
// IMPORTANT: This method is for demonstration purposes only and it only
// supports signing transactions if:
//
// 1. All the inputs are referencing outpoints that are owned by `own_address`.
// 2. `own_address` is a P2PKH address.
async function signTransaction(
    ownPublicKey: Uint8Array,
    ownAddress: string,
    transaction: Transaction,
    keyName: string,
    derivationPath: Uint8Array[],
    signer: SignFun,
    network: BitcoinNetwork
): Promise<Transaction> {
    const addressVersion = bitcoin.address.fromBase58Check(ownAddress).version;
    if (
        addressVersion !== bitcoin.networks.bitcoin.pubKeyHash &&
        addressVersion !== bitcoin.networks.testnet.pubKeyHash &&
        addressVersion !== bitcoin.networks.regtest.pubKeyHash
    ) {
        throw new Error('This example supports signing p2pkh addresses only.');
    }

    for (let i = 0; i < transaction.ins.length; i++) {
        const sighash = transaction.hashForSignature(
            i,
            createScriptPubkey(ownAddress, network),
            SIG_HASH_TYPE
        );

        const signature = await signer(keyName, derivationPath, sighash);

        const encodedSig = bitcoin.script.signature.encode(
            Buffer.from(signature),
            SIG_HASH_TYPE
        );

        const scriptSig = bitcoin.script.compile([
            encodedSig,
            Buffer.from(ownPublicKey)
        ]);

        transaction.setInputScript(i, Buffer.from(scriptSig));
    }

    return transaction;
}

// Converts a public key to a P2PKH address.
function publicKeyToP2pkhAddress(
    network: BitcoinNetwork,
    publicKey: Uint8Array
): string {
    const { address } = bitcoin.payments.p2pkh({
        pubkey: Buffer.from(publicKey),
        network: determineNetwork(network)
    });
    if (address === undefined) {
        throw new Error('Unable to get address from the canister');
    }
    return address;
}

// A mock for rubber-stamping ECDSA signatures.
export function mockSigner(
    _keyName: string,
    _derivationPath: Uint8Array[],
    _messageHash: Uint8Array
): Uint8Array {
    // bitcoin.script.signature.encode threw away most of the signature when it was all 0s so we need to fill it up with anything besides just 0s
    return Uint8Array.from(new Array(64).fill(1));
}

export function determineNetwork(network: BitcoinNetwork): Network {
    if (network.mainnet === null) {
        return networks.bitcoin;
    }
    if (network.testnet === null) {
        return networks.testnet;
    }
    if (network.regtest === null) {
        return networks.regtest;
    }
    throw new Error(`Unknown Network: ${network}`);
}

function createScriptPubkey(address: string, network: BitcoinNetwork): Buffer {
    const pubKeyHash = bitcoin.address
        .toOutputScript(address, determineNetwork(network))
        .subarray(3, 23);
    const result = bitcoin.script.compile([
        bitcoin.opcodes.OP_DUP,
        bitcoin.opcodes.OP_HASH160,
        pubKeyHash,
        bitcoin.opcodes.OP_EQUALVERIFY,
        bitcoin.opcodes.OP_CHECKSIG
    ]);

    return result;
}
