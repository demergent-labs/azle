// Ethereum genesis block balances taken from: https://raw.githubusercontent.com/lastmjs/eth-total-supply/master/nethermind-foundation.json

import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/ethereum_json_rpc';
import { getTests } from './tests';

if (process.env.ETHEREUM_URL === undefined) {
    throw new Error(
        `No Ethereum URL set, did you set the ETHEREUM_URL environment variable?\nExample: ETHEREUM_URL=https://some-ethereum-provider-url.org npm test`
    );
}

const ethereumJsonRpcCanister = createActor(
    getCanisterId('ethereum_json_rpc'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(ethereumJsonRpcCanister));
