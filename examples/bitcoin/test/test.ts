import { afterAll, beforeAll } from '@jest/globals';
import { getCanisterId } from 'azle/dfx';
import { expect, it, please, runTests, wait } from 'azle/test/jest';

import { bitcoinCli } from './bitcoin_cli';
import { createActor } from './dfx_generated/bitcoin';
import {
    BitcoinDaemon,
    createBitcoinWallet,
    createTransaction,
    getEarliestUtxo,
    mine101Blocks,
    signTransaction,
    startBitcoinDaemon
} from './setup';
import { wallets } from './wallets';

const canisterName = 'bitcoin';

const bitcoinCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(canisterName, () => {
    let bitcoinDaemon: BitcoinDaemon;

    beforeAll(async () => {
        bitcoinDaemon = await startBitcoinDaemon();
        createBitcoinWallet(wallets);
        await mine101Blocks(wallets);
    });

    afterAll(() => {
        bitcoinDaemon.kill();
    });

    wait('for blockchain balance to reflect', 60_000);

    it("gets Alice's balance after initial block rewards are received", async () => {
        const result = await bitcoinCanister.getBalance(wallets.alice.p2wpkh);

        const blockReward = 5_000_000_000n;
        const blocksMinedInSetup = 101n;
        const expectedBalance = blockReward * blocksMinedInSetup;

        expect(result).toBe(expectedBalance);
    });

    it("gets Alice's Utxos", async () => {
        const result = await bitcoinCanister.getUtxos(wallets.alice.p2wpkh);

        expect(result.tip_height).toBe(101);
        expect(result.utxos).toHaveLength(101);
    });

    it('gets an empty list of current fee percentiles since no transaction are on the test net yet', async () => {
        const result = await bitcoinCanister.getCurrentFeePercentiles();

        expect(result).toHaveLength(0);
    });

    it('sends a transaction from Alice to Bob', async () => {
        const receivedBeforeTransaction = bitcoinCli.getReceivedByAddress(
            wallets.bob.p2wpkh
        );

        const utxo = getEarliestUtxo();
        const rawTx = createTransaction(utxo, wallets);
        const signedTxHex = signTransaction(rawTx);
        const tx_bytes = hex_string_to_bytes(signedTxHex);

        const result = await bitcoinCanister.sendTransaction(tx_bytes);

        expect(result).toBe(true);
        expect(receivedBeforeTransaction).toBe(0);
    });

    wait('for transaction to enter mempool', 60_000);

    please('mine one block', () =>
        bitcoinCli.generateToAddress(1, wallets.alice.p2wpkh)
    );

    wait('for generated block to be pulled into replica', 15_000);

    it('ensures transaction was successful', () => {
        const receivedAfterTransaction = bitcoinCli.getReceivedByAddress(
            wallets.bob.p2wpkh,
            0
        );

        expect(receivedAfterTransaction).toBe(1);
    });

    it('gets a list of 101 items from current fee percentiles now that a transaction is recorded', async () => {
        const result = await bitcoinCanister.getCurrentFeePercentiles();

        expect(result).toHaveLength(101);
    });
});

/**
 * Converts a hex string into an array of bytes
 * @param hex The hex string to convert
 * @returns The data as bytes
 */
function hex_string_to_bytes(hex: string): Uint8Array {
    return Uint8Array.from(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );
}
