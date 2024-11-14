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
                    expect(result).toBe(message);
                }),
                defaultPropTestParams
            );
        });
    };
}
