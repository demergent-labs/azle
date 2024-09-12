// TODO once the Bitcoin integration is live, add the methods and tests
import { call, IDL, Principal, query, update } from 'azle';
import {
    CanisterInfoArgs,
    CanisterInfoResult,
    CanisterStatusArgs,
    CanisterStatusResult,
    ChunkHash,
    ClearChunkStoreArgs,
    CreateCanisterArgs,
    CreateCanisterResult,
    DeleteCanisterArgs,
    DepositCyclesArgs,
    InstallChunkedCodeArgs,
    InstallCodeArgs,
    ProvisionalCreateCanisterWithCyclesArgs,
    ProvisionalCreateCanisterWithCyclesResult,
    ProvisionalTopUpCanisterArgs,
    StartCanisterArgs,
    StopCanisterArgs,
    StoredChunksArgs,
    StoredChunksResult,
    UninstallCodeArgs,
    UpdateSettingsArgs,
    UploadChunkArgs
} from 'azle/canisters/management';

type State = {
    createdCanisterId: Principal;
};

export default class {
    state: State = {
        createdCanisterId: Principal.fromText('aaaaa-aa')
    };

    @update([], CreateCanisterResult)
    async executeCreateCanister(): Promise<CreateCanisterResult> {
        const createCanisterResult = await createCanister();

        this.state.createdCanisterId = createCanisterResult.canister_id;

        return createCanisterResult;
    }

    @update([IDL.Principal], IDL.Bool)
    async executeUpdateSettings(canisterId: Principal): Promise<boolean> {
        await call('aaaaa-aa', 'update_settings', {
            paramIdlTypes: [UpdateSettingsArgs],
            args: [
                {
                    canister_id: canisterId,
                    settings: {
                        controllers: [],
                        compute_allocation: [1n],
                        memory_allocation: [3_000_000n],
                        freezing_threshold: [2_000_000n],
                        reserved_cycles_limit: []
                    },
                    sender_canister_version: []
                }
            ]
        });

        return true;
    }

    @update([IDL.Principal, IDL.Vec(IDL.Nat8)], ChunkHash)
    async executeUploadChunk(
        canisterId: Principal,
        chunk: Uint8Array
    ): Promise<ChunkHash> {
        return await call('aaaaa-aa', 'upload_chunk', {
            paramIdlTypes: [UploadChunkArgs],
            returnIdlType: ChunkHash,
            args: [
                {
                    canister_id: canisterId,
                    chunk
                }
            ]
        });
    }

