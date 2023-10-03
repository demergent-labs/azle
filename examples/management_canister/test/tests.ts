import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/management_canister/management_canister.did';
import { readFileSync } from 'fs';

export function getTests(managementCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'executeCreateCanister',
            test: async () => {
                const result = await managementCanister.executeCreateCanister();

                return {
                    Ok:
                        result.canister_id !== undefined &&
                        result.canister_id !== null
                };
            }
        },
        {
            name: 'executeUpdateSettings',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const executeUpdateSettingsResult =
                    await managementCanister.executeUpdateSettings(canisterId);

                const getCanisterStatusResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                const canisterSettings = getCanisterStatusResult.settings;

                return {
                    Ok:
                        canisterSettings.compute_allocation === 1n &&
                        canisterSettings.memory_allocation === 3_000_000n &&
                        canisterSettings.freezing_threshold === 2_000_000n
                };
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

                return {
                    Ok: result
                };
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

                const depositCyclesResult =
                    await managementCanister.executeDepositCycles(canisterId);

                const statusAfter = await managementCanister.getCanisterStatus({
                    canister_id: canisterId
                });

                const cyclesAfter = statusAfter.cycles;

                return {
                    Ok: cyclesAfter > cyclesBefore
                };
            }
        },
        {
            name: 'executeUninstallCode',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const executeUninstallCodeResult =
                    await managementCanister.executeUninstallCode(canisterId);

                const getCanisterStatusResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                const canisterStatus = getCanisterStatusResult;

                return {
                    Ok: canisterStatus.module_hash.length === 0
                };
            }
        },
        {
            name: 'executeStopCanister',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const executeStopCanisterResult =
                    await managementCanister.executeStopCanister(canisterId);

                const getCanisterStatusResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                const canisterStatus = getCanisterStatusResult;

                return {
                    Ok: 'stopped' in canisterStatus.status
                };
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
                    return {
                        Ok: false
                    };
                }

                const executeStartCanisterResult =
                    await managementCanister.executeStartCanister(canisterId);

                const getCanisterStatusAfterResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                const canisterStatusAfter = getCanisterStatusAfterResult;

                return {
                    Ok: 'running' in canisterStatusAfter.status
                };
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

                return {
                    Ok:
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
                };
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

                return {
                    Ok:
                        canisterInfo.total_num_changes === 3n &&
                        canisterInfo.recent_changes.length === 3 &&
                        canisterInfo.module_hash.length === 0 &&
                        canisterInfo.controllers.length === 1
                };
            }
        },
        {
            name: 'executeDeleteCanister',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const executeStopCanisterResult =
                    await managementCanister.executeStopCanister(canisterId);

                const executeDeleteCanisterResult =
                    await managementCanister.executeDeleteCanister(canisterId);

                return {
                    Ok: true
                };
            }
        },
        {
            name: 'getRawRand',
            test: async () => {
                const result = await managementCanister.getRawRand();

                return {
                    Ok: result.length === 32
                };
            }
        }
    ];
}
