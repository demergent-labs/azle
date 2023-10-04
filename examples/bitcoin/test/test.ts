import { ok, getCanisterId, runTests, Test } from 'azle/test';
import { createActor } from './dfx_generated/bitcoin';
import { wallets } from './wallets';
import { impureSetup, whileRunningBitcoinDaemon } from './setup';
import { bitcoinCli } from './bitcoin_cli';

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

function testCanisterFunctionality() {
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

                return {
                    Ok: result === expectedBalance
                };
            }
        },
        {
            name: 'getUtxos',
            test: async () => {
                const result = await bitcoinCanister.getUtxos(
                    wallets.alice.p2wpkh
                );

                return {
                    Ok: result.tip_height === 101 && result.utxos.length === 101
                };
            }
        },
        {
            name: 'getCurrentFeePercentiles',
            test: async () => {
                const result = await bitcoinCanister.getCurrentFeePercentiles();

                return {
                    Ok: result.length === 0 // TODO: This should have entries
                };
            }
        },
        {
            name: 'sendTransaction',
            test: async () => {
                const balance_before_transaction =
                    bitcoinCli.getReceivedByAddress(wallets.bob.p2wpkh);

                const tx_bytes = hex_string_to_bytes(state.signedTxHex);

                const result = await bitcoinCanister.sendTransaction(tx_bytes);

                bitcoinCli.generateToAddress(1, wallets.alice.p2wpkh);

                // Wait for generated block to be pulled into replica
                await new Promise((resolve) => setTimeout(resolve, 5000));

                const balance_after_transaction =
                    bitcoinCli.getReceivedByAddress(wallets.bob.p2wpkh, 0);

                return {
                    Ok:
                        result === true &&
                        balance_before_transaction === 0 &&
                        balance_after_transaction === 1
                };
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
