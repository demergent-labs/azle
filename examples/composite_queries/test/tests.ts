import { ActorSubclass } from '@dfinity/agent';
import { getCanisterId } from 'azle/dfx';
import { expect, it, Test } from 'azle/test/jest';

import { _SERVICE } from './dfx_generated/canister1/canister1.did';

export function getTests(canister1: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('performs a simple composite query', async () => {
            const result = await canister1.simpleCompositeQuery();

            expect(result).toBe('Hello from Canister 2');
        });

        it('performs a simple manual query', async () => {
            const result = await canister1.manualQuery();

            expect(result).toBe('Hello from Canister 2 manual query');
        });

        it('performs a manual query where all involved methods were manual', async () => {
            const result = await canister1.totallyManualQuery();

            expect(result).toBe('Hello from Canister 2 manual query');
        });

        it('performs a composite query that performs a composite query', async () => {
            const result = await canister1.deepQuery();

            expect(result).toBe('Hello from Canister 3');
        });

        it('fails to perform a composite query attempting to call an update method', async () => {
            const canisterId = getCanisterId('canister2');
            const partialErrorMessage = new RegExp(
                `Rejection code 5, Error from Canister ${canisterId}: Canister has no query method`
            );

            await expect(canister1.updateQuery()).rejects.toThrow(
                partialErrorMessage
            );
        });

        it('fails to perform a composite query from a regular query', async () => {
            const partialErrorMessage = new RegExp(
                `Rejection code 5, IC0527: Composite query cannot be called in replicated mode`
            );

            await expect(canister1.simpleUpdate()).rejects.toThrow(
                partialErrorMessage
            );
        });

        it('unwinds modified state of canister1 between sequential composite queries to itself', async () => {
            const result = await canister1.incCanister1();

            expect(result).toBe(3n);
        });

        it('unwinds modified state of canister2 between sequential composite queries from canister1', async () => {
            const result = await canister1.incCanister2();

            expect(result).toBe(3n);
        });
    };
}
