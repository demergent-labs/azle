import { ActorSubclass } from '@dfinity/agent';
import { expect, it } from 'azle/test/jest';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';

import { _SERVICE } from './dfx_generated/management_canister/management_canister.did';

export function getTests(managementCanister: ActorSubclass<_SERVICE>) {
    return () => {
        it('executes create_canister from the management canister', async () => {
            const result = await managementCanister.executeCreateCanister();

            expect(result.canister_id).not.toBeUndefined();
            expect(result.canister_id).not.toBeNull();
        });

        it('executes update_settings from the management canister', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            await managementCanister.executeUpdateSettings(canisterId);

            const getCanisterStatusResult =
                await managementCanister.getCanisterStatus({
                    canister_id: canisterId
                });

            const canisterSettings = getCanisterStatusResult.settings;

            expect(canisterSettings.compute_allocation).toBe(1n);
            expect(canisterSettings.memory_allocation).toBe(3_000_000n);
            expect(canisterSettings.freezing_threshold).toBe(2_000_000n);
        });

        it('executes install_code from the management canister', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            // this Wasm module is for a simple canister written in Motoko that has one query method called hello that returns a string
            const wasmModule = Array.from(readFileSync('src/test.wasm'));

            const result = await managementCanister.executeInstallCode(
                canisterId,
                wasmModule
            );

            expect(result).toBe(true);
        });

        it('uninstalls the code before chunk uploading', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            await managementCanister.executeUninstallCode(canisterId);

            const getCanisterStatusResult =
                await managementCanister.getCanisterStatus({
                    canister_id: canisterId
                });

            const canisterStatus = getCanisterStatusResult;

            expect(canisterStatus.module_hash).toHaveLength(0);
        });

        it('uploads the new canister in chunks', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            const wasmModule = Array.from(readFileSync('src/test.wasm'));

            const chunkUploadResult =
                await managementCanister.executeUploadChunk(
                    canisterId,
                    wasmModule
                );

            expect(chunkUploadResult.hash).toHaveLength(32);
        });

        it('gets stored chunks', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            const storedChunks =
                await managementCanister.getStoredChunks(canisterId);

            const wasmModule = Uint8Array.from(readFileSync('src/test.wasm'));
            const wasmHash = createHash('sha256').update(wasmModule).digest();

            expect(storedChunks).toHaveLength(1);
            expect(storedChunks[0].hash).toStrictEqual(
                Uint8Array.from(wasmHash)
            );
        });

        it('installs the chunked code', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            const storedChunks =
                await managementCanister.getStoredChunks(canisterId);

            const result = await managementCanister.executeInstallChunkedCode(
                canisterId,
                storedChunks,
                storedChunks[0].hash
            );

            await managementCanister.executeUninstallCode(canisterId);

            expect(result).toBe(true);
        });

        it('clears chunk store', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            const result =
                await managementCanister.executeClearChunkStore(canisterId);

            const storedChunks =
                await managementCanister.getStoredChunks(canisterId);

            expect(result).toBe(true);
            expect(storedChunks).toHaveLength(0);
        });

        it('executes deposit_cycles from the management canister', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            const statusBefore = await managementCanister.getCanisterStatus({
                canister_id: canisterId
            });

            const cyclesBefore = statusBefore.cycles;

            await managementCanister.executeDepositCycles(canisterId);

            const statusAfter = await managementCanister.getCanisterStatus({
                canister_id: canisterId
            });

            const cyclesAfter = statusAfter.cycles;

            expect(cyclesAfter).toBeGreaterThan(cyclesBefore);
        });

        it('executes uninstall_code from the management canister', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            await managementCanister.executeUninstallCode(canisterId);

            const getCanisterStatusResult =
                await managementCanister.getCanisterStatus({
                    canister_id: canisterId
                });

            const canisterStatus = getCanisterStatusResult;

            expect(canisterStatus.module_hash).toHaveLength(0);
        });

        it('executes stop_canister from the management canister', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            await managementCanister.executeStopCanister(canisterId);

            const getCanisterStatusResult =
                await managementCanister.getCanisterStatus({
                    canister_id: canisterId
                });

            const canisterStatus = getCanisterStatusResult;

            expect(canisterStatus.status).toStrictEqual({ stopped: null });
        });

        it('executes start_canister from the management canister', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            const canisterStatusBefore =
                await managementCanister.getCanisterStatus({
                    canister_id: canisterId
                });

            expect(canisterStatusBefore.status).toStrictEqual({
                stopped: null
            });

            await managementCanister.executeStartCanister(canisterId);

            const canisterStatusAfter =
                await managementCanister.getCanisterStatus({
                    canister_id: canisterId
                });

            expect(canisterStatusAfter.status).toStrictEqual({ running: null });
        });
        it('gets canister_status from the management canister', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            const getCanisterStatusResult =
                await managementCanister.getCanisterStatus({
                    canister_id: canisterId
                });

            const canisterStatus = getCanisterStatusResult;

            expect(canisterStatus.status).toStrictEqual({
                running: null
            });
            expect(canisterStatus.memory_size).toBe(654n);
            expect(canisterStatus.cycles).toBeGreaterThanOrEqual(
                800_000_000_000n
            );
            expect(canisterStatus.settings.freezing_threshold).toBe(2_000_000n);
            expect(canisterStatus.settings.controllers).toHaveLength(1);
            expect(canisterStatus.settings.memory_allocation).toBe(3_000_000n);
            expect(canisterStatus.settings.compute_allocation).toBe(1n);
            expect(canisterStatus.module_hash).toHaveLength(0);
        });
        it('gets canister_info from the management canister', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            const canisterInfo = await managementCanister.getCanisterInfo({
                canister_id: canisterId,
                num_requested_changes: [50n]
            });

            expect(canisterInfo.total_num_changes).toBe(6n);
            expect(canisterInfo.recent_changes).toHaveLength(6);
            expect(canisterInfo.module_hash).toHaveLength(0);
            expect(canisterInfo.controllers).toHaveLength(1);
        });
        it('executes delete_canister from the management canister', async () => {
            const canisterId = await managementCanister.getCreatedCanisterId();

            await managementCanister.executeStopCanister(canisterId);

            expect(
                await managementCanister.executeDeleteCanister(canisterId)
            ).toBe(true);
        });
        it('gets raw_rand from the management canister', async () => {
            const result = await managementCanister.getRawRand();

            expect(result).toHaveLength(32);
        });
    };
}
