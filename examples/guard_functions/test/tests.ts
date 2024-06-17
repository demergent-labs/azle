import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

import { _SERVICE } from './dfx_generated/guard_functions/guard_functions.did';

export function getTests(
    guardFunctionsCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('successfully calls an unguarded method with no options object', async () => {
            const result = await guardFunctionsCanister.noOptionsObject();
            expect(result).toBe(true);
        });

        it('successfully calls an unguarded method with an empty options object', async () => {
            const result = await guardFunctionsCanister.emptyOptionsObject();

            expect(result).toBe(true);
        });

        it('successfully calls a method guarded by a function that allows all calls', async () => {
            const result = await guardFunctionsCanister.looselyGuarded();

            expect(result).toBe(true);
        });

        it('successfully calls a manual method guarded by a function that allows all calls', async () => {
            const result = await guardFunctionsCanister.looselyGuardedManual();

            expect(result).toBe(true);
        });

        it('successfully calls a method guarded by a function that allows all calls', async () => {
            const result =
                await guardFunctionsCanister.looselyGuardedWithGuardOptionKeyAsString();

            expect(result).toBe(true);
        });

        it('successfully calls a method guarded by a function that allows all calls and modifies the canister state', async () => {
            const counterBefore = await guardFunctionsCanister.getCounter();
            const methodExecuted =
                await guardFunctionsCanister.modifyStateGuarded();
            const counterAfter = await guardFunctionsCanister.getCounter();

            expect(counterBefore).toBe(0);
            expect(methodExecuted).toBe(true);
            expect(counterAfter).toBe(1);
        });

        it("fails to call a method guarded by a function that doesn't allow any calls", async () => {
            await expect(
                guardFunctionsCanister.tightlyGuarded()
            ).rejects.toThrow(
                `Uncaught Error: Execution halted by \\"unpassable\\" guard function`
            );
        });

        it('fails to call a method guarded by a function that always throws a string', async () => {
            await expect(
                guardFunctionsCanister.errorStringGuarded()
            ).rejects.toThrow(
                `Uncaught Error: Execution halted by \\"throw string\\" guard function`
            );
        });

        it('fails to call a method guarded by a function that always throws a custom error', async () => {
            await expect(
                guardFunctionsCanister.customErrorGuarded()
            ).rejects.toThrow(
                `Uncaught CustomError: Execution halted by \\"throw custom error\\" guard function`
            );
        });

        it('fails to call a method guarded by a function that always throws an object', async () => {
            await expect(
                guardFunctionsCanister.nonStringErrValueGuarded()
            ).rejects.toThrow(`Uncaught Error: [object Object]`);
        });
    };
}
