import { ok, runTests, Test } from 'azle/test';
import { createActor } from './dfx_generated/bitcoin';
import { wallets } from './wallets';
import { impure_setup, while_running_bitcoin_daemon } from './setup';
import { bitcoin_cli } from './bitcoin_cli';

const bitcoin_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const state = {
    signed_tx_hex: ''
};

export type State = {
    signed_tx_hex: string;
};

const tests: Test[] = [
    ...impure_setup(wallets, state),
    {
        name: 'wait for blockchain balance to reflect',
        wait: 30_000
    },
    ...test_canister_functionality()
];

while_running_bitcoin_daemon(() => runTests(tests));

function test_canister_functionality() {
    return [
        {
            name: 'getBalance',
            test: async () => {
                const result = await bitcoin_canister.getBalance(
                    wallets.alice.p2wpkh
                );

                if (!ok(result)) {
                    return { Err: result.Err };
                }

                const block_reward = 5_000_000_000n;
                const blocks_mined_in_setup = 101n;
                const expected_balance = block_reward * blocks_mined_in_setup;

                return {
                    Ok: result.Ok === expected_balance
                };
            }
        },
        {
            name: 'getUtxos',
            test: async () => {
                const result = await bitcoin_canister.getUtxos(
                    wallets.alice.p2wpkh
                );

                if (!ok(result)) {
                    return { Err: result.Err };
                }

                return {
                    Ok:
                        result.Ok.tip_height === 101 &&
                        result.Ok.utxos.length === 101
                };
            }
        },
        {
            name: 'getCurrentFeePercentiles',
            test: async () => {
                const result =
                    await bitcoin_canister.getCurrentFeePercentiles();

                if (!ok(result)) {
                    return { Err: result.Err };
                }

                return {
                    Ok: result.Ok.length === 0 // TODO: This should have entries
                };
            }
        },
        {
            name: 'sendTransaction',
            test: async () => {
                const balance_before_transaction =
                    bitcoin_cli.get_received_by_address(wallets.bob.p2wpkh);

                const tx_bytes = hex_string_to_bytes(state.signed_tx_hex);

                const result = await bitcoin_canister.sendTransaction(tx_bytes);

                if (!ok(result)) {
                    return {
                        Err: result.Err
                    };
                }

                bitcoin_cli.generate_to_address(1, wallets.alice.p2wpkh);

                // Wait for generated block to be pulled into replica
                await new Promise((resolve) => setTimeout(resolve, 5000));

                const balance_after_transaction =
                    bitcoin_cli.get_received_by_address(wallets.bob.p2wpkh, 0);

                return {
                    Ok:
                        result.Ok === null &&
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
