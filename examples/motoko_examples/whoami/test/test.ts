import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from './dfx_generated/whoami';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { SignIdentity } from '@dfinity/agent';

function createIdentity(seed: number): SignIdentity {
    const seed1 = new Array(32).fill(0);
    seed1[0] = seed;
    return Ed25519KeyIdentity.generate(new Uint8Array(seed1));
}

const identity = createIdentity(1);
const principal = identity.getPrincipal().toString();

const canisterId = 'rrkah-fqaaa-aaaaa-aaaaq-cai'

const whoami_canister = createActor(
    canisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:8000',
            identity
        }
    }
);

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code whoami || true`, {
                stdio: 'inherit'
            });
        }
    },
    {
        // TODO hopefully we can get rid of this: https://forum.dfinity.org/t/generated-declarations-in-node-js-environment-break/12686/16?u=lastmjs
        name: 'waiting for createActor fetchRootKey',
        wait: 5000
    },
    {
        name: 'deploy',
        prep: async () => {
            execSync(`dfx deploy --argument '(principal "${principal}")'`, {
                stdio: 'inherit'
            });
        }
    },
    // {
    //     name: 'installer',
    //     test: async () => {
    //         const result = await whoami_canister.installer();

    //         return {
    //             ok: result === 'TODO: See https://github.com/demergent-labs/azle/issues/271'
    //         };
    //     }
    // },
    {
        name: 'argument',
        test: async () => {
            const result = await whoami_canister.argument();

            return {
                ok: result.toString() === principal
            };
        }
    },
    {
        name: 'whoami',
        test: async () => {
            const result = await whoami_canister.whoami();

            return {
                ok: result.toString() === principal
            };
        }
    },
    {
        name: 'id',
        test: async () => {
            const result = await whoami_canister.id();

            return {
                ok: result.toString() === canisterId
            };
        }
    },
    {
        name: 'idQuick',
        test: async () => {
            const result = await whoami_canister.idQuick();

            return {
                ok: result.toString() === canisterId
            };
        }
    }
];

run_tests(tests);
