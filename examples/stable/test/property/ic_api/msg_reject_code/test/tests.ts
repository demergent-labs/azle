import { expect, getCanisterActor, it, Test } from 'azle/_internal/test';

import { _SERVICE as Actor } from './dfx_generated/caller/caller.did';

export function getTests(): Test {
    return () => {
        it('should return CanisterError for getRejectCodeCanisterThrowError', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            const result =
                await callerCanister.getRejectCodeCanisterThrowError();
            expect(result).toEqual(5);
        });

        it('should return CanisterReject for getRejectCodeCanisterReject', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            const result = await callerCanister.getRejectCodeCanisterReject();
            expect(result).toEqual(4);
        });

        it('should return CanisterNoError for getRejectCodeCanisterNoError', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            const result = await callerCanister.getRejectNoError();
            expect(result).toEqual(0);
        });

        it('asserts msgRejectCode static and runtime types', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            expect(await callerCanister.assertTypes()).toBe(true);
        });
    };
}
