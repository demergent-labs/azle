// Ethereum genesis block balances taken from: https://raw.githubusercontent.com/lastmjs/eth-total-supply/master/nethermind-foundation.json

import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/ethereum_json_rpc';
import { getTests } from './tests';

if (process.env.ETHEREUM_URL === undefined) {
    throw new Error(
        `No Ethereum URL set, did you set the ETHEREUM_URL environment variable?\nExample: ETHEREUM_URL=https://some-ethereum-provider-url.org npm test`
    );
}

const canisterName = 'ethereum_json_rpc';
const ethereumJsonRpcCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(ethereumJsonRpcCanister));
