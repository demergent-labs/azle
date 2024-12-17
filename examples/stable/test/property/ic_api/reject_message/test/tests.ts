import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/caller/caller.did';

export function getTests(): Test {
    return () => {
        it('should echo the rejection message in echoThroughReject', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            await fc.assert(
                fc.asyncProperty(fc.string(), async (message) => {
                    const result =
                        await callerCanister.echoThroughReject(message);
                    expect(result).toBe(
                        `reject_message proptest message: ${message}`
                    );
                }),
                defaultPropTestParams()
            );
        });

        it('asserts rejectMessage static and runtime types', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            expect(await callerCanister.assertTypes('')).toBe(true);
        });
    };
}
