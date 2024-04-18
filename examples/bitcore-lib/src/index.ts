import { Message, PrivateKey, Transaction } from 'bitcore-lib';
import express from 'express';

const app = express();

app.get('/get-address', (req, res) => {
    const privateKey = new PrivateKey(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    res.send(privateKey.toAddress().toString());
});

app.get('/get-public-key', (req, res) => {
    const privateKey = new PrivateKey(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    res.send(privateKey.toPublicKey().toString());
});

app.get('/get-private-key', (req, res) => {
    const privateKey = new PrivateKey(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    res.send(privateKey.toString());
});

app.get('/get-private-key-wif', (req, res) => {
    const privateKey = new PrivateKey(
        'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
    );
    res.send(privateKey.toWIF());
});

app.post('/create-transaction', (req, res) => {
    const privateKey = new PrivateKey(
        'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
    );
    const utxo = Transaction.UnspentOutput.fromObject({
        txId: '115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986',
        outputIndex: 0,
        address: privateKey.toAddress(),
        script: '76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac',
        satoshis: 50_000
    });
    const transaction = new Transaction()
        .from([utxo])
        .to('1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK', 15_000)
        .sign(privateKey);

    res.send(transaction.toString());
});

app.post('/sign-bitcoin-message', (req, res) => {
    const privateKey = new PrivateKey(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    const message = new Message('This is an example of a signed message.');
    const signature = message.sign(privateKey);

    res.send(signature);
});

app.post('/verify-bitcoin-message', (req, res) => {
    const privateKey = new PrivateKey(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    const message = new Message('This is an example of a signed message.');
    const signature = message.sign(privateKey);
    const address = privateKey.toAddress();

    res.send(message.verify(address, signature));
});

app.post('/fail-to-verify-bitcoin-message', (req, res) => {
    const privateKey = new PrivateKey(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    const wrongPrivateKey = new PrivateKey(
        'L2uPYXe17xSTqbCjZvL2DsyXPCbXspvcu5mHLDYUgzdUbZGSKrSr'
    );

    const message = new Message('This is an example of a signed message.');
    const signature = message.sign(privateKey);
    const address = wrongPrivateKey.toAddress();

    res.send(message.verify(address, signature));
});

app.listen();
