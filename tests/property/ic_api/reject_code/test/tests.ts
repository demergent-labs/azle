import { expect, getCanisterActor, it, Test } from 'azle/test';

import { _SERVICE as Actor } from './dfx_generated/caller/caller.did';

export function getTests(): Test {
    return () => {
        it('should return CanisterError for getRejectCodeCanisterThrowError', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            const result =
                await callerCanister.getRejectCodeCanisterThrowError();
            expect(result).toEqual({ CanisterError: null });
        });

        it('should return CanisterReject for getRejectCodeCanisterReject', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            const result = await callerCanister.getRejectCodeCanisterReject();
            expect(result).toEqual({ CanisterReject: null });
        });

        it('should return CanisterNoError for getRejectCodeCanisterNoError', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            const result = await callerCanister.getRejectNoError();
            expect(result).toEqual({ NoError: null });
        });

        it('verifies rejectCode returns a boolean', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            const result = await callerCanister.rejectCodeTypesAreCorrect();
            expect(result).toBe(true);
        });
    };
}
