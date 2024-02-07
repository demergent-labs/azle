import { Server } from 'azle';
import { PrivateKey, Message, Transaction } from 'bitcore-lib';
import express from 'express';

export default Server(() => {
    const app = express();

    app.get('/get-address', (req, res) => {
        const privateKey = new PrivateKey(
            'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
        );
        res.send(privateKey.toAddress());
    });

    app.get('/get-public-key', (req, res) => {
        const privateKey = new PrivateKey(
            'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
        );
        res.send(privateKey.toPublicKey());
    });

    app.get('/get-private-key', (req, res) => {
        const privateKey = new PrivateKey(
            'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
        );
        res.json(privateKey.toJSON());
    });

    app.get('/get-private-key-wif', (req, res) => {
        const privateKey = new PrivateKey(
            'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
        );
        res.send(privateKey.toWIF());
    });

    app.get('/create-transaction', (req, res) => {
        const privateKey = new PrivateKey(
            'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
        );
        const utxo = Transaction.UnspentOutput.fromObject({
            txId: '115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986',
            outputIndex: 0,
            address: privateKey.toAddress(),
            script: '76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac',
            satoshis: 50000
        });
        const transaction = new Transaction()
            .from([utxo])
            .to('1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK', 15000)
            .sign(privateKey);

        res.send(transaction);
    });

    app.post('/sign-bitcoin-message', (req, res) => {
        const privateKey = new PrivateKey(
            'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
        );
        const message = new Message('This is an example of a signed message.');
        const signature = message.sign(privateKey);

        res.send(signature);
    });

    app.post('/verify-bitcoin-message', (req, res) => {
        const privateKey = new PrivateKey(
            'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
        );
        const message = new Message('This is an example of a signed message.');
        const signature = message.sign(privateKey);
        const address = privateKey.toAddress();
        console.log(signature);

        res.send(message.verify(address, signature));
    });

    return app.listen();
});
