import { getCanisterId, Test } from 'azle/test';
import { ActorSubclass } from '@dfinity/agent';
import { _SERVICE } from './dfx_generated/canister1/canister1.did';

export function get_tests(canister1: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'simple_composite_query test',
            test: async () => {
                const result = await canister1.simpleCompositeQuery();
                return {
                    Ok: 'Ok' in result && result.Ok === 'Hello from Canister 2'
                };
            }
        },
        {
            name: 'manual_query test',
            test: async () => {
                const result = await canister1.manualQuery();
                return {
                    Ok:
                        'Ok' in result &&
                        result.Ok === 'Hello from Canister 2 manual query'
                };
            }
        },
        {
            name: 'totally manual_query test',
            test: async () => {
                const result = await canister1.totallyManualQuery();
                return {
                    Ok:
                        'Ok' in result &&
                        result.Ok === 'Hello from Canister 2 manual query'
                };
            }
        },
        {
            name: 'deep_query test',
            test: async () => {
                const result = await canister1.deepQuery();
                return {
                    Ok: 'Ok' in result && result.Ok === 'Hello from Canister 3'
                };
            }
        },
        {
            name: 'update_query test',
            test: async () => {
                const result = await canister1.updateQuery();
                return {
                    Ok:
                        'Err' in result &&
                        result.Err.includes(
                            `Rejection code 3, Canister ${getCanisterId(
                                'canister2'
                            )} has no query method`
                        )
                };
            }
        },
        {
            name: 'simple_update test',
            test: async () => {
                const result = await canister1.simpleUpdate();
                return {
                    Ok:
                        'Err' in result &&
                        result.Err ===
                            'Rejection code 5, IC0527: Composite query cannot be called in replicated mode'
                };
            }
        },
        {
            name: 'inc_canister1 test',
            test: async () => {
                try {
                    const result = await canister1.incCanister1();
                } catch (err: any) {
                    return {
                        Ok:
                            err?.result?.reject_message ===
                            'IC0517: Loop detected.  MVP inter-canister queries do not support loops.'
                    };
                }
                return {
                    Ok: false
                };
            }
        },
        {
            name: 'inc_canister2 test',
            test: async () => {
                const result = await canister1.incCanister2();
                return {
                    Ok: 'Ok' in result && result.Ok === 3n
                };
            }
        }
    ];
}
