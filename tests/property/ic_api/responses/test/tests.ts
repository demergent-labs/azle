import { ActorSubclass } from '@dfinity/agent';
import { defaultPropTestParams, expect, it, Test } from 'azle/test';
import fc from 'fast-check';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/caller/caller.did';

export function getTests(callerCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('should always reply with the input in alwaysReplyQuery', async () => {
            await fc.assert(
                fc.asyncProperty(fc.string(), async (input) => {
                    const result = await callerCanister.alwaysReplyQuery(input);
                    expect(result).toBe(input);
                }),
                defaultPropTestParams
            );
        });

        it('should always reject with the provided message in alwaysRejectQuery', async () => {
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
            await fc.assert(
                fc.asyncProperty(fc.string(), async (message) => {
                    const result =
                        await callerCanister.echoThroughReject(message);
                    expect(result).toBe(message);
                }),
                defaultPropTestParams
            );
        });

        it('should return CanisterError for getRejectCodeCanisterError', async () => {
            const result = await callerCanister.getRejectCodeCanisterError();
            expect(result).toEqual({ CanisterError: null });
        });

        it('should return CanisterReject for getRejectCodeCanisterReject', async () => {
            const result = await callerCanister.getRejectCodeCanisterReject();
            expect(result).toEqual({ CanisterReject: null });
        });
    };
}

function escapeCandidString(data: string): string {
    return data.replace(/[\\"']/g, '\\$&');
}
