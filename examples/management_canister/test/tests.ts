import { ActorSubclass } from '@dfinity/agent';
import { ok, Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/management_canister/management_canister.did';
import { readFileSync } from 'fs';

export function getTests(managementCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'executeCreateCanister',
            test: async () => {
                const result = await managementCanister.executeCreateCanister();

                if (!ok(result)) {
                    return {
                        Err: result.Err
                    };
                }

                return {
                    Ok:
                        result.Ok.canister_id !== undefined &&
                        result.Ok.canister_id !== null
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

                if (!ok(executeUpdateSettingsResult)) {
                    return {
                        Err: executeUpdateSettingsResult.Err
                    };
                }

                const getCanisterStatusResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                if (!ok(getCanisterStatusResult)) {
                    return {
                        Err: getCanisterStatusResult.Err
                    };
                }

                const canisterSettings = getCanisterStatusResult.Ok.settings;

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

                if (!ok(result)) {
                    return {
                        Err: result.Err
                    };
                }

                return {
                    Ok: true
                };
            }
        },
        {
            name: 'executeDepositCycles',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const statusBeforeResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                if (!ok(statusBeforeResult)) {
                    return {
                        Err: statusBeforeResult.Err
                    };
                }

                const statusBefore = statusBeforeResult.Ok;
                const cyclesBefore = statusBefore.cycles;

                const depositCyclesResult =
                    await managementCanister.executeDepositCycles(canisterId);

                if (!ok(depositCyclesResult)) {
                    return {
                        Err: depositCyclesResult.Err
                    };
                }

                const statusAfterResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                if (!ok(statusAfterResult)) {
                    return {
                        Err: statusAfterResult.Err
                    };
                }

                const statusAfter = statusAfterResult.Ok;
                const cyclesAfter = statusAfter.cycles;

                return {
                    Ok: cyclesAfter >= cyclesBefore + 1_000_000n
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

                if (!ok(executeUninstallCodeResult)) {
                    return {
                        Err: executeUninstallCodeResult.Err
                    };
                }

                const getCanisterStatusResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                if (!ok(getCanisterStatusResult)) {
                    return {
                        Err: getCanisterStatusResult.Err
                    };
                }

                const canisterStatus = getCanisterStatusResult.Ok;

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

                if (!ok(executeStopCanisterResult)) {
                    return {
                        Err: executeStopCanisterResult.Err
                    };
                }

                const getCanisterStatusResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                if (!ok(getCanisterStatusResult)) {
                    return {
                        Err: getCanisterStatusResult.Err
                    };
                }

                const canisterStatus = getCanisterStatusResult.Ok;

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

                if (!ok(getCanisterStatusBeforeResult)) {
                    return {
                        Err: getCanisterStatusBeforeResult.Err
                    };
                }

                const canisterStatusBefore = getCanisterStatusBeforeResult.Ok;

                if ('stopped' in canisterStatusBefore.status === false) {
                    return {
                        Ok: false
                    };
                }

                const executeStartCanisterResult =
                    await managementCanister.executeStartCanister(canisterId);

                if (!ok(executeStartCanisterResult)) {
                    return {
                        Err: executeStartCanisterResult.Err
                    };
                }

                const getCanisterStatusAfterResult =
                    await managementCanister.getCanisterStatus({
                        canister_id: canisterId
                    });

                if (!ok(getCanisterStatusAfterResult)) {
                    return {
                        Err: getCanisterStatusAfterResult.Err
                    };
                }

                const canisterStatusAfter = getCanisterStatusAfterResult.Ok;

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

                if (!ok(getCanisterStatusResult)) {
                    return {
                        Err: getCanisterStatusResult.Err
                    };
                }

                const canisterStatus = getCanisterStatusResult.Ok;

                return {
                    Ok:
                        'running' in canisterStatus.status &&
                        canisterStatus.memory_size === 0n &&
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
            name: 'executeDeleteCanister',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const executeStopCanisterResult =
                    await managementCanister.executeStopCanister(canisterId);

                if (!ok(executeStopCanisterResult)) {
                    return {
                        Err: executeStopCanisterResult.Err
                    };
                }

                const executeDeleteCanisterResult =
                    await managementCanister.executeDeleteCanister(canisterId);

                if (!ok(executeDeleteCanisterResult)) {
                    return {
                        Err: executeDeleteCanisterResult.Err
                    };
                }

                return {
                    Ok: true
                };
            }
        },
        {
            name: 'getRawRand',
            test: async () => {
                const result = await managementCanister.getRawRand();

                if (!ok(result)) {
                    return {
                        Err: result.Err
                    };
                }

                return {
                    Ok: result.Ok.length === 32
                };
            }
        }
    ];
}
