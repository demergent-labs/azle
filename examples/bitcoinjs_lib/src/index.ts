// import * as ecc from 'tiny-secp256k1/lib/'; // TODO we should switch to this import as soon as we have wasm support
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import * as bitcoin from 'bitcoinjs-lib';
import * as bitcoinMessage from 'bitcoinjs-message';
import { ECPairFactory } from 'ecpair';
import express from 'express';

const app = express();
const ECPair = ECPairFactory(ecc);

app.get('/get-address', (req, res) => {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    const { address } = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey
    });

    res.send(address);
});

app.get('/get-public-key', (req, res) => {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );

    res.send(keyPair.publicKey.toString('hex'));
});

app.get('/get-private-key', (req, res) => {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );

    res.send(keyPair.privateKey?.toString('hex'));
});

app.get('/get-private-key-wif', (req, res) => {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );

    res.send(keyPair.toWIF());
});

app.post('/create-transaction', (req, res) => {
    let transaction = new bitcoin.Transaction();
    transaction.version = 2;

    const prevTxId =
        '115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986';
    const txHash = Buffer.from(prevTxId, 'hex').reverse();
    transaction.addInput(txHash, 0);

    const recipientAddress = '1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK';
    const pubKeyHash = bitcoin.address
        .toOutputScript(recipientAddress)
        .subarray(3, 23);
    const scriptPubkey = bitcoin.script.compile([
        bitcoin.opcodes.OP_DUP,
        bitcoin.opcodes.OP_HASH160,
        pubKeyHash,
        bitcoin.opcodes.OP_EQUALVERIFY,
        bitcoin.opcodes.OP_CHECKSIG
    ]);
    transaction.addOutput(scriptPubkey, 15_000);

    res.send(transaction.toBuffer().toString('hex'));
});

app.post('/sign-bitcoin-message', (req, res) => {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    const privateKey = keyPair.privateKey;
    if (privateKey === undefined) {
        throw new Error('Invalid private key');
    }
    const message = 'This is an example of a signed message';
    const signature = bitcoinMessage.sign(
        message,
        privateKey,
        keyPair.compressed
    );

    res.send(signature.toString('base64'));
});

app.post('/verify-bitcoin-message', (req, res) => {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );

    const privateKey = keyPair.privateKey;
    if (privateKey === undefined) {
        throw new Error('Invalid private key');
    }
    const message = 'This is an example of a signed message';
    const signature = bitcoinMessage.sign(
        message,
        privateKey,
        keyPair.compressed
    );
    const { address } = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey
    });
    if (address === undefined) {
        throw new Error('Invalid address');
    }

    res.send(bitcoinMessage.verify(message, address, signature));
});

app.post('/fail-to-verify-bitcoin-message', (req, res) => {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    const wrongKeyPair = ECPair.fromWIF(
        'L2uPYXe17xSTqbCjZvL2DsyXPCbXspvcu5mHLDYUgzdUbZGSKrSr'
    );

    const privateKey = keyPair.privateKey;
    if (privateKey === undefined) {
        throw new Error('Invalid private key');
    }
    const message = 'This is an example of a signed message';
    const signature = bitcoinMessage.sign(
        message,
        privateKey,
        keyPair.compressed
    );
    const { address } = bitcoin.payments.p2pkh({
        pubkey: wrongKeyPair.publicKey
    });
    if (address === undefined) {
        throw new Error('Invalid address');
    }

    res.send(bitcoinMessage.verify(message, address, signature));
});

// The following endpoints (/create-transaction-from-known-hex, and
// /create-transaction-from-deconstructed-transaction) are not for our tests or
// examples but rather help to illustrate some of the different features of
// creating transactions. Each of these return the same transaction as in
// /create-transaction
app.post('/create-transaction-from-known-hex', (req, res) => {
    const transactionHex =
        '02000000018689302ea03ef5dd56fb7940a867f9240fa811eddeb0fa4c87ad9ff3728f5e110000000000ffffffff01983a0000000000001976a914ad618cf4333b3b248f9744e8e81db2964d0ae39788ac00000000';
    const transaction = bitcoin.Transaction.fromHex(transactionHex);

    res.send(transaction.toBuffer().toString('hex'));
});

