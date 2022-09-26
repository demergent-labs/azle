import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../dfx_generated/azle/';

const tecdsa_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

// TODO currently the replica take 5-10 minutes before it is ready to process
// any tecdsa requests, so we are skipping these tests until we can think of
// an elegant way to run these tests only after the replica is ready to process
// them, when we are no longer skipping the tests we can remove the dummy test
const tests: Test[] = [
    ...deploy('azle'),
    {
        name: 'dummy test',
        test: async () => {
            await tecdsa_canister.public_key();
            return {
                ok: true
            };
        }
    },
    {
        name: 'public key',
        test: async () => {
            const result = await tecdsa_canister.public_key();
            return {
                ok: 'ok' in result && result.ok.public_key.length === 33
            };
        },
        skip: true
    },
    {
        name: 'sign message',
        test: async () => {
            const message_hash = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
                1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1
            ];
            const result = await tecdsa_canister.sign(message_hash);
            return {
                ok: 'ok' in result && result.ok.signature.length === 64
            };
        },
        skip: true
    }
];

run_tests(tests);
