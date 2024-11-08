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
        it('should always reply with the input in alwaysReplyQuery', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            await fc.assert(
                fc.asyncProperty(fc.string(), async (input) => {
                    const result = await callerCanister.alwaysReplyQuery(input);
                    expect(result).toBe(input);
                }),
                defaultPropTestParams
            );
        });

        it('should always reject with the provided message in alwaysRejectQuery', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            await fc.assert(
                fc.asyncProperty(fc.string(), async (message) => {
                    await expect(
                        callerCanister.alwaysRejectQuery(message)
                    ).rejects.toThrow(escapeCandidString(message));
                }),
                defaultPropTestParams
            );
        });

        it('should reply with even numbers and reject odd numbers in evenOrRejectQuery', async () => {
            const callerCanister = await getCanisterActor<Actor>('caller');
            await fc.assert(
                fc.asyncProperty(fc.bigInt(), async (number) => {
                    if (number % 2n === 0n) {
                        const result =
                            await callerCanister.evenOrRejectQuery(number);
                        expect(result).toBe(number);
                    } else {
                        await expect(
                            callerCanister.evenOrRejectQuery(number)
                        ).rejects.toThrow('Odd numbers are rejected');
                    }
                }),
                defaultPropTestParams
            );
        });

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
    };
}

function escapeCandidString(data: string): string {
    return data.replace(/[\\"']/g, '\\$&');
}
