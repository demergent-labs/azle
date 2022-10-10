// Ethereum genesis block balances taken from: https://raw.githubusercontent.com/lastmjs/eth-total-supply/master/nethermind-foundation.json

import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/ethereum_json_rpc';
import { get_tests } from './tests';

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
    ...get_tests(ethereum_json_rpc_canister)
];

run_tests(tests);
