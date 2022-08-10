// Ethereum genesis block balances taken from: https://raw.githubusercontent.com/lastmjs/eth-total-supply/master/nethermind-foundation.json

import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/ethereum_json_rpc';

if (process.env.ETHEREUM_URL === undefined) {
    throw new Error(
        `No Ethereum URL set, did you set the ETHEREUM_URL environment variable?\nExample: ETHEREUM_URL=https://some-ethereum-provider-url.org npm test`
    );
}

const ethereum_json_rpc_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('ethereum_json_rpc', `'("${process.env.ETHEREUM_URL}")'`),
    {
        name: 'eth_get_balance 0xeac0827eff0c6e3ff28a7d4a54f65cb7689d7b99',
        test: async () => {
            const result = await ethereum_json_rpc_canister.eth_get_balance(
                '0xeac0827eff0c6e3ff28a7d4a54f65cb7689d7b99'
            );

            const result_json = JSON.parse(result);

            return {
                ok: result_json.result === '0x9ad9e69f9d47520000'
            };
        }
    },
    {
        name: 'eth_get_balance 0xf4b6cdcfcb24230b337d770df6034dfbd4e1503f',
        test: async () => {
            const result = await ethereum_json_rpc_canister.eth_get_balance(
                '0xf4b6cdcfcb24230b337d770df6034dfbd4e1503f'
            );

            const result_json = JSON.parse(result);

            return {
                ok: result_json.result === '0x405fdf7e5af85e00000'
            };
        }
    },
    {
        name: 'eth_get_balance 0x7be2f7680c802da6154c92c0194ae732517a7169',
        test: async () => {
            const result = await ethereum_json_rpc_canister.eth_get_balance(
                '0x7be2f7680c802da6154c92c0194ae732517a7169'
            );

            const result_json = JSON.parse(result);

            return {
                ok: result_json.result === '0xfc936392801c0000'
            };
        }
    },
    {
        name: 'eth_get_block_by_number 0',
        test: async () => {
            const result =
                await ethereum_json_rpc_canister.eth_get_block_by_number(0);

            const result_json = JSON.parse(result);

            return {
                ok: result_json.result.number === `0x${Number(0).toString(16)}`
            };
        }
    },
    {
        name: 'eth_get_block_by_number 1',
        test: async () => {
            const result =
                await ethereum_json_rpc_canister.eth_get_block_by_number(1);

            const result_json = JSON.parse(result);

            return {
                ok: result_json.result.number === `0x${Number(1).toString(16)}`
            };
        }
    },
    {
        name: 'eth_get_block_by_number 2',
        test: async () => {
            const result =
                await ethereum_json_rpc_canister.eth_get_block_by_number(2);

            const result_json = JSON.parse(result);

            return {
                ok: result_json.result.number === `0x${Number(2).toString(16)}`
            };
        }
    }
];

run_tests(tests);
