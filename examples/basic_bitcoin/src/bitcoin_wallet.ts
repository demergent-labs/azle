import { blob, ic, nat64, match, Result, Vec } from 'azle';
import {
    BitcoinNetwork,
    MillisatoshiPerByte,
    Satoshi,
    Utxo
} from 'azle/canisters/management';
import * as bs58 from 'bs58';
import { Buffer } from 'buffer';
import hexarray from 'hex-array';
import { sha256 } from 'js-sha256';
import RIPEMD160 from 'ripemd160';

import * as bitcoinApi from './bitcoin_api';
import {
    BitcoinAddress,
    BitcoinBuilder,
    BitcoinEcdsaSighashType,
    BitcoinHash,
    BitcoinScript,
    BitcoinTransaction,
    BitcoinTxid,
    BitcoinTxIn,
    BitcoinTxOut,
    BitcoinWitness
} from './bitcoin_plugin';
import * as ecdsaApi from './ecdsa_api';

const SIG_HASH_TYPE: BitcoinEcdsaSighashType = BitcoinEcdsaSighashType.All;

/// Returns the P2PKH address of this canister at the given derivation path.
export async function getP2PKHAddress(
    network: BitcoinNetwork,
    keyName: string,
    derivationPath: Vec<blob>
): Promise<string> {
    // Fetch the public key of the given derivation path.
    const publicKey = await ecdsaApi.ecdsaPublicKey(keyName, derivationPath);

    // Compute the address.
    return publicKeyToP2PKHAddress(network, publicKey);
}

/// Sends a transaction to the network that transfers the given amount to the
/// given destination, where the source of the funds is the canister itself
/// at the given derivation path.
export async function send(
    network: BitcoinNetwork,
    derivationPath: Vec<blob>,
    keyName: string,
    dstAddressString: string,
    amount: Satoshi
): Promise<BitcoinTxid> {
    // Get fee percentiles from previous transactions to estimate our own fee.
    const feePercentiles = await bitcoinApi.getCurrentFeePercentiles(network);

    const feePerByte =
        feePercentiles.length === 0
            ? // There are no fee percentiles. This case can only happen on a regtest
              // network where there are no non-coinbase transactions. In this case,
              // we use a default of 2000 millisatoshis/byte (i.e. 2 satoshi/byte)
              2000n
            : // Choose the 50th percentile for sending fees.
              feePercentiles[49];
    // Fetch our public key, P2PKH address, and UTXOs.
    const ownPublicKey = await ecdsaApi.ecdsaPublicKey(keyName, derivationPath);
    const ownAddressString = publicKeyToP2PKHAddress(network, ownPublicKey);

    console.log('Fetching UTXOs...');
    const ownUtxos = (await bitcoinApi.getUtxos(network, ownAddressString))
        .utxos;

    const ownAddress = BitcoinAddress.fromStr(ownAddressString);
    const dstAddress = BitcoinAddress.fromStr(dstAddressString);

    // Build the transaction that sends `amount` to the destination address.
    const transaction = await buildTransaction(
        ownPublicKey,
        ownAddress,
        ownUtxos,
        dstAddress,
        amount,
        feePerByte
    );

    const txBytes = transaction.serialize!();
    console.log(`Transaction to sign: ${hexarray.toString(txBytes)}`);

    // Sign the transaction.
    const signedTransaction = await signTransaction(
        ownPublicKey,
        ownAddress,
        transaction,
        keyName,
        derivationPath,
        ecdsaApi.signWithECDSA
    );

    const signedTransactionBytes = signedTransaction.serialize!();
    console.log(`
        "Signed transaction: ${hexarray.toString(signedTransactionBytes)}`);

    console.log('Sending transaction...');
    await bitcoinApi.sendTransaction(network, signedTransactionBytes);
    console.log('Done');

    return signedTransaction.txid!();
}

// Builds a transaction to send the given `amount` of satoshis to the
// destination address.
async function buildTransaction(
    ownPublicKey: blob,
    ownAddress: BitcoinAddress,
    ownUtxos: Vec<Utxo>,
    dstAddress: BitcoinAddress,
    amount: Satoshi,
    feePerByte: MillisatoshiPerByte
): Promise<BitcoinTransaction> {
    // We have a chicken-and-egg problem where we need to know the length
    // of the transaction in order to compute its proper fee, but we need
    // to know the proper fee in order to figure out the inputs needed for
    // the transaction.
    //
    // We solve this problem iteratively. We start with a fee of zero, build
    // and sign a transaction, see what its size is, and then update the fee,
    // rebuild the transaction, until the fee is set to the correct amount.
    console.log('Building transaction...');
    let totalFee = 0n;
    while (true) {
        const transaction = match(
            buildTransactionWithFee(
                ownUtxos,
                ownAddress,
                dstAddress,
                amount,
                totalFee
            ),
            {
                Ok: (ok) => ok,
                Err: () => ic.trap('Error building transaction.')
            }
        );

        // Sign the transaction. In this case, we only care about the size
        // of the signed transaction, so we use a mock signer here for efficiency.
        const signedTransaction = await signTransaction(
            ownPublicKey,
            ownAddress,
            transaction,
            '', // mock key name
            [], // mock derivation path
            mockSigner
        );

        const signedTxBytesLen = BigInt(signedTransaction.serialize!().length);

        if ((signedTxBytesLen * feePerByte) / 1000n == totalFee) {
            console.log(`Transaction built with fee ${totalFee}.`);
            return transaction;
        } else {
            totalFee = (signedTxBytesLen * feePerByte) / 1000n;
        }
    }
}

