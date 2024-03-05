import { ic, jsonStringify, Server } from 'azle';
import express, { Request } from 'express';
import { ethers } from 'ethers';

import { canisterAddress, chainId } from './globals';
import { ethGasPrice } from './json_rpc_methods/eth_gas_price';
import { ethGetBalance } from './json_rpc_methods/eth_getBalance';
import { ethGetTransactionCount } from './json_rpc_methods/eth_getTransactionCount';
import { ethSendRawTransaction } from './json_rpc_methods/eth_sendRawTransaction';
import { ecdsaPublicKey } from './tecdsa/ecdsa_public_key';
import { signWithEcdsa } from './tecdsa/sign_with_ecdsa';

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.post('/caller-address', async (_req, res) => {
        const address = ethers.computeAddress(
            ethers.hexlify(await ecdsaPublicKey([ic.caller().toUint8Array()]))
        );

        res.send(address);
    });

    app.post('/canister-address', async (_req, res) => {
        if (canisterAddress.value === null) {
            canisterAddress.value = ethers.computeAddress(
                ethers.hexlify(await ecdsaPublicKey([ic.id().toUint8Array()]))
            );
        }

        res.send(canisterAddress.value);
    });

    app.post(
        '/address-balance',
        async (req: Request<any, any, { address: string }>, res) => {
            const balance = await ethGetBalance(req.body.address);

            res.send(jsonStringify(balance));
        }
    );

    app.post(
        '/transfer-from-sepolia-faucet-wallet',
        async (req: Request<any, any, { to: string; amount: string }>, res) => {
            // address: 0x9Ac70EE21bE697173b74aF64399d850038697FD3
            const wallet = new ethers.Wallet(
                '0x6f784763681eb712dc16714b8ade23f6c982a5872d054059dd64d0ec4e52be33'
            );

            const to = req.body.to;
            const value = ethers.parseEther(req.body.amount);
            const gasPrice = await ethGasPrice();
            const gasLimit = 21_000n;
            const nonce = await ethGetTransactionCount(wallet.address);
            const rawTransaction = await wallet.signTransaction({
                to,
                value,
                gasPrice,
                gasLimit,
                nonce,
                chainId
            });

            const result = await ethSendRawTransaction(rawTransaction);

            if (result.Consistent?.Ok?.Ok === null) {
                res.send('transaction sent');
            } else {
                res.status(500).send('transaction failed');
            }
        }
    );

    app.post(
        '/transfer-from-canister',
        async (req: Request<any, any, { to: string; amount: string }>, res) => {
            if (canisterAddress.value === null) {
                canisterAddress.value = ethers.computeAddress(
                    ethers.hexlify(
                        await ecdsaPublicKey([ic.id().toUint8Array()])
                    )
                );
            }

            const to = req.body.to;
            const value = ethers.parseEther(req.body.amount);
            const gasPrice = await ethGasPrice();
            const gasLimit = 21_000n;
            const nonce = await ethGetTransactionCount(canisterAddress.value);

            const tx = ethers.Transaction.from({
                to,
                value,
                gasPrice,
                gasLimit,
                nonce,
                chainId
            });

            const unsignedSerializedTx = tx.unsignedSerialized;
            const unsignedSerializedTxHash =
                ethers.keccak256(unsignedSerializedTx);

            const signedSerializedTxHash = await signWithEcdsa(
                [ic.id().toUint8Array()],
                ethers.getBytes(unsignedSerializedTxHash)
            );

            const r = ethers.hexlify(signedSerializedTxHash.slice(0, 32));
            const s = ethers.hexlify(signedSerializedTxHash.slice(32, 64));
            const v = 27; // TODO this is most likely not correct but isn't strictly required

            tx.signature = {
                r,
                s,
                v
            };

            const rawTransaction = tx.serialized;

            // TODO get the result and add error handling
            // TODO to send a transaction maybe we should only talk to one provider?
            const result = await ethSendRawTransaction(rawTransaction);

            console.log('result', result);

            if (result.Consistent?.Ok?.Ok === null) {
                res.send('transaction sent');
            } else {
                res.status(500).send('transaction failed');
            }
        }
    );

    return app.listen();
});
