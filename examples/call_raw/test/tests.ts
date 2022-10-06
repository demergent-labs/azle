import { ok, Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/call_raw/call_raw.did';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export function get_tests(call_raw_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
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
}
