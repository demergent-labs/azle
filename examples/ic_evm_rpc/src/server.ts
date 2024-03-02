// TODO use body params instead of query params
// TODO it would be really nice to have the canister's Ethereum address
// TODO be the same each time, but on dfx --clean the address changes
// TODO for tests we can have a sepolia address locally
// TODO that has a lot of ETH in it for tests on the testnets

import { ic, jsonStringify, Server } from 'azle';
import express, { Request } from 'express';
import { ethers } from 'ethers';

import { register as registerEthFeeHistory } from './json_rpc_methods/eth_feeHistory';
import { generateTEcdsaAddress } from './utils/generate_tecdsa_address';
import { fetchBalanceForAddress } from './utils/fetch_balance_for_address';
import { ethSendRawTransaction } from './json_rpc_methods/eth_sendRawTransaction';
import { signWithEcdsa } from './utils/sign_with_ecdsa';
import { ethGetTransactionCount } from './json_rpc_methods/eth_getTransactionCount';
import { ethGasPrice } from './json_rpc_methods/eth_gas_price';

let canisterAddress: string | null = null;
export let chainId = 11_155_111; // TODO hard-coded to Sepolia for the moment

export default Server(() => {
    const app = express();

    registerEthFeeHistory(app);

    app.post('/caller-address', async (req, res) => {
        const address = await generateTEcdsaAddress([
            ic.caller().toUint8Array()
        ]);

        res.json(address);
    });

    app.post('/canister-address', async (req, res) => {
        if (canisterAddress === null) {
            canisterAddress = await generateTEcdsaAddress([
                ic.id().toUint8Array()
            ]);
        }

        res.json(canisterAddress);
    });

    app.post(
        '/address-balance',
        async (req: Request<any, any, any, { address: string }>, res) => {
            const balance = await fetchBalanceForAddress(req.query.address);

            res.json(jsonStringify(balance));
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
            const gasLimit = 21_000;
            const nonce = Number(await ethGetTransactionCount(wallet.address));
            const rawTransaction = await wallet.signTransaction({
                to,
                value,
                gasPrice,
                gasLimit,
                nonce,
                chainId
            });

            // TODO get the result and add error handling
            // TODO to send a transaction maybe we should only talk to one provider?
            const result = await ethSendRawTransaction(rawTransaction);

            console.log('result', result);

            res.json('transaction sent');
        }
    );

    app.post(
        '/transfer-from-canister',
        async (
            req: Request<any, any, any, { to: string; amount: string }>,
            res
        ) => {
            if (canisterAddress === null) {
                canisterAddress = await generateTEcdsaAddress([
                    ic.id().toUint8Array()
                ]);
            }

            const to = req.query.to;
            const value = ethers.parseEther(req.query.amount);
            const gasPrice = await ethGasPrice();
            const gasLimit = 21_000;
            const nonce = await ethGetTransactionCount(canisterAddress);

            let tx = new ethers.Transaction();

            tx.to = to;
            tx.value = value;
            tx.gasPrice = gasPrice;
            tx.gasLimit = gasLimit;
            tx.nonce = nonce;
            tx.chainId = chainId;

            const unsignedSerializedTx = tx.unsignedSerialized;
            const unsignedSerializedTxHash =
                ethers.keccak256(unsignedSerializedTx);

            const signedSerializedTxHash = (
                await signWithEcdsa(
                    [ic.id().toUint8Array()],
                    ethers.getBytes(unsignedSerializedTxHash)
                )
            ).signature;

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

            res.json('transaction sent');
        }
    );

    return app.listen();
});
