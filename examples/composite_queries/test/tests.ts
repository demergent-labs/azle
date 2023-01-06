import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/canister1/canister1.did';

export function get_tests(canister1: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'simple_composite_query test',
            test: async () => {
                const result = await canister1.simple_composite_query();
                return {
                    ok: 'ok' in result && result.ok === 'Hello from Canister 2'
                };
            }
        },
        {
            name: 'manual_query test',
            test: async () => {
                const result = await canister1.manual_query();
                return {
                    ok:
                        'ok' in result &&
                        result.ok === 'Hello from Canister 2 manual_query'
                };
            }
        },
        {
            name: 'deep_query test',
            test: async () => {
                const result = await canister1.deep_query();
                return {
                    ok: 'ok' in result && result.ok === 'Hello from Canister 3'
                };
            }
        },
        {
            name: 'update_query test',
            test: async () => {
                const result = await canister1.update_query();
                return {
                    ok:
                        'err' in result &&
                        result.err ===
                            "Rejection code 3, Canister ryjl3-tyaaa-aaaaa-aaaba-cai has no query method 'update_query'"
                };
            }
        },
        {
            name: 'simple_query test',
            test: async () => {
                try {
                    const result = await canister1.simple_query();
                } catch (err: any) {
                    return {
                        ok:
                            err?.result?.reject_message ===
                            'IC0504: Canister rrkah-fqaaa-aaaaa-aaaaq-cai violated contract: "ic0_call_new" cannot be executed in non replicated query mode'
                    };
                }
                return {
                    ok: false
                };
            }
        },
        {
            name: 'simple_update test',
            test: async () => {
                const result = await canister1.simple_update();
                return {
                    ok:
                        'err' in result &&
                        result.err ===
                            'Rejection code 5, IC0527: Composite query cannot be called in replicated mode'
                };
            }
        },
        {
            name: 'inc_canister1 test',
            test: async () => {
                try {
                    const result = await canister1.inc_canister1();
                } catch (err: any) {
                    return {
                        ok:
                            err?.result?.reject_message ===
                            'IC0517: Loop detected.  MVP inter-canister queries do not support loops.'
                    };
                }
                return {
                    ok: false
                };
            }
        },
        {
            name: 'inc_canister2 test',
            test: async () => {
                const result = await canister1.inc_canister2();
                return {
                    ok: 'ok' in result && result.ok === 3n
                };
            }
        }
    ];
}