app.post('/create-transaction-from-deconstructed-transaction', (req, res) => {
    const transactionHex =
        '02000000018689302ea03ef5dd56fb7940a867f9240fa811eddeb0fa4c87ad9ff3728f5e110000000000ffffffff01983a0000000000001976a914ad618cf4333b3b248f9744e8e81db2964d0ae39788ac00000000';
    const transaction = bitcoin.Transaction.fromHex(transactionHex);

    const newTransaction = new bitcoin.Transaction();
    newTransaction.version = 2;

    for (let input of transaction.ins) {
        newTransaction.addInput(
            input.hash,
            input.index,
            input.sequence,
            input.script
        );
    }

    for (let output of transaction.outs) {
        newTransaction.addOutput(output.script, output.value);
    }

    res.send(newTransaction.toBuffer().toString('hex'));
});

// bitcoinjs-lib allows for partially signed bitcoin transactions (psbt) here is
// an example of how to use bitcoinjs-lib to create a pbst in azle.
app.post('/create-psbt', (req, res) => {
    const validator = (
        pubkey: Buffer,
        msghash: Buffer,
        signature: Buffer
    ): boolean => ECPair.fromPublicKey(pubkey).verify(msghash, signature);
    const keyPair = ECPair.fromWIF(
        'L2uPYXe17xSTqbCjZvL2DsyXPCbXspvcu5mHLDYUgzdUbZGSKrSr'
    );
    let psbt = new bitcoin.Psbt();
    psbt.addInput({
        // if hash is string, txid, if hash is Buffer, is reversed compared to txid
        hash: '7d067b4a697a09d2c3cff7d4d9506c9955e93bff41bf82d439da7d030382bc3e',
        index: 0,
        sequence: 0xffffffff, // These are defaults. This line is not needed.

        // non-segwit inputs now require passing the whole previous tx as Buffer
        nonWitnessUtxo: Buffer.from(
            '0200000001f9f34e95b9d5c8abcd20fc5bd4a825d1517be62f0f775e5f36da944d9' +
                '452e550000000006b483045022100c86e9a111afc90f64b4904bd609e9eaed80d48' +
                'ca17c162b1aca0a788ac3526f002207bb79b60d4fc6526329bf18a77135dc566020' +
                '9e761da46e1c2f1152ec013215801210211755115eabf846720f5cb18f248666fec' +
                '631e5e1e66009ce3710ceea5b1ad13ffffffff01' +
                // value in satoshis (Int64LE) = 0x015f90 = 90000
                '905f010000000000' +
                // scriptPubkey length
                '19' +
                // scriptPubkey
                '76a9148bbc95d2709c71607c60ee3f097c1217482f518d88ac' +
                // locktime
                '00000000',
            'hex'
        )
    });
    psbt.addOutput({
        address: '1KRMKfeZcmosxALVYESdPNez1AP1mEtywp',
        value: 80_000
    });
    psbt.signInput(0, keyPair);
    psbt.validateSignaturesOfInput(0, validator);
    psbt.finalizeAllInputs();

    res.send(psbt.extractTransaction().toHex());
});

// The following endpoints sign messages with ECPair sign
app.post('/ecpair-sign-bitcoin-message', (req, res) => {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );

    const message = Buffer.from('This is an example of a signed message');
    const hash = bitcoin.crypto.sha256(message);
    const signature = keyPair.sign(hash);

    res.send(signature.toString('base64'));
});

app.post('/ecpair-verify-bitcoin-message', (req, res) => {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );

    const message = Buffer.from('This is an example of a signed message');
    const hash = bitcoin.crypto.sha256(message);
    const signature = keyPair.sign(hash);

    res.send(keyPair.verify(hash, signature));
});

app.post('/ecpair-fail-to-verify-bitcoin-message', (req, res) => {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    const wrongKeyPair = ECPair.fromWIF(
        'L2uPYXe17xSTqbCjZvL2DsyXPCbXspvcu5mHLDYUgzdUbZGSKrSr'
    );

    const message = Buffer.from('This is an example of a signed message');
    const hash = bitcoin.crypto.sha256(message);
    const signature = keyPair.sign(hash);

    res.send(wrongKeyPair.verify(hash, signature));
});

app.listen();
