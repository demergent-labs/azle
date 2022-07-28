import { Principal } from '@dfinity/principal';
import { deploy, ok, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/call_raw';

const call_raw_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('call_raw'),
    {
        name: 'execute_call_raw raw_rand',
        test: async () => {
            const result = await call_raw_canister.execute_call_raw(
                Principal.fromText('aaaaa-aa'),
                'raw_rand',
                '()',
                0n
            );

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: result.ok.includes('blob')
            };
        }
    },
    {
        name: 'execute_call_raw create_canister',
        test: async () => {
            const result = await call_raw_canister.execute_call_raw(
                Principal.fromText('aaaaa-aa'),
                'create_canister',
                '(record { settings = null })',
                100_000_000_000n
            );

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok:
                    result.ok.includes('record') &&
                    result.ok.includes('principal')
            };
        }
    },
    {
        name: 'execute_call_raw128 raw_rand',
        test: async () => {
            const result = await call_raw_canister.execute_call_raw128(
                Principal.fromText('aaaaa-aa'),
                'raw_rand',
                '()',
                0n
            );

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: result.ok.includes('blob')
            };
        }
    },
    {
        name: 'execute_call_raw128 create_canister',
        test: async () => {
            const result = await call_raw_canister.execute_call_raw128(
                Principal.fromText('aaaaa-aa'),
                'create_canister',
                '(record { settings = null })',
                100_000_000_000n
            );

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok:
                    result.ok.includes('record') &&
                    result.ok.includes('principal')
            };
        }
    }
];

run_tests(tests);
