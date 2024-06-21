// TODO once the Bitcoin integration is live, add the methods and tests
import { call, IDL, query, update } from 'azle';
import {
    CanisterInfoArgs,
    CanisterInfoResult,
    CanisterStatusArgs,
    CanisterStatusResult,
    ChunkHash,
    CreateCanisterResult,
    managementCanister,
    ProvisionalCreateCanisterWithCyclesResult,
    StoredChunksResult
} from 'azle/canisters/management';

type State = {
    createdCanisterId: Principal;
};

let state: State = {
    createdCanisterId: Principal.fromText('aaaaa-aa')
};

export default class {
    @update([], CreateCanisterResult)
    async executeCreateCanister() {
        const createCanisterResult = await createCanister();

        state.createdCanisterId = createCanisterResult.canister_id;

        return createCanisterResult;
    }
    @update([Principal], bool)
    async executeUpdateSettings(canisterId) {
        await call(managementCanister.update_settings, {
            args: [
                {
                    canister_id: canisterId,
                    settings: {
                        controllers: None,
                        compute_allocation: Some(1n),
                        memory_allocation: Some(3_000_000n),
                        freezing_threshold: Some(2_000_000n),
                        reserved_cycles_limit: None
                    },
                    sender_canister_version: None
                }
            ]
        });

        return true;
    }
    @update([Principal, IDL.Vec(IDL.Nat8)], ChunkHash)
    async executeUploadChunk(canisterId, chunk) {
        return await call(managementCanister.upload_chunk, {
            args: [
                {
                    canister_id: canisterId,
                    chunk
                }
            ]
        });
    }
    @update([Principal], bool)
    async executeClearChunkStore(canisterId) {
        await call(managementCanister.clear_chunk_store, {
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    }
    @update([Principal], StoredChunksResult)
    async getStoredChunks(canisterId) {
        return await call(managementCanister.stored_chunks, {
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });
    }
    @update([Principal, IDL.Vec(IDL.Nat8)], bool)
    async executeInstallCode(canisterId, wasmModule) {
        await call(managementCanister.install_code, {
            args: [
                {
                    mode: {
                        install: null
                    },
                    canister_id: canisterId,
                    wasm_module: wasmModule,
                    arg: Uint8Array.from([]),
                    sender_canister_version: None
                }
            ],
            cycles: 100_000_000_000n
        });

        return true;
    }
    @update([Principal, Vec(ChunkHash), IDL.Vec(IDL.Nat8)], bool)
    async executeInstallChunkedCode(canisterId, chunkHashes, wasmModuleHash) {
        await call(managementCanister.install_chunked_code, {
            args: [
                {
                    mode: {
                        install: null
                    },
                    target_canister: canisterId,
                    store_canister: None,
                    chunk_hashes_list: chunkHashes,
                    wasm_module_hash: wasmModuleHash,
                    arg: Uint8Array.from([]),
                    sender_canister_version: None
                }
            ],
            cycles: 100_000_000_000n
        });

        return true;
    }
    @update([Principal], bool)
    async executeUninstallCode(canisterId) {
        await call(managementCanister.uninstall_code, {
            args: [
                {
                    canister_id: canisterId,
                    sender_canister_version: None
                }
            ]
        });

        return true;
    }
    @update([Principal], bool)
    async executeStartCanister(canisterId) {
        await call(managementCanister.start_canister, {
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });
        return true;
    }
    @update([Principal], bool)
    async executeStopCanister(canisterId) {
        await call(managementCanister.stop_canister, {
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    }
    @update([CanisterInfoArgs], CanisterInfoResult)
    async getCanisterInfo(args) {
        return await call(managementCanister.canister_info, {
            args: [args]
        });
    }
    @update([CanisterStatusArgs], CanisterStatusResult)
    async getCanisterStatus(args) {
        return await call(managementCanister.canister_status, {
            args: [args]
        });
    }
    @update([Principal], bool)
    async executeDeleteCanister(canisterId) {
        await call(managementCanister.delete_canister, {
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    }
    @update([Principal], bool)
    async executeDepositCycles(canisterId) {
        await call(managementCanister.deposit_cycles, {
            args: [
                {
                    canister_id: canisterId
                }
            ],
            cycles: 10_000_000n
        });

        return true;
    }
    @update([], IDL.Vec(IDL.Nat8))
    async getRawRand() {
        return await call(managementCanister.raw_rand);
    }
    // TODO we should test this like we test depositCycles
    @update([], ProvisionalCreateCanisterWithCyclesResult)
    async provisionalCreateCanisterWithCycles() {
        return await call(
            managementCanister.provisional_create_canister_with_cycles,
            {
                args: [
                    {
                        amount: None,
                        settings: None,
                        sender_canister_version: None,
                        specified_id: None
                    }
                ]
            }
        );
    }
    // TODO we should test this like we test depositCycles
    @update([Principal, nat], bool)
    async provisionalTopUpCanister(canisterId, amount) {
        await call(managementCanister.provisional_top_up_canister, {
            args: [
                {
                    canister_id: canisterId,
                    amount
                }
            ]
        });

        return true;
    }
    @query([], Principal)
    getCreatedCanisterId() {
        return state.createdCanisterId;
    }
}

async function createCanister() {
    return await call(managementCanister.create_canister, {
        args: [{ settings: None, sender_canister_version: None }],
        cycles: 50_000_000_000_000n
    });
}
