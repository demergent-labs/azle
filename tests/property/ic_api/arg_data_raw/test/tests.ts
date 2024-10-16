import {} from '@dfinity/agent';
import {} from '@dfinity/candid';
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
        it('gets the canister version from the canister', async () => {
            await fc.assert(
                fc.asyncProperty(
                    // TODO once we figure out how to escape single quotes in candid strings
                    // we can use fc.string() instead of fc.string().filter((s) => !s.includes("'"))
                    fc.string().filter((s) => !s.includes("'")),
                    fc.string().filter((s) => !s.includes("'")),
                    fc.string().filter((s) => !s.includes("'")),
                    fc.string().filter((s) => !s.includes("'")),
                    async (
                        initArgData,
                        postUpgradeArgData,
                        queryArgData,
                        updateArgData
                    ) => {
                        execSync(
                            `dfx canister uninstall-code canister || true`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        const escapeArgData = (data: string): string => {
                            return data.replace(/[\\"]/g, '\\$&');
                        };

                        const initArgDataCandidString = `("${escapeArgData(
                            initArgData
                        )}")`;

                        execSync(
                            `dfx deploy canister --argument '${initArgDataCandidString}'`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        const actor = await getCanisterActor<Actor>('canister');
                        const initArgDataRaw = await actor.getInitArgDataRaw();
                        const expectedInitArgDataRaw = await actor.candidEncode(
                            initArgDataCandidString
                        );
                        expect(initArgDataRaw).toEqual([
                            expectedInitArgDataRaw
                        ]);

                        const queryArgDataCandidString = `("${escapeArgData(
                            queryArgData
                        )}")`;
                        const queryArgDataRaw =
                            await actor.getQueryArgDataRaw(queryArgData);
                        const expectedQueryArgDataRaw =
                            await actor.candidEncode(queryArgDataCandidString);
                        expect(queryArgDataRaw).toEqual(
                            expectedQueryArgDataRaw
                        );

                        const updateArgDataCandidString = `("${escapeArgData(
                            updateArgData
                        )}")`;
                        const updateArgDataRaw =
                            await actor.getUpdateArgDataRaw(updateArgData);
                        const expectedUpdateArgDataRaw =
                            await actor.candidEncode(updateArgDataCandidString);
                        expect(updateArgDataRaw).toEqual(
                            expectedUpdateArgDataRaw
                        );

                        const postUpgradeArgDataCandidString = `("${escapeArgData(
                            postUpgradeArgData
                        )}")`;

                        execSync(
                            `dfx deploy canister --argument '${postUpgradeArgDataCandidString}' --upgrade-unchanged`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        const postUpgradeArgDataRaw =
                            await actor.getPostUpgradeArgDataRaw();
                        const expectedPostUpgradeArgDataRaw =
                            await actor.candidEncode(
                                postUpgradeArgDataCandidString
                            );
                        expect(postUpgradeArgDataRaw).toEqual([
                            expectedPostUpgradeArgDataRaw
                        ]);
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}
