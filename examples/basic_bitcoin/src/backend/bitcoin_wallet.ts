//! A demo of a very bare-bones bitcoin "wallet".
//!
//! The wallet here showcases how bitcoin addresses can be be computed
//! and how bitcoin transactions can be signed. It is missing several
//! pieces that any production-grade wallet would have, including:
//!
//! * Support for address types that aren't P2PKH.
//! * Caching spent UTXOs so that they are not reused in future transactions.
//! * Option to set the fee.
import { blob, nat64, Principal, Vec } from 'azle';
import {
    BitcoinNetwork,
    MillisatoshiPerByte,
    Satoshi,
    Utxo
} from 'azle/canisters/management';
import * as bitcoin from 'bitcoinjs-lib';
import { networks, Psbt, Transaction } from 'bitcoinjs-lib';
import { ValidateSigFunction } from 'bitcoinjs-lib/src/psbt';
import { Buffer } from 'buffer';

import * as bitcoinApi from './bitcoin_api';
import * as ecdsaApi from './ecdsa_api';
import { BitcoinTxid, DerivationPath } from './types';
export const ECDSA = 'ecdsa';
export const SCHNORR = 'schnorr';

export type ThresholdKeyInfo = {
    derivationPath: Uint8Array[];
    canisterId?: Principal | string;
    keyId?: {
        curve: 'secp256k1';
        name: 'dfx_test_key' | 'test_key_1' | 'key_1';
    };
};

type TransactionHashes = {
    [txid: string]: string;
};

/// Returns the P2PKH address of this canister at the given derivation path.
export async function getAddress(
    network: BitcoinNetwork,
    keyName: string,
    derivationPath: DerivationPath
): Promise<string> {
    const pubkey = await getPublicKey(keyName, derivationPath);
    const { address } = bitcoin.payments.p2pkh({
        pubkey,
        network: determineNetwork(network)
    });
    if (address === undefined) {
        throw new Error('Unable to get address from the canister');
    }
    return address;
}

export async function getPublicKey(
    keyName: string,
    derivationPath: DerivationPath
): Promise<Buffer> {
    // Fetch the public key of the given derivation path.
    return Buffer.from(
        await ecdsaApi.ecdsaPublicKey(keyName, derivationPath),
        'hex'
    );
}

/// Sends a transaction to the network that transfers the given amount to the
/// given destination, where the source of the funds is the canister itself
/// at the given derivation path.
export async function send(
    network: BitcoinNetwork,
    derivationPath: Vec<blob>,
    keyName: string,
    dstAddressString: string,
    amount: Satoshi,
    transactionHashes: TransactionHashes
): Promise<BitcoinTxid> {
    const signedTransaction = await createSignedTransaction(
        network,
        derivationPath,
        keyName,
        dstAddressString,
        amount,
        transactionHashes
    );
    const signedTransactionBytes = signedTransaction.toBuffer();

    await bitcoinApi.sendTransaction(network, signedTransactionBytes);

    return signedTransaction.getId();
}

async function createSignedTransaction(
    network: BitcoinNetwork,
    derivationPath: Vec<blob>,
    keyName: string,
    dstAddress: string,
    amount: Satoshi,
    transactionHashes: TransactionHashes
): Promise<Transaction> {
    const ownAddress = await getAddress(network, keyName, derivationPath);

    const ownUtxos = (await bitcoinApi.getUtxos(network, ownAddress.toString()))
        .utxos;

    // Build the transaction that sends `amount` to the destination address.
    const transaction = await buildTransaction(
        ownAddress,
        ownUtxos,
        dstAddress,
        amount,
        await getFeePerByte(network),
        keyName,
        derivationPath,
        determineNetwork(network),
        transactionHashes
    );

    // Sign the transaction.
    return await signTransaction(transaction, keyName, derivationPath);
}

async function getFeePerByte(network: BitcoinNetwork): Promise<nat64> {
    // Get fee percentiles from previous transactions to estimate our own fee.
    const feePercentiles = await bitcoinApi.getCurrentFeePercentiles(network);

    return feePercentiles.length === 0
        ? // There are no fee percentiles. This case can only happen on a regtest
          // network where there are no non-coinbase transactions. In this case,
          // we use a default of 2000 millisatoshis/byte (i.e. 2 satoshi/byte)
          2_000n
        : // Choose the 50th percentile for sending fees.
          feePercentiles[49];
}

