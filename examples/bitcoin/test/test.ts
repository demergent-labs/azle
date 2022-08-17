import { deploy, ok, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/bitcoin';
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
    ...deploy('bitcoin'),
    ...test_canister_functionality()
];

while_running_bitcoin_daemon(() => run_tests(tests));

function test_canister_functionality() {
    return [
        {
            name: 'get_balance',
            skip: true,
            test: async () => {
                const result = await bitcoin_canister.get_balance(
                    wallets.alice.p2wpkh
                );

                if (!ok(result)) {
                    return { err: result.err };
                }

                const block_reward = 5000000000n;
                const blocks_mined_in_setup = 101n;
                const expected_balance = block_reward * blocks_mined_in_setup;

                return {
                    ok: result.ok === expected_balance
                };
            }
        },
        {
            name: 'get_utxos',
            test: async () => {
                const result = await bitcoin_canister.get_utxos(
                    wallets.alice.p2wpkh
                );

                if (!ok(result)) {
                    return { err: result.err };
                }

                return {
                    ok:
                        result.ok.tip_height === 101 &&
                        result.ok.utxos.length === 101
                };
            }
        },
        {
            name: 'get_current_fee_percentiles',
            test: async () => {
                const result =
                    await bitcoin_canister.get_current_fee_percentiles();

                if (!ok(result)) {
                    return { err: result.err };
                }

                return {
                    ok: result.ok.length === 0 // TODO: This should have entries
                };
            }
        },
        {
            name: 'send transaction',
            test: async () => {
                const balance_before_transaction =
                    bitcoin_cli.get_received_by_address(wallets.bob.p2wpkh);

                const tx_bytes = hex_string_to_bytes(state.signed_tx_hex);

                const result = await bitcoin_canister.send_transaction(
                    Array.from(tx_bytes)
                );

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                bitcoin_cli.generate_to_address(1, wallets.alice.p2wpkh);

                // Wait for generated block to be pulled into replica
                await new Promise((resolve) => setTimeout(resolve, 5000));

                const balance_after_transaction =
                    bitcoin_cli.get_received_by_address(wallets.bob.p2wpkh, 0);

                return {
                    ok:
                        result.ok === null &&
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
