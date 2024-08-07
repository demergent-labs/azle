import { getCanisterId } from 'azle/dfx';
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
    const canisterId = getCanisterId('canister');

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
                            `Call failed:\\s*Canister: ${canisterId}\\s*Method: queryTrap \\(query\\)\\s*"Status": "rejected"\\s*"Code": "CanisterError"\\s*"Message": "IC0503: Error from Canister ${canisterId}: Canister called \`ic0.trap\` with message: `
                        );
                        await expect(actor.queryTrap(message)).rejects.toThrow(
                            expectedErrorMessage
                        );
                        await expect(actor.queryTrap(message)).rejects.toThrow(
                            message.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
                        );
                    }
                ),
                defaultPropTestParams
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
                            `Call was rejected:\\s*Request ID: [a-f0-9]{64}\\s*Reject code: 5\\s*Reject text: Error from Canister ${canisterId}: Canister called \`ic0.trap\` with message: `
                        );
                        await expect(actor.updateTrap(message)).rejects.toThrow(
                            expectedErrorMessage
                        );
                        await expect(actor.updateTrap(message)).rejects.toThrow(
                            message
                        );
                    }
                ),
                defaultPropTestParams
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
                            `Call failed:\\s*Canister: ${canisterId}\\s*Method: inspectMessageTrap \\(update\\)\\s*"Request ID": "[a-f0-9]{64}"\\s*"Error code": "IC0503"\\s*"Reject code": "5"\\s*"Reject message": "Error from Canister ${canisterId}: Canister called \`ic0.trap\` with message: `
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
                defaultPropTestParams
            );
        });
    };
}
