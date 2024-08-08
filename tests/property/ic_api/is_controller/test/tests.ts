import { Principal } from '@dfinity/principal';
import { whoamiPrincipal } from 'azle/dfx';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should return true for whoami principal from a query method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(fc.constant(undefined), async () => {
                    const principal = Principal.fromText(whoamiPrincipal());

                    const isController =
                        await actor.queryIsController(principal);

                    expect(isController).toStrictEqual(true);
                }),
                defaultPropTestParams
            );
        });

        it('should return true for controller principal from a query method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 29, maxLength: 29 }),
                    async (bytes) => {
                        const principal = Principal.fromUint8Array(bytes);

                        execSync(
                            `dfx canister update-settings canister --add-controller ${principal}`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        const isController =
                            await actor.queryIsController(principal);

                        execSync(
                            `dfx canister update-settings canister --remove-controller ${principal}`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        expect(isController).toStrictEqual(true);
                    }
                ),
                defaultPropTestParams
            );
        });

        it('should return false for non-controller principal from a query method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 29, maxLength: 29 }),
                    async (bytes) => {
                        const principal = Principal.fromUint8Array(bytes);

                        const isController =
                            await actor.queryIsController(principal);

                        expect(isController).toStrictEqual(false);
                    }
                ),
                defaultPropTestParams
            );
        });

        it('should return true for whoami principal from an update method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(fc.constant(undefined), async () => {
                    const principal = Principal.fromText(whoamiPrincipal());

                    const isController =
                        await actor.updateIsController(principal);

                    expect(isController).toStrictEqual(true);
                }),
                defaultPropTestParams
            );
        });

        it('should return true for controller principal from an update method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 29, maxLength: 29 }),
                    async (bytes) => {
                        const principal = Principal.fromUint8Array(bytes);

                        execSync(
                            `dfx canister update-settings canister --add-controller ${principal}`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        const isController =
                            await actor.updateIsController(principal);

                        execSync(
                            `dfx canister update-settings canister --remove-controller ${principal}`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        expect(isController).toStrictEqual(true);
                    }
                ),
                defaultPropTestParams
            );
        });

        it('should return false for non-controller principal from an update method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 29, maxLength: 29 }),
                    async (bytes) => {
                        const principal = Principal.fromUint8Array(bytes);

                        const isController =
                            await actor.updateIsController(principal);

                        expect(isController).toStrictEqual(false);
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}
