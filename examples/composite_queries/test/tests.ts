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
                    Ok: result === 'Hello from Canister 2'
                };
            }
        },
        {
            name: 'manual_query test',
            test: async () => {
                const result = await canister1.manualQuery();
                return {
                    Ok: result === 'Hello from Canister 2 manual query'
                };
            }
        },
        {
            name: 'totally manual_query test',
            test: async () => {
                const result = await canister1.totallyManualQuery();
                return {
                    Ok: result === 'Hello from Canister 2 manual query'
                };
            }
        },
        {
            name: 'deep_query test',
            test: async () => {
                const result = await canister1.deepQuery();
                return {
                    Ok: result === 'Hello from Canister 3'
                };
            }
        },
        {
            name: 'update_query test',
            test: async () => {
                try {
                    await canister1.updateQuery();
                    return {
                        Ok: false
                    };
                } catch (error: any) {
                    return {
                        Ok: error
                            .toString()
                            .includes(
                                `Rejection code 3, Canister ${getCanisterId(
                                    'canister2'
                                )} has no query method`
                            )
                    };
                }
            }
        },
        {
            name: 'simple_update test',
            test: async () => {
                try {
                    await canister1.simpleUpdate();
                    return {
                        Ok: false
                    };
                } catch (error: any) {
                    return {
                        Ok: error
                            .toString()
                            .includes(
                                'Rejection code 5, IC0527: Composite query cannot be called in replicated mode'
                            )
                    };
                }
            }
        },
        {
            name: 'inc_canister1 test',
            test: async () => {
                const result = await canister1.incCanister1();

                return {
                    Ok: result === 3n
                };
            }
        },
        {
            name: 'inc_canister2 test',
            test: async () => {
                const result = await canister1.incCanister2();
                return {
                    Ok: result === 3n
                };
            }
        }
    ];
}
