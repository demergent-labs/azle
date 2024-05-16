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
import { Psbt, Signer, SignerAsync, Transaction } from 'bitcoinjs-lib';
import { ValidateSigFunction } from 'bitcoinjs-lib/src/psbt';
import { Buffer } from 'buffer';
import { ECPairAPI } from 'ecpair';

import * as bitcoinApi from '../../basic_bitcoin/src/bitcoin_api';
import {
    determineNetwork,
    publicKeyToP2pkhAddress
} from '../../basic_bitcoin/src/bitcoin_wallet';
import * as ecdsaApi from '../../basic_bitcoin/src/ecdsa_api';

type TransactionHashes = {
    [txid: string]: string;
};

/// Sends a transaction to the network that transfers the given amount to the
/// given destination, where the source of the funds is the canister itself
/// at the given derivation path.
export async function send(
    network: BitcoinNetwork,
    derivationPath: Uint8Array[],
    keyName: string,
    dstAddress: string,
    amount: Satoshi,
    transactionHashes: TransactionHashes,
    ECPair: ECPairAPI
): Promise<string> {
    const feePerByte = await calculateFeePerByte(network);

    const ownPublicKey = await ecdsaApi.ecdsaPublicKey(keyName, derivationPath);
    const ownAddress = publicKeyToP2pkhAddress(network, ownPublicKey);

    // Note that pagination may have to be used to get all UTXOs for the given address.
    // For the sake of simplicity, it is assumed here that the `utxo` field in the response
    // contains all UTXOs.
    const ownUtxos = (await bitcoinApi.getUtxos(network, ownAddress.toString()))
        .utxos;

    // Build the transaction that sends `amount` to the destination address.
    const transaction = await buildPsbt(
        ownPublicKey,
        ownAddress,
        ownUtxos,
        dstAddress,
        amount,
        feePerByte,
        network,
        transactionHashes,
        ECPair
    );

    // Sign the transaction.
    const signer = getSigner(ownPublicKey, keyName, derivationPath);
    const validator = getValidator(ECPair);
    const signedTransaction = await signPsbt(transaction, signer, validator);
    const signedTransactionBytes = signedTransaction.toBuffer();
    console.info(
        `Signed transaction: ${signedTransactionBytes.toString('hex')}`
    );

    console.info('Sending transaction...');
    await bitcoinApi.sendTransaction(network, signedTransactionBytes);
    console.info('Done');

    return signedTransaction.getId();
}

async function calculateFeePerByte(network: BitcoinNetwork): Promise<bigint> {
    // Get fee percentiles from previous transactions to estimate our own fee.
    const feePercentiles = await bitcoinApi.getCurrentFeePercentiles(network);

    return feePercentiles.length === 0
        ? // There are no fee percentiles. This case can only happen on a regtest
          // network where there are no non-coinbase transactions. In this case,
          // we use a default of 2000 millisatoshis/byte (i.e. 2 satoshi/byte)
          2_000n
        : // Choose the 50th percentile for sending fees.
          feePercentiles[50];
}

// Builds a transaction to send the given `amount` of satoshis to the
// destination address.
async function buildPsbt(
    ownPublicKey: Uint8Array,
    ownAddress: string,
    ownUtxos: Utxo[],
    dstAddress: string,
    amount: Satoshi,
    feePerByte: MillisatoshiPerByte,
    network: BitcoinNetwork,
    transactionHashes: TransactionHashes,
    ECPair: ECPairAPI
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
        let transaction = buildPsbtWithFee(
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
        const signer = getMockSigner(ownPublicKey, ECPair);
        const validator = getMockValidator();
        const signedTransaction = await signPsbt(
            transaction.clone(),
            signer,
            validator
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

function buildPsbtWithFee(
    ownUtxos: Utxo[],
    ownAddress: string,
    destAddress: string,
    amount: bigint,
    fee: bigint,
    network: BitcoinNetwork,
    transactionHashes: TransactionHashes
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

    let transaction = new Psbt({ network: determineNetwork(network) });
    let newTransaction = new Psbt({ network: determineNetwork(network) });
    transaction.setVersion(1);
    newTransaction.setVersion(1);

    for (const utxo of utxosToSpend) {
        const previousTxidHash = Buffer.from(utxo.outpoint.txid);
        const txid = previousTxidHash.reverse().toString('hex');
        const nonWitnessUtxo = Buffer.from(transactionHashes[txid], 'hex');
        transaction.addInput({
            hash: Buffer.from(utxo.outpoint.txid),
            index: utxo.outpoint.vout,
            nonWitnessUtxo
        });
        newTransaction.addInput({
            hash: Buffer.from(utxo.outpoint.txid),
            index: utxo.outpoint.vout
        });
        // TODO see why these are different
    }

    const remainingAmount = totalSpent - amount - fee;

    transaction.addOutput({ address: destAddress, value: Number(amount) });
    newTransaction.addOutput({ address: destAddress, value: Number(amount) });

    if (remainingAmount >= dustThreshold) {
        transaction.addOutput({
            address: ownAddress,
            value: Number(remainingAmount)
        });
        newTransaction.addOutput({
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
async function signPsbt(
    transaction: Psbt,
    signer: Signer | SignerAsync,
    validator: ValidateSigFunction
): Promise<Transaction> {
    await transaction.signAllInputsAsync(signer);
    transaction.validateSignaturesOfAllInputs(validator);
    transaction.finalizeAllInputs();
    return transaction.extractTransaction();
}

function getSigner(
    publicKey: Uint8Array,
    keyName: string,
    derivationPath: Uint8Array[]
): SignerAsync {
    return {
        sign: async (hashBuffer) => {
            const sec1 = await ecdsaApi.signWithECDSA(
                keyName,
                derivationPath,
                Uint8Array.from(hashBuffer)
            );

            return Buffer.from(sec1);
        },
        publicKey: Buffer.from(publicKey)
    };
}

function getMockSigner(ownPublicKey: Uint8Array, ECPair: ECPairAPI): Signer {
    const keyPair = ECPair.makeRandom();
    return {
        sign: (hashBuffer) => {
            return keyPair.sign(hashBuffer);
        },
        publicKey: Buffer.from(ownPublicKey)
    };
}

function getValidator(ECPair: ECPairAPI): ValidateSigFunction {
    return (pubkey: Buffer, msghash: Buffer, signature: Buffer): boolean => {
        return ECPair.fromPublicKey(pubkey).verify(msghash, signature);
    };
}

function getMockValidator(): ValidateSigFunction {
    return (_pubkey: Buffer, _msghash: Buffer, _signature: Buffer): boolean => {
        return true;
    };
}
