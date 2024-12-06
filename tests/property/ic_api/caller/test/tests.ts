import { Ed25519KeyIdentity } from '@dfinity/identity';
import { Principal } from '@dfinity/principal';
import { createAuthenticatedAgent, whoami } from 'azle/dfx';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    please,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should return the init principal', async () => {
            const agent: any = await createAuthenticatedAgent(whoami());
            const agentPrincipalText = (await agent.getPrincipal()).toText();

            const actor = await getCanisterActor<Actor>('canister', {
                agent
            });

            const initCaller = await actor.getInitCaller();

            expect(initCaller[0]?.toText()).toBe(agentPrincipalText);
        });

        please('deploy the canister again', () => {
            execSync(`dfx deploy --upgrade-unchanged`, {
                stdio: 'inherit'
            });
        });

        it('should return the preUpgrade principal', async () => {
            const agent: any = await createAuthenticatedAgent(whoami());
            const agentPrincipalText = (await agent.getPrincipal()).toText();

            const actor = await getCanisterActor<Actor>('canister', {
                agent
            });

            const preUpgradeCaller = await actor.getPreUpgradeCaller();

            expect(preUpgradeCaller[0]?.toText()).toBe(agentPrincipalText);
        });

        it('should return the postUpgrade principal', async () => {
            const agent: any = await createAuthenticatedAgent(whoami());
            const agentPrincipalText = (await agent.getPrincipal()).toText();

            const actor = await getCanisterActor<Actor>('canister', {
                agent
            });

            const postUpgradeCaller = await actor.getPostUpgradeCaller();

            expect(postUpgradeCaller[0]?.toText()).toBe(agentPrincipalText);
        });

        it('should return the anonymous principal', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            const queryCaller = await actor.getQueryCaller();
            const updateCaller = await actor.getUpdateCaller();

            const anonymousPrincipalText =
                Principal.fromText('2vxsx-fae').toText();

            expect(queryCaller.toText()).toBe(anonymousPrincipalText);
            expect(updateCaller.toText()).toBe(anonymousPrincipalText);
        });

        it('should return the inspectMessage principal', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 32, maxLength: 32 }),
                    async (bytes) => {
                        const identity = Ed25519KeyIdentity.generate(bytes);
                        const identityPrincipalText = identity
                            .getPrincipal()
                            .toText();

                        const actor = await getCanisterActor<Actor>(
                            'canister',
                            {
                                identity
                            }
                        );

                        await actor.setInspectMessageCaller();
                        const inspectMessageCaller =
                            await actor.getInspectMessageCaller();

                        expect(inspectMessageCaller[0]?.toText()).toBe(
                            identityPrincipalText
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('should return the caller principal for query and update', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 32, maxLength: 32 }),
                    async (bytes) => {
                        const identity = Ed25519KeyIdentity.generate(bytes);
                        const identityPrincipalText = identity
                            .getPrincipal()
                            .toText();

                        const actor = await getCanisterActor<Actor>(
                            'canister',
                            {
                                identity
                            }
                        );

                        const queryCaller = await actor.getQueryCaller();
                        const updateCaller = await actor.getUpdateCaller();

                        expect(queryCaller.toText()).toBe(
                            identityPrincipalText
                        );
                        expect(updateCaller.toText()).toBe(
                            identityPrincipalText
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('verifies that caller returns a Principal', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            expect(await actor.callerTypesAreCorrect()).toBe(true);
        });
    };
}
