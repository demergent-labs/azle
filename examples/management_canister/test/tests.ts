import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';

import { _SERVICE } from './dfx_generated/management_canister/management_canister.did';

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

                return {
                    Ok: canisterStatus.module_hash.length === 0
                };
            }
        },
        {
            name: 'executeUploadChunk ',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const wasmModule = Array.from(readFileSync('src/test.wasm'));

                const chunkUploadResult =
                    await managementCanister.executeUploadChunk(
                        canisterId,
                        wasmModule as any
                    );

                return {
                    Ok: chunkUploadResult.hash.length === 32
                };
            }
        },
        {
            name: 'getStoredChunks',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const storedChunks =
                    await managementCanister.getStoredChunks(canisterId);

                const wasmModule = Uint8Array.from(
                    readFileSync('src/test.wasm')
                );
                const wasmHash = createHash('sha256')
                    .update(wasmModule)
                    .digest();

                return {
                    Ok:
                        storedChunks.length === 1 &&
                        Uint8Array.from(wasmHash).toString() ===
                            storedChunks[0].hash.toString()
                };
            }
        },
        {
            name: 'executeInstallChunkedCode',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const storedChunks =
                    await managementCanister.getStoredChunks(canisterId);

                const result =
                    await managementCanister.executeInstallChunkedCode(
                        canisterId,
                        storedChunks,
                        storedChunks[0].hash
                    );

                await managementCanister.executeUninstallCode(canisterId);

                return {
                    Ok: result
                };
            }
        },
        {
            name: 'executeClearChunkStore',
            test: async () => {
                const canisterId =
                    await managementCanister.getCreatedCanisterId();

                const result =
                    await managementCanister.executeClearChunkStore(canisterId);

                const storedChunks =
                    await managementCanister.getStoredChunks(canisterId);

                return {
                    Ok: result && storedChunks.length === 0
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
                        canisterStatus.memory_size === 550n &&
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
                        canisterInfo.total_num_changes === 5n &&
                        canisterInfo.recent_changes.length === 5 &&
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

                await managementCanister.executeStopCanister(canisterId);

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
