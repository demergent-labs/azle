import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should always reject with the provided message in alwaysRejectQuery', async () => {
            const canister = await getCanisterActor<Actor>('canister');
            await fc.assert(
                fc.asyncProperty(fc.string(), async (message) => {
                    await expect(
                        canister.alwaysRejectQuery(message)
                    ).rejects.toThrow(
                        message.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
                    );
                }),
                defaultPropTestParams()
            );
        });

        it('should reply with even numbers and reject odd numbers in evenOrRejectQuery', async () => {
            const canister = await getCanisterActor<Actor>('canister');
            await fc.assert(
                fc.asyncProperty(fc.bigInt(), async (number) => {
                    if (number % 2n === 0n) {
                        const result = await canister.evenOrRejectQuery(number);
                        expect(result).toBe(number);
                    } else {
                        await expect(
                            canister.evenOrRejectQuery(number)
                        ).rejects.toThrow('Odd numbers are rejected');
                    }
                }),
                defaultPropTestParams()
            );
        });

        it('should always reject with the provided message in alwaysRejectUpdate', async () => {
            const canister = await getCanisterActor<Actor>('canister');
            await fc.assert(
                fc.asyncProperty(fc.string(), async (message) => {
                    await expect(
                        canister.alwaysRejectUpdate(message)
                    ).rejects.toThrow(
                        message.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
                    );
                }),
                defaultPropTestParams()
            );
        });

        it('should reply with even numbers and reject odd numbers in evenOrRejectUpdate', async () => {
            const canister = await getCanisterActor<Actor>('canister');
            await fc.assert(
                fc.asyncProperty(fc.bigInt(), async (number) => {
                    if (number % 2n === 0n) {
                        const result =
                            await canister.evenOrRejectUpdate(number);
                        expect(result).toBe(number);
                    } else {
                        await expect(
                            canister.evenOrRejectUpdate(number)
                        ).rejects.toThrow('Odd numbers are rejected');
                    }
                }),
                defaultPropTestParams()
            );
        });
    };
}
