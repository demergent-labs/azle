import { getCanisterId } from 'azle/dfx';
import { runTests, Test, testEquality } from 'azle/test';

import { bitcoinCli } from './bitcoin_cli';
import { createActor } from './dfx_generated/bitcoin';
import { impureSetup, whileRunningBitcoinDaemon } from './setup';
import { wallets } from './wallets';

const bitcoinCanister = createActor(getCanisterId('bitcoin'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const state = {
    signedTxHex: ''
};

export type State = {
    signedTxHex: string;
};

const tests: Test[] = [
    ...impureSetup(wallets, state),
    {
        name: 'wait for blockchain balance to reflect',
        wait: 60_000
    },
    ...testCanisterFunctionality()
];

whileRunningBitcoinDaemon(() => runTests(tests));

function testCanisterFunctionality(): Test[] {
    return [
        {
            name: 'getBalance',
            test: async () => {
                const result = await bitcoinCanister.getBalance(
                    wallets.alice.p2wpkh
                );

                const blockReward = 5_000_000_000n;
                const blocksMinedInSetup = 101n;
                const expectedBalance = blockReward * blocksMinedInSetup;

                return testEquality(result, expectedBalance);
            }
        },
        {
            name: 'check tip_height and length of getUtxos result',
            test: async () => {
                const result = await bitcoinCanister.getUtxos(
                    wallets.alice.p2wpkh
                );

                return testEquality(
                    [result.tip_height, result.utxos.length],
                    [101, 101]
                );
            }
        },
        {
            name: 'getCurrentFeePercentiles',
            test: async () => {
                const result = await bitcoinCanister.getCurrentFeePercentiles();

                return testEquality(
                    result.length,
                    0,
                    `Expected there to be no fee percentile information before any transactions were sent. Received ${result.length}`
                );
            }
        },
        {
            name: 'sendTransaction',
            test: async () => {
                const receivedBeforeTransaction =
                    bitcoinCli.getReceivedByAddress(wallets.bob.p2wpkh);

                const tx_bytes = hex_string_to_bytes(state.signedTxHex);

                const result = await bitcoinCanister.sendTransaction(tx_bytes);

                bitcoinCli.generateToAddress(1, wallets.alice.p2wpkh);

                // Wait for generated block to be pulled into replica
                await new Promise((resolve) => setTimeout(resolve, 5000));

                const receivedAfterTransaction =
                    bitcoinCli.getReceivedByAddress(wallets.bob.p2wpkh, 0);

                return testEquality(
                    [
                        result,
                        receivedBeforeTransaction,
                        receivedAfterTransaction
                    ],
                    [true, 0, 1]
                );
            }
        }
    ];
}

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
