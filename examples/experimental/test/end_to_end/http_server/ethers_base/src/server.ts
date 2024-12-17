import { ic, jsonStringify, ThresholdWallet } from 'azle/experimental';
import { ethers } from 'ethers';
import express, { Request } from 'express';

const app = express();

app.use(express.json());

app.get('/caller-address', async (_req, res) => {
    const wallet = new ThresholdWallet(
        {
            derivationPath: [ic.caller().toUint8Array()]
        },
        ethers.getDefaultProvider('https://sepolia.base.org')
    );

    res.send(await wallet.getAddress());
});

app.get('/canister-address', async (_req, res) => {
    const wallet = new ThresholdWallet(
        {
            derivationPath: [ic.id().toUint8Array()]
        },
        ethers.getDefaultProvider('https://sepolia.base.org')
    );

    res.send(await wallet.getAddress());
});

app.get(
    '/address-balance',
    async (req: Request<any, any, any, { address: string }>, res) => {
        const balance = await ethers
            .getDefaultProvider('https://sepolia.base.org')
            .getBalance(req.query.address);

        res.send(jsonStringify(balance));
    }
);

app.post(
    '/transfer-from-sepolia-faucet-wallet',
    async (req: Request<any, any, { to: string; value: string }>, res) => {
        // address: 0x9Ac70EE21bE697173b74aF64399d850038697FD3
        const wallet = new ethers.Wallet(
            '0x6f784763681eb712dc16714b8ade23f6c982a5872d054059dd64d0ec4e52be33',
            ethers.getDefaultProvider('https://sepolia.base.org')
        );

        const to = req.body.to;
        const value = ethers.parseEther(req.body.value);
        const gasLimit = 21_000n;

        const tx = await wallet.sendTransaction({
            to,
            value,
            gasLimit
        });

        res.send(`transaction sent with hash: ${tx.hash}`);
    }
);

app.post(
    '/transfer-from-canister',
    async (req: Request<any, any, { to: string; value: string }>, res) => {
        try {
            const wallet = new ThresholdWallet(
                {
                    derivationPath: [ic.id().toUint8Array()]
                },
                ethers.getDefaultProvider('https://sepolia.base.org')
            );

            const to = req.body.to;
            const value = ethers.parseEther(req.body.value);
            const gasLimit = 21_000n;

            const tx = await wallet.sendTransaction({
                to,
                value,
                gasLimit
            });

            res.send(`transaction sent with hash: ${tx.hash}`);
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: {
                    code: error.code || 'UNKNOWN_ERROR',
                    message: error.message,
                    details: error.info || null
                }
            });
        }
    }
);

app.listen();