function buildTransactionWithFee(
    ownUtxos: Vec<Utxo>,
    ownAddress: BitcoinAddress,
    dstAddress: BitcoinAddress,
    amount: nat64,
    fee: nat64
): Result<BitcoinTransaction, string> {
    // Assume that any amount below this threshold is dust.
    const DUST_THRESHOLD: nat64 = 1_000n;

    // Select which UTXOs to spend. We naively spend the oldest available UTXOs,
    // even if they were previously spent in a transaction. This isn't a
    // problem as long as at most one transaction is created per block and
    // we're using min_confirmations of 1.
    let utxosToSpend = [];
    let totalSpent = 0n;
    for (const utxo of ownUtxos.reverse()) {
        totalSpent += utxo.value;
        utxosToSpend.push(utxo);
        if (totalSpent >= amount + fee) {
            // We have enough inputs to cover the amount we want to spend.
            break;
        }
    }

    if (totalSpent < amount + fee) {
        return Result.Err(
            `Insufficient balance: ${totalSpent}, trying to transfer ${amount} satoshi with fee ${fee}`
        );
    }

    const inputs: Vec<BitcoinTxIn> = utxosToSpend.map((utxo) => {
        return {
            previous_output: {
                txid: BitcoinTxid.fromHash(
                    BitcoinHash.fromSlice(utxo.outpoint.txid)
                ),
                vout: utxo.outpoint.vout
            },
            sequence: 0xffffffff,
            witness: BitcoinWitness.new(),
            scriptSig: BitcoinScript.new()
        };
    });

    let outputs: Vec<BitcoinTxOut> = [
        {
            scriptPubkey: dstAddress.scriptPubkey(),
            value: amount
        }
    ];

    const remainingAmount = totalSpent - amount - fee;

    if (remainingAmount >= DUST_THRESHOLD) {
        outputs.push({
            scriptPubkey: ownAddress.scriptPubkey(),
            value: remainingAmount
        });
    }

    return Result.Ok({
        input: inputs,
        output: outputs,
        lockTime: 0,
        version: 1
    });
}

// Sign a bitcoin transaction.
//
// IMPORTANT: This method is for demonstration purposes only and it only
// supports signing transactions if:
//
// 1. All the inputs are referencing outpoints that are owned by `own_address`.
// 2. `own_address` is a P2PKH address.
async function signTransaction(
    ownPublicKey: blob,
    ownAddress: BitcoinAddress,
    transaction: BitcoinTransaction,
    keyName: string,
    derivationPath: Vec<blob>,
    signer: (_: string, __: Vec<blob>, ___: blob) => Promise<blob>
): Promise<BitcoinTransaction> {
    // Verify that our own address is P2PKH.
    // TODO add this back in
    // TODO see if we can ue https://www.npmjs.com/package/assert
    // assert_eq!(
    //     own_address.address_type(),
    //     Some(AddressType::P2pkh),
    //     "This example supports signing p2pkh addresses only."
    // );

    for (let index = 0; index < transaction.input.length; index++) {
        const input = transaction.input[index];

        const sighash = transaction.signatureHash!(
            index,
            ownAddress.scriptPubkey(),
            SIG_HASH_TYPE.to_u32!()
        );

        const signature = await signer(
            keyName,
            derivationPath,
            sighash.toVec()
        );

        // Convert signature to DER.
        const derSignature = sec1ToDer(signature);

        let sigWithHashtype = Uint8Array.from([
            ...derSignature,
            SIG_HASH_TYPE.to_u32!()
        ]);
        input.scriptSig = BitcoinBuilder.new()
            .pushSlice(sigWithHashtype)
            .pushSlice(ownPublicKey)
            .intoScript();
        input.witness.clear();
    }

    return transaction;
}

// Converts a public key to a P2PKH address.
function publicKeyToP2PKHAddress(
    network: BitcoinNetwork,
    publicKey: blob
): string {
    // sha256 + ripmd160
    let hasher = new RIPEMD160();
    hasher.update(sha256(publicKey));
    const result = hasher.digest();
    const prefix = match(network, {
        Mainnet: () => '0x00',
        _: () => '0x6f'
    });
    let dataWithPrefix = Buffer.concat([Buffer.from(prefix), result]);
    let checksum = sha256(sha256(dataWithPrefix)).slice(0, 4);
    let fullAddress = Buffer.concat([dataWithPrefix, Buffer.from(checksum)]);
    return bs58.encode(fullAddress);
}

// A mock for rubber-stamping ECDSA signatures.
async function mockSigner(
    _key_name: string,
    _derivation_path: Vec<blob>,
    _message_hash: blob
): Promise<blob> {
    return new Uint8Array(64).fill(255);
}

// Converts a SEC1 ECDSA signature to the DER format.
function sec1ToDer(sec1Signature: blob): blob {
    let r: blob;

    if ((sec1Signature[0] & 0x80) != 0) {
        // r is negative. Prepend a zero byte.
        let tmp = Uint8Array.from([0x00, ...sec1Signature.slice(0, 32)]);
        r = tmp;
    } else {
        // r is positive.
        r = sec1Signature.slice(0, 32);
    }

    let s: blob;

    if ((sec1Signature[32] & 0x80) != 0) {
        // s is negative. Prepend a zero byte.
        let tmp = Uint8Array.from([0x00, ...sec1Signature.slice(32)]);
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