    @update([IDL.Principal], IDL.Bool)
    async executeClearChunkStore(canisterId: Principal): Promise<boolean> {
        await call('aaaaa-aa', 'clear_chunk_store', {
            paramIdlTypes: [ClearChunkStoreArgs],
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    }

    @update([IDL.Principal], StoredChunksResult)
    async getStoredChunks(canisterId: Principal): Promise<StoredChunksResult> {
        return await call('aaaaa-aa', 'stored_chunks', {
            paramIdlTypes: [StoredChunksArgs],
            returnIdlType: StoredChunksResult,
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });
    }

    @update([IDL.Principal, IDL.Vec(IDL.Nat8)], IDL.Bool)
    async executeInstallCode(
        canisterId: Principal,
        wasmModule: Uint8Array
    ): Promise<boolean> {
        await call('aaaaa-aa', 'install_code', {
            paramIdlTypes: [InstallCodeArgs],
            args: [
                {
                    mode: {
                        install: null
                    },
                    canister_id: canisterId,
                    wasm_module: wasmModule,
                    arg: Uint8Array.from([]),
                    sender_canister_version: []
                }
            ],
            payment: 100_000_000_000n
        });

        return true;
    }

    @update([IDL.Principal, IDL.Vec(ChunkHash), IDL.Vec(IDL.Nat8)], IDL.Bool)
    async executeInstallChunkedCode(
        canisterId: Principal,
        chunkHashes: ChunkHash[],
        wasmModuleHash: Uint8Array
    ): Promise<boolean> {
        await call('aaaaa-aa', 'install_chunked_code', {
            paramIdlTypes: [InstallChunkedCodeArgs],
            args: [
                {
                    mode: {
                        install: null
                    },
                    target_canister: canisterId,
                    store_canister: [],
                    chunk_hashes_list: chunkHashes,
                    wasm_module_hash: wasmModuleHash,
                    arg: Uint8Array.from([]),
                    sender_canister_version: []
                }
            ],
            payment: 100_000_000_000n
        });

        return true;
    }

    @update([IDL.Principal], IDL.Bool)
    async executeUninstallCode(canisterId: Principal): Promise<boolean> {
        await call('aaaaa-aa', 'uninstall_code', {
            paramIdlTypes: [UninstallCodeArgs],
            args: [
                {
                    canister_id: canisterId,
                    sender_canister_version: []
                }
            ]
        });

        return true;
    }

    @update([IDL.Principal], IDL.Bool)
    async executeStartCanister(canisterId: Principal): Promise<boolean> {
        await call('aaaaa-aa', 'start_canister', {
            paramIdlTypes: [StartCanisterArgs],
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });
        return true;
    }

    @update([IDL.Principal], IDL.Bool)
    async executeStopCanister(canisterId: Principal): Promise<boolean> {
        await call('aaaaa-aa', 'stop_canister', {
            paramIdlTypes: [StopCanisterArgs],
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    }

    @update([CanisterInfoArgs], CanisterInfoResult)
    async getCanisterInfo(args: CanisterInfoArgs): Promise<CanisterInfoResult> {
        return await call('aaaaa-aa', 'canister_info', {
            paramIdlTypes: [CanisterInfoArgs],
            returnIdlType: CanisterInfoResult,
            args: [args]
        });
    }

    @update([CanisterStatusArgs], CanisterStatusResult)
    async getCanisterStatus(
        args: CanisterStatusArgs
    ): Promise<CanisterStatusResult> {
        return await call('aaaaa-aa', 'canister_status', {
            paramIdlTypes: [CanisterStatusArgs],
            returnIdlType: CanisterStatusResult,
            args: [args]
        });
    }

    @update([IDL.Principal], IDL.Bool)
    async executeDeleteCanister(canisterId: Principal): Promise<boolean> {
        await call('aaaaa-aa', 'delete_canister', {
            paramIdlTypes: [DeleteCanisterArgs],
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    }

    @update([IDL.Principal], IDL.Bool)
    async executeDepositCycles(canisterId: Principal): Promise<boolean> {
        await call('aaaaa-aa', 'deposit_cycles', {
            paramIdlTypes: [DepositCyclesArgs],
            args: [
                {
                    canister_id: canisterId
                }
            ],
            payment: 10_000_000n
        });

        return true;
    }

    @update([], IDL.Vec(IDL.Nat8))
    async getRawRand(): Promise<Uint8Array> {
        return await call('aaaaa-aa', 'raw_rand', {
            returnIdlType: IDL.Vec(IDL.Nat8)
        });
    }
    // TODO we should test this like we test depositCycles
    @update([], ProvisionalCreateCanisterWithCyclesResult)
    async provisionalCreateCanisterWithCycles(): Promise<ProvisionalCreateCanisterWithCyclesResult> {
        return await call(
            'aaaaa-aa',
            'provisional_create_canister_with_cycles',
            {
                paramIdlTypes: [ProvisionalCreateCanisterWithCyclesArgs],
                returnIdlType: ProvisionalCreateCanisterWithCyclesResult,
                args: [
                    {
                        amount: [],
                        settings: [],
                        sender_canister_version: [],
                        specified_id: []
                    }
                ]
            }
        );
    }
    // TODO we should test this like we test depositCycles
    @update([IDL.Principal, IDL.Nat], IDL.Bool)
    async provisionalTopUpCanister(
        canisterId: Principal,
        amount: bigint
    ): Promise<boolean> {
        await call('aaaaa-aa', 'provisional_top_up_canister', {
            paramIdlTypes: [ProvisionalTopUpCanisterArgs],
            args: [
                {
                    canister_id: canisterId,
                    amount
                }
            ]
        });

        return true;
    }

    @query([], IDL.Principal)
    getCreatedCanisterId(): Principal {
        return this.state.createdCanisterId;
    }
}

async function createCanister(): Promise<CreateCanisterResult> {
    return await call('aaaaa-aa', 'create_canister', {
        paramIdlTypes: [CreateCanisterArgs],
        returnIdlType: CreateCanisterResult,
        args: [{ settings: [], sender_canister_version: [] }],
        payment: 50_000_000_000_000n
    });
}
