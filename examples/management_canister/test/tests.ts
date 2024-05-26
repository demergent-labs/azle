import { ActorSubclass } from '@dfinity/agent';
import { fail, succeed, Test, test, testEquality } from 'azle/test';
import { readFileSync } from 'fs';

import { _SERVICE } from './dfx_generated/management_canister/management_canister.did';

export function getTests(managementCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'executeCreateCanister',
            test: async () => {
                const result = await managementCanister.executeCreateCanister();

                return test(
                    result.canister_id !== undefined &&
                        result.canister_id !== null
                );
            }
        },
        {
            name: 'executeUpdateSettings',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                await managementCanister.executeUpdateSettings(canisterId);

                const getCanisterStatusResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                const canisterSettings = getCanisterStatusResult.settings;

                const actual = [
                    canisterSettings.compute_allocation,
                    canisterSettings.memory_allocation,
                    canisterSettings.freezing_threshold
                ];
                const expected = [1n, 3_000_000n, 2_000_000n];
                return testEquality(actual, expected);
            }
        },
        {
            name: 'executeInstallCode',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                // this Wasm module is for a simple canister written in Motoko that has one query method called hello that returns a string
                const wasmModule = Array.from(readFileSync('src/test.wasm'));

                const result = await managementCanister.executeInstallCode(
                    canisterId,
                    wasmModule as any
                );

                return test(result);
            }
        },
        {
            name: 'executeDepositCycles',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const statusBefore = await managementCanister.getCanisterStatus(
                    {
                        canister_id: canisterId
                    }
                );

                const cyclesBefore = statusBefore.cycles;

                await managementCanister.executeDepositCycles(canisterId);

                const statusAfter = await managementCanister.getCanisterStatus({
                    canister_id: canisterId
                });

                const cyclesAfter = statusAfter.cycles;

                return test(cyclesAfter > cyclesBefore);
            }
        },
        {
            name: 'executeUninstallCode',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                await managementCanister.executeUninstallCode(canisterId);

                const getCanisterStatusResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                const canisterStatus = getCanisterStatusResult;

                return testEquality(canisterStatus.module_hash.length, 0);
            }
        },
        {
            name: 'executeStopCanister',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                await managementCanister.executeStopCanister(canisterId);

                const getCanisterStatusResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                const canisterStatus = getCanisterStatusResult;

                return test('stopped' in canisterStatus.status);
            }
        },
        {
            name: 'executeStartCanister',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const getCanisterStatusBeforeResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                const canisterStatusBefore = getCanisterStatusBeforeResult;

                if ('stopped' in canisterStatusBefore.status === false) {
                    return fail();
                }

                await managementCanister.executeStartCanister(canisterId);

                const getCanisterStatusAfterResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                const canisterStatusAfter = getCanisterStatusAfterResult;

                return test('running' in canisterStatusAfter.status);
            }
        },
        {
            name: 'getCanisterStatus',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const getCanisterStatusResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                const canisterStatus = getCanisterStatusResult;

                return test(
                    'running' in canisterStatus.status &&
                        canisterStatus.memory_size === 342n &&
                        canisterStatus.cycles >= 800_000_000_000n &&
                        canisterStatus.settings.freezing_threshold ===
                            2_000_000n &&
                        canisterStatus.settings.controllers.length === 1 &&
                        canisterStatus.settings.memory_allocation ===
                            3_000_000n &&
                        canisterStatus.settings.compute_allocation === 1n &&
                        canisterStatus.module_hash.length === 0
                );
            }
        },
        {
            name: 'getCanisterInfo',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const canisterInfo = await managementCanister.getCanisterInfo({
                    canister_id: canisterId,
                    num_requested_changes: [50n]
                });

                const actual = [
                    canisterInfo.total_num_changes,
                    canisterInfo.recent_changes.length,
                    canisterInfo.module_hash.length,
                    canisterInfo.controllers.length
                ];
                const expected = [3n, 3, 0, 1];
                return testEquality(actual, expected);
            }
        },
        {
            name: 'executeDeleteCanister',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                await managementCanister.executeStopCanister(canisterId);

                await managementCanister.executeDeleteCanister(canisterId);

                return succeed();
            }
        },
        {
            name: 'getRawRand',
            test: async () => {
                const result = await managementCanister.getRawRand();

                return testEquality(result.length, 32);
            }
        }
    ];
}