// Builds a transaction to send the given `amount` of satoshis to the
// destination address.
async function buildTransaction(
    ownAddress: string,
    ownUtxos: Vec<Utxo>,
    dstAddress: string,
    amount: Satoshi,
    feePerByte: MillisatoshiPerByte,
    keyName: string,
    derivationPath: DerivationPath,
    network: bitcoin.Network,
    transactionHashes: TransactionHashes
): Promise<Psbt> {
    // We have a chicken-and-egg problem where we need to know the length
    // of the transaction in order to compute its proper fee, but we need
    // to know the proper fee in order to figure out the inputs needed for
    // the transaction.
    //
    // We solve this problem iteratively. We start with a fee of zero, build
    // and sign a transaction, see what its size is, and then update the fee,
    // rebuild the transaction, until the fee is set to the correct amount.
    //
    // However zero is too small a fee when you serialize the transaction you
    // will get the following error while it's checking the transaction:
    // 'Fee is too small: expected more than 128 but got 0'
    // So I'm going to start at 130 instead
    let totalFee = 130n;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        let transaction = buildTransactionWithFee(
            ownUtxos,
            ownAddress,
            dstAddress,
            amount,
            totalFee,
            network,
            transactionHashes
        );

        // Sign the transaction. In this case, we only care about the size
        // of the signed transaction.
        const signedTransaction = await signTransaction(
            transaction.clone(),
            keyName,
            derivationPath
        );

        const signedTxBytesLen = BigInt(signedTransaction.byteLength());

        if ((signedTxBytesLen * feePerByte) / 1_000n === totalFee) {
            return transaction;
        } else {
            totalFee = (signedTxBytesLen * feePerByte) / 1_000n;
        }
    }
}

