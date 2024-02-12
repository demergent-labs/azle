import { Server } from 'azle';
import { ethers } from 'ethers';
import express, { Request } from 'express';

export default Server(() => {
    const app = express();

    app.get(
        '/keccak256',
        (req: Request<any, any, any, { message: string }>, res) => {
            res.send(ethers.keccak256(Buffer.from(req.query.message)));
        }
    );

    app.get('/wallet-from-private-key', (req, res) => {
        const wallet = new ethers.Wallet(
            'afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890'
        );

        res.json({
            address: wallet.address,
            publicKey: wallet.signingKey.publicKey,
            privateKey: wallet.privateKey
        });
    });

    // TODO this will run out of cycles until (hopefully) we move away from crypto-browserify
    app.get('/wallet-from-mnemonic', (req, res) => {
        const wallet = ethers.Wallet.fromPhrase(
            'indoor dish desk flag debris potato excuse depart ticket judge file exit'
        );

        res.json({
            address: wallet.address,
            publicKey: wallet.signingKey.publicKey,
            privateKey: wallet.privateKey
        });
    });

    // TODO this will run out of cycles until (hopefully) we move away from crypto-browserify
    app.get('/wallet-from-random', (req, res) => {
        const wallet = ethers.Wallet.createRandom();

        res.json({
            address: wallet.address,
            publicKey: wallet.signingKey.publicKey,
            privateKey: wallet.privateKey
        });
    });

    return app.listen();
});
