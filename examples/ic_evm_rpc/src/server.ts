import { ic, jsonStringify } from 'azle';
import { ethers } from 'ethers';
import express, { Request } from 'express';

import { canisterAddress, chainId } from './globals';
import { ethFeeHistory } from './json_rpc_methods/eth_fee_history';
import { ethGetBalance } from './json_rpc_methods/eth_get_balance';
import { ethGetTransactionCount } from './json_rpc_methods/eth_get_transaction_count';
import { ethMaxPriorityFeePerGas } from './json_rpc_methods/eth_max_priority_fee_per_gas';
import { ethSendRawTransaction } from './json_rpc_methods/eth_send_raw_transaction';
import { ecdsaPublicKey } from './tecdsa/ecdsa_public_key';
import { signWithEcdsa } from './tecdsa/sign_with_ecdsa';
import { calculateRsvForTEcdsa } from './tecdsa/calculate_rsv_for_tecdsa';

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
    async (req: Request<any, any, { to: string; value: string }>, res) => {
        // address: 0x9Ac70EE21bE697173b74aF64399d850038697FD3
        const wallet = new ethers.Wallet(
            '0x6f784763681eb712dc16714b8ade23f6c982a5872d054059dd64d0ec4e52be33'
        );

        const to = req.body.to;
        const value = ethers.parseEther(req.body.value);
        const maxPriorityFeePerGas = await ethMaxPriorityFeePerGas();
        const baseFeePerGas = BigInt(
            (await ethFeeHistory()).Consistent?.Ok[0].baseFeePerGas[0]
        );
        const maxFeePerGas = baseFeePerGas * 2n + maxPriorityFeePerGas;
        const gasLimit = 21_000n;
        const nonce = await ethGetTransactionCount(wallet.address);
        const rawTransaction = await wallet.signTransaction({
            to,
            value,
            maxPriorityFeePerGas,
            maxFeePerGas,
            gasLimit,
            nonce,
            chainId
        });

        const result = await ethSendRawTransaction(rawTransaction);

        if (result.Consistent?.Ok?.Ok.length === 1) {
            res.send('transaction sent');
        } else {
            res.status(500).send('transaction failed');
        }
    }
);

app.post(
    '/transfer-from-canister',
    async (req: Request<any, any, { to: string; value: string }>, res) => {
        if (canisterAddress.value === null) {
            canisterAddress.value = ethers.computeAddress(
                ethers.hexlify(await ecdsaPublicKey([ic.id().toUint8Array()]))
            );
        }

        const to = req.body.to;
        const value = ethers.parseEther(req.body.value);
        const maxPriorityFeePerGas = await ethMaxPriorityFeePerGas();
        const baseFeePerGas = BigInt(
            (await ethFeeHistory()).Consistent?.Ok[0].baseFeePerGas[0]
        );
        const maxFeePerGas = baseFeePerGas * 2n + maxPriorityFeePerGas;
        const gasLimit = 21_000n;
        const nonce = await ethGetTransactionCount(canisterAddress.value);

        let tx = ethers.Transaction.from({
            to,
            value,
            maxPriorityFeePerGas,
            maxFeePerGas,
            gasLimit,
            nonce,
            chainId
        });

        const unsignedSerializedTx = tx.unsignedSerialized;
        const unsignedSerializedTxHash = ethers.keccak256(unsignedSerializedTx);

        const signedSerializedTxHash = await signWithEcdsa(
            [ic.id().toUint8Array()],
            ethers.getBytes(unsignedSerializedTxHash)
        );

        const { r, s, v } = calculateRsvForTEcdsa(
            canisterAddress.value,
            unsignedSerializedTxHash,
            signedSerializedTxHash
        );

        tx.signature = {
            r,
            s,
            v
        };

        const rawTransaction = tx.serialized;

        const result = await ethSendRawTransaction(rawTransaction);

        if (result.Consistent?.Ok?.Ok.length === 1) {
            res.send('transaction sent');
        } else {
            res.status(500).send('transaction failed');
        }
    }
);

app.listen();
