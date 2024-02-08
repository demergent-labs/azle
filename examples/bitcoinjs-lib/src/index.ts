import { Server } from 'azle';
import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
// import * as ecc from 'tiny-secp256k1/lib/'; // TODO we should switch to this import as soon as we have wasm support
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import express from 'express';

export default Server(() => {
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
        keyPair.toWIF();
        res.send(keyPair.privateKey?.toString('hex'));
    });

    app.get('/get-private-key-wif', (req, res) => {
        const keyPair = ECPair.fromWIF(
            'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
        );
        res.send(keyPair.toWIF());
    });

    app.post('/create-transaction', (req, res) => {
        const validator = (
            pubkey: Buffer,
            msghash: Buffer,
            signature: Buffer
        ): boolean => ECPair.fromPublicKey(pubkey).verify(msghash, signature);
        const keyPair = ECPair.fromWIF(
            'L2uPYXe17xSTqbCjZvL2DsyXPCbXspvcu5mHLDYUgzdUbZGSKrSr'
        );
        const psbt = new bitcoin.Psbt();
        console.log('about to add input');
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
            value: 80000
        });
        psbt.signInput(0, keyPair);
        psbt.validateSignaturesOfInput(0, validator);
        psbt.finalizeAllInputs();
        res.send(psbt.extractTransaction().toHex());
    });

    app.post('/sign-bitcoin-message', (req, res) => {
        const keyPair = ECPair.fromWIF(
            'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
        );

        const message = Buffer.from('This is an example of a signed message');
        const hash = bitcoin.crypto.sha256(message);
        const signature = keyPair.sign(hash);
        res.send(signature.toString('hex'));
    });

    app.post('/verify-bitcoin-message', (req, res) => {
        const keyPair = ECPair.fromWIF(
            'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
        );

        const message = Buffer.from('This is an example of a signed message');
        const hash = bitcoin.crypto.sha256(message);
        const signature = keyPair.sign(hash);
        res.send(keyPair.verify(hash, signature));
    });

    return app.listen();
});
