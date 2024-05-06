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
import { networks, Psbt, Transaction } from 'bitcoinjs-lib';
import { ValidateSigFunction } from 'bitcoinjs-lib/src/psbt';
import { Buffer } from 'buffer';

import * as bitcoinApi from './bitcoin_api';
import * as ecdsaApi from './ecdsa_api';
import { BitcoinTxid, DerivationPath } from './types';

type TransactionHashes = {
    [txid: string]: string;
};

/// Returns the P2PKH address of this canister at the given derivation path.
export async function getP2pkhAddress(
    network: BitcoinNetwork,
    keyName: string,
    derivationPath: DerivationPath
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
    derivationPath: DerivationPath,
    keyName: string,
    dstAddress: string,
    amount: Satoshi,
    transactionHashes: TransactionHashes
): Promise<BitcoinTxid> {
    // Get fee percentiles from previous transactions to estimate our own fee.
    const feePercentiles = await bitcoinApi.getCurrentFeePercentiles(network);

    const feePerByte =
        feePercentiles.length === 0
            ? // There are no fee percentiles. This case can only happen on a regtest
              // network where there are no non-coinbase transactions. In this case,
              // we use a default of 2000 millisatoshis/byte (i.e. 2 satoshi/byte)
              2_000n
            : // Choose the 50th percentile for sending fees.
              feePercentiles[49];

    // Fetch our public key, P2PKH address, and UTXOs.
    const ownAddress = await getP2pkhAddress(network, keyName, derivationPath);
    const ownPublicKey = await ecdsaApi.ecdsaPublicKey(keyName, derivationPath);

    console.log('Fetching UTXOs...');
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
        keyName,
        derivationPath,
        determineNetwork(network),
        transactionHashes
    );

    // Sign the transaction.
    const signedTransaction = await signTransaction(
        ownPublicKey,
        transaction,
        keyName,
        derivationPath
    );
    const signedTransactionBytes = signedTransaction.toBuffer();

    console.log('Sending transaction...');
    await bitcoinApi.sendTransaction(network, signedTransactionBytes);
    console.log('Done.');

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
    let totalFee = 0n;
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
            ownPublicKey,
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
    // Assume that any amount below this threshold is dust.
    const dustThreshold = 1_000n;

    // Select which UTXOs to spend. We naively spend the oldest available UTXOs,
    // even if they were previously spent in a transaction. This isn't a
    // problem as long as at most one transaction is created per block and
    // we're using min_confirmations of 1.
    let utxosToSpend: Utxo[] = [];
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

    for (let utxo of utxosToSpend) {
        const hash = Buffer.from(utxo.outpoint.txid).reverse();
        const txid = hash.toString('hex');
        const nonWitnessUtxo = Buffer.from(transactionHashes[txid], 'hex');
        transaction.addInput({
            hash: Buffer.from(utxo.outpoint.txid), // TOOD if this works clean it up
            index: utxo.outpoint.vout,
            nonWitnessUtxo
        });
    }

    const remainingAmount = totalSpent - (amount + fee);

    transaction.addOutput({ address: destAddress, value: Number(amount) });

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
    derivationPath: DerivationPath
): Promise<Transaction> {
    const signer: bitcoin.SignerAsync = {
        sign: async (hashBuffer) => {
            const sec1 = await ecdsaApi.signWithECDSA(
                keyName,
                derivationPath,
                Uint8Array.from(hashBuffer)
            );

            return Buffer.from(sec1);
        },
        publicKey: Buffer.from(ownPublicKey)
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
    await transaction.signAllInputsAsync(signer);
    transaction.validateSignaturesOfAllInputs(validator);
    transaction.finalizeAllInputs();
    return transaction.extractTransaction();
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
