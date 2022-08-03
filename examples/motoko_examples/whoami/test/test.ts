import { deploy, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../dfx_generated/azle';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { SignIdentity } from '@dfinity/agent';

function createIdentity(seed: number): SignIdentity {
    const seed1 = [seed, ...new Array(31).fill(0)];
    return Ed25519KeyIdentity.generate(Uint8Array.from(seed1));
}

const installationPrincipal = execSync(`dfx identity get-principal`)
    .toString()
    .trim();

const callingIdentity = createIdentity(1);
const callingPrincipal = callingIdentity.getPrincipal().toString();

const someoneIdentity = createIdentity(2);
const someonePrincipal = someoneIdentity.getPrincipal().toString();

const canisterId = 'rrkah-fqaaa-aaaaa-aaaaq-cai';

const whoami_canister = createActor(canisterId, {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        identity: callingIdentity
    }
});

const tests: Test[] = [
    ...deploy('azle', `'(principal "${someonePrincipal}")'`),
    {
        name: 'installer',
        test: async () => {
            const result = await whoami_canister.installer();

            return {
                ok: result.toString() === installationPrincipal
            };
        }
    },
    {
        name: 'argument',
        test: async () => {
            const result = await whoami_canister.argument();

            return {
                ok: result.toString() === someonePrincipal
            };
        }
    },
    {
        name: 'whoami',
        test: async () => {
            const result = await whoami_canister.whoami();

            return {
                ok: result.toString() === callingPrincipal
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
        name: 'id_quick',
        test: async () => {
            const result = await whoami_canister.id_quick();

            return {
                ok: result.toString() === canisterId
            };
        }
    },
    {
        // TODO Get rid of this once https://forum.dfinity.org/t/upgrade-a-canister-even-if-the-wasm-module-hash-has-not-changed/11989
        name: 'function hack to allow a redeploy',
        prep: async () => {
            execSync(
                `echo "\\n\\nexport function hack(): Query<void> {}" >> canisters/azle/index.ts`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    {
        name: 'redeploy',
        prep: async () => {
            execSync(
                `dfx canister install --mode upgrade --argument '(principal "${callingPrincipal}")' azle --wasm target/wasm32-unknown-unknown/release/azle.wasm.gz`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    {
        name: 'updated argument',
        test: async () => {
            const result = await whoami_canister.argument();

            return {
                ok: result.toString() === callingPrincipal
            };
        }
    }
    // TODO: To make this test really robust, we would use a different identity
    // when re-deploying the canister. Then we would assert that
    // `whoami_canister.installer()` returns the new installer's principal.
];

run_tests(tests);