function buildTransactionWithFee(
    ownUtxos: Utxo[],
    ownAddress: string, // TDO what about that ownAddress?? Would we only need it for the signing?
    destAddress: string,
    amount: bigint,
    fee: bigint,
    network: bitcoin.Network,
    transactionHashes: TransactionHashes
): Psbt {
    // Select which UTXOs to spend. We naively spend the oldest available UTXOs,
    // even if they were previously spent in a transaction. This isn't a
    // problem as long as at most one transaction is created per block and
    // we're using min_confirmations of 1.
    let utxosToSpend: Vec<Utxo> = [];
    let totalSpent = 0n;
    for (const utxo of [...ownUtxos].reverse()) {
        if (utxosToSpend.includes(utxo)) {
            continue;
        }
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

    let transaction = new Psbt({ network });
    transaction.setVersion(2);

    console.log('bw: buildTransactionWithFee: building psbt');

    try {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log(
            `bw: buildTransactionWithFee: Adding ${utxosToSpend.length} inputs to the transaction`
        );
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        for (let utxo of utxosToSpend) {
            const hash = Buffer.from(utxo.outpoint.txid).reverse();
            const txid = hash.toString('hex');
            console.log(
                `bw: buildTransactionWithFee: Adding ${txid}:${utxo.outpoint.vout}`
            );
            const nonWitnessUtxo = Buffer.from(transactionHashes[txid], 'hex');
            transaction.addInput({
                hash: Buffer.from(utxo.outpoint.txid), // TOOD if this works clean it up
                index: utxo.outpoint.vout,
                nonWitnessUtxo
            });
        }
    } catch (err: any) {
        console.log('bw: buildTransactionWithFee: Error:');
        console.log(err.message);
        console.log(err);
        throw err;
    }

    console.log('bw: buildTransactionWithFee: inputs added');

    transaction.addOutput({ address: destAddress, value: Number(amount) });
    transaction.addOutput({
        address: ownAddress,
        value: Number(totalSpent - (amount + fee))
    });

    console.log('bw: buildTransactionWithFee: transaction built');

    return transaction;
}

// function getNonWitnessUtxos(txid: Uint8Array): Buffer {
//     const txidHex = Buffer.from(txid).toString('hex');
//     // TODO implement this
//     console.log(
//         `We need to find a way to get the tx data from this txid: ${txidHex}`
//     );
//     throw '';
// }

async function signTransaction(
    transaction: Psbt,
    keyName: string,
    derivationPath: DerivationPath
): Promise<Transaction> {
    console.log('bw: signTransaction: getPublicKey');
    const publicKey = await getPublicKey(keyName, derivationPath);
    const signer: bitcoin.SignerAsync = {
        sign: async (hashBuffer) => {
            const sec1 = await ecdsaApi.signWithECDSA(
                keyName,
                derivationPath,
                Uint8Array.from(hashBuffer)
            );
            console.log(
                `bw: signTransaction: signer: got signature back from IC. ${sec1.length}`
            );
            const der = sec1ToDer(sec1);
            console.log(
                `bw: signTransaction: signer: We may have to convert to der. ${der.length}`
            );
            return Buffer.from(sec1); // TODO if this works get rid of DER, why did we need this? If it doesn't work why does DER make it longer and what can we do to get it back to 64?
        },
        publicKey
    };
    const validator: ValidateSigFunction = (
        pubkey: Buffer,
        msghash: Buffer,
        signature: Buffer
    ): boolean => {
        // TODO I think if we pass along the ECPair we can validate with that. See the bitcoinjs-lib /create-psbt
        console.log(
            "Please visually inspect these to make sure they look right and that no one is trying to spend bitcoin they don't own"
        );
        console.log(`pubkey: ${pubkey.toString('hex')}`);
        console.log(`msghash: ${msghash.toString('hex')}`);
        console.log(`sig: ${signature.toString('hex')}`);
        return true;
    };
    try {
        console.log('bw: signTransaction: start signing all inputs');
        for (let i = 0; i < transaction.txInputs.length; i++) {
            await transaction.signInputAsync(i, signer);
        }
        // await transaction.signAllInputsAsync(signer); // TODO I bet we could go back to this once we get the inputs figured out
        console.log('bw: signTransaction: signed all inputs');
        transaction.validateSignaturesOfAllInputs(validator);
        console.log('bw: signTransaction: validated all signatures');
        transaction.finalizeAllInputs(); // TODO what if we don't finalize it?
        console.log('bw: signTransaction: finalized');
        try {
            return transaction.extractTransaction();
        } catch (err: any) {
            console.log(
                'bw: signTransaction: Error: extracting the transaction'
            );
            console.log(err.message);
            console.log(err);
            throw err;
        }
    } catch (err: any) {
        console.log(
            'bw: signTransaction: Error: signing all inputs (or maybe duplication of extracting the transaction)'
        );
        console.log(err.message);
        console.log(err);
        throw err;
    }
}

function determineNetwork(network: BitcoinNetwork): networks.Network {
    if (network.mainnet !== undefined) {
        return networks.bitcoin;
    }
    if (network.testnet !== undefined) {
        return networks.testnet;
    }
    if (network.regtest !== undefined) {
        return networks.regtest;
    }
    throw new Error(`Unknown Network: ${network}`);
}

// Converts a SEC1 ECDSA signature to the DER format.
function sec1ToDer(sec1Signature: Uint8Array): Uint8Array {
    let r: Uint8Array;

    if ((sec1Signature[0] & 0x80) !== 0) {
        // r is negative. Prepend a zero byte.
        const tmp = Uint8Array.from([0x00, ...sec1Signature.slice(0, 32)]);
        r = tmp;
    } else {
        // r is positive.
        r = sec1Signature.slice(0, 32);
    }

    let s: Uint8Array;

    if ((sec1Signature[32] & 0x80) !== 0) {
        // s is negative. Prepend a zero byte.
        const tmp = Uint8Array.from([0x00, ...sec1Signature.slice(32)]);
        s = tmp;
    } else {
        // s is positive.
        s = sec1Signature.slice(32);
    }

    // Convert signature to DER.
    return Uint8Array.from([
        ...[0x30, 4 + r.length + s.length, 0x02, r.length],
        ...r,
        ...[0x02, s.length],
        ...s
    ]);
}
