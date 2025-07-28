import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/_internal/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should trap from a query method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.string({
                        maxLength: 500,
                        size: 'max'
                    }),
                    async (message) => {
                        const expectedErrorMessage = new RegExp(
                            `Canister called \`ic0.trap\` with message: 'trap proptest message:`
                        );
                        await expect(actor.queryTrap(message)).rejects.toThrow(
                            expectedErrorMessage
                        );
                        await expect(actor.queryTrap(message)).rejects.toThrow(
                            message
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('should trap from an update method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.string({
                        maxLength: 500,
                        size: 'max'
                    }),
                    async (message) => {
                        const expectedErrorMessage = new RegExp(
                            `Canister called \`ic0.trap\` with message: 'trap proptest message:`
                        );
                        await expect(actor.updateTrap(message)).rejects.toThrow(
                            expectedErrorMessage
                        );
                        await expect(actor.updateTrap(message)).rejects.toThrow(
                            message
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('should trap from inspectMessage', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.string({
                        maxLength: 500,
                        size: 'max'
                    }),
                    async (message) => {
                        const expectedErrorMessage = new RegExp(
                            `Canister called \`ic0.trap\` with message: 'trap proptest message:`
                        );
                        await expect(
                            actor.inspectMessageTrap(message)
                        ).rejects.toThrow(expectedErrorMessage);
                        await expect(
                            actor.inspectMessageTrap(message)
                        ).rejects.toThrow(
                            message.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });
    };
}
