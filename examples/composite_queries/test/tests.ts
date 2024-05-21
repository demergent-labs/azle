import { ActorSubclass } from '@dfinity/agent';
import { getCanisterId } from 'azle/dfx';
import { createTestResult, equals, failWithMessage, Test } from 'azle/test';

import { _SERVICE } from './dfx_generated/canister1/canister1.did';

export function get_tests(canister1: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'simple_composite_query test',
            test: async () => {
                const result = await canister1.simpleCompositeQuery();
                return equals(result, 'Hello from Canister 2');
            }
        },
        {
            name: 'manual_query test',
            test: async () => {
                const result = await canister1.manualQuery();
                return equals(result, 'Hello from Canister 2 manual query');
            }
        },
        {
            name: 'totally manual_query test',
            test: async () => {
                const result = await canister1.totallyManualQuery();
                return equals(result, 'Hello from Canister 2 manual query');
            }
        },
        {
            name: 'deep_query test',
            test: async () => {
                const result = await canister1.deepQuery();
                return equals(result, 'Hello from Canister 3');
            }
        },
        {
            name: 'update_query test',
            test: async () => {
                const expectedError = `Rejection code 5, Canister ${getCanisterId(
                    'canister2'
                )} has no query method`;
                try {
                    await canister1.updateQuery();
                    return failWithMessage(
                        `Expected to fail with ${expectedError}. Call succeeded instead`
                    );
                } catch (error: any) {
                    return createTestResult(
                        () => error.toString().includes(expectedError),
                        `Expected to fail with ${expectedError}. Received ${error.toString()}`
                    );
                }
            }
        },
        {
            name: 'simple_update test',
            test: async () => {
                const expectedError =
                    'Rejection code 5, IC0527: Composite query cannot be called in replicated mode';
                try {
                    await canister1.simpleUpdate();
                    return failWithMessage(
                        `Expected to fail with ${expectedError}. Call succeeded instead`
                    );
                } catch (error: any) {
                    return createTestResult(
                        () => error.toString().includes(expectedError),
                        `Expected to fail with ${expectedError}. Received ${error.toString()}`
                    );
                }
            }
        },
        {
            name: 'inc_canister1 test',
            test: async () => {
                const result = await canister1.incCanister1();

                return equals(result, 3n);
            }
        },
        {
            name: 'inc_canister2 test',
            test: async () => {
                const result = await canister1.incCanister2();

                return equals(result, 3n);
            }
        }
    ];
}
