//! A demo of a very bare-bones bitcoin "wallet".
//!
//! The wallet here showcases how bitcoin addresses can be be computed
//! and how bitcoin transactions can be signed. It is missing several
//! pieces that any production-grade wallet would have, including:
//!
//! * Support for address types that aren't P2PKH.
//! * Caching spent UTXOs so that they are not reused in future transactions.
//! * Option to set the fee.
// import * as ecc from 'tiny-secp256k1'; // TODO we should switch to this import as soon as we have wasm support
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import {
    BitcoinNetwork,
    MillisatoshiPerByte,
    Satoshi,
    Utxo
} from 'azle/canisters/management';
import * as bitcoinApi from 'basic_bitcoin/src/bitcoin_api';
import {
    determineNetwork,
    mockSigner,
    SignFun
} from 'basic_bitcoin/src/bitcoin_wallet';
import * as ecdsaApi from 'basic_bitcoin/src/ecdsa_api';
import { address, payments, Psbt, Transaction } from 'bitcoinjs-lib';
import { ValidateSigFunction } from 'bitcoinjs-lib/src/psbt';
import { Buffer } from 'buffer';

/// Returns the P2PKH address of this canister at the given derivation path.
export async function getP2wpkhAddress(
    network: BitcoinNetwork,
    keyName: string,
    derivationPath: Uint8Array[]
): Promise<string> {
    // Fetch the public key of the given derivation path.
    const publicKey = await ecdsaApi.ecdsaPublicKey(keyName, derivationPath);

    // Compute the address.
    return publicKeyToP2wpkhAddress(network, publicKey);
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
    const ownAddress = publicKeyToP2wpkhAddress(network, ownPublicKey);

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
        transaction,
        keyName,
        derivationPath,
        ecdsaApi.signWithECDSA,
        validator
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
): Promise<Psbt> {
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
            transaction.clone(),
            '', // mock key name
            [], // mock derivation path
            mockSigner,
            mockValidator
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
    bitcoinNetwork: BitcoinNetwork
): Psbt {
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

    const network = determineNetwork(bitcoinNetwork);
    let transaction = new Psbt({ network });

    for (const utxo of utxosToSpend) {
        transaction.addInput({
            hash: Buffer.from(utxo.outpoint.txid),
            index: utxo.outpoint.vout,
            witnessUtxo: {
                script: address.toOutputScript(ownAddress, network),
                value: Number(utxo.value)
            }
        });
    }

    transaction.addOutput({ address: destAddress, value: Number(amount) });

    const remainingAmount = totalSpent - amount - fee;

    if (remainingAmount >= dustThreshold) {
        transaction.addOutput({
            address: ownAddress,
            value: Number(remainingAmount)
        });
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
    transaction: Psbt,
    keyName: string,
    derivationPath: Uint8Array[],
    signer: SignFun,
    validator: ValidateSigFunction
): Promise<Transaction> {
    await transaction.signAllInputsAsync({
        sign: async (hashBuffer) => {
            const sec1 = await signer(
                keyName,
                derivationPath,
                Uint8Array.from(hashBuffer)
            );

            return Buffer.from(sec1);
        },
        publicKey: Buffer.from(ownPublicKey)
    });
    transaction.validateSignaturesOfAllInputs(validator);
    transaction.finalizeAllInputs();
    return transaction.extractTransaction();
}

// Converts a public key to a P2WPKH address.
function publicKeyToP2wpkhAddress(
    network: BitcoinNetwork,
    publicKey: Uint8Array
): string {
    const { address } = payments.p2wpkh({
        pubkey: Buffer.from(publicKey),
        network: determineNetwork(network)
    });
    if (address === undefined) {
        throw new Error('Unable to get address from the canister');
    }
    return address;
}

function validator(
    pubkey: Buffer,
    msghash: Buffer,
    signature: Buffer
): boolean {
    return ecc.verify(msghash, pubkey, signature);
}

function mockValidator(
    _pubkey: Buffer,
    _msghash: Buffer,
    _signature: Buffer
): boolean {
    return true;
}
