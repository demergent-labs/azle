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

let state: State = {
    createdCanisterId: Principal.fromText('aaaaa-aa')
};

export default class {
    @update([], CreateCanisterResult)
    async executeCreateCanister(): Promise<CreateCanisterResult> {
        const createCanisterResult = await createCanister();

        state.createdCanisterId = createCanisterResult.canister_id;

        return createCanisterResult;
    }

    @update([IDL.Principal], IDL.Bool)
    async executeUpdateSettings(canisterId: Principal): Promise<boolean> {
        await call('aaaaa-aa', 'update_settings', {
            paramIdls: [UpdateSettingsArgs],
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
            paramIdls: [UploadChunkArgs],
            returnIdl: ChunkHash,
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
            paramIdls: [ClearChunkStoreArgs],
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
            paramIdls: [StoredChunksArgs],
            returnIdl: StoredChunksResult,
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
            paramIdls: [InstallCodeArgs],
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
            paramIdls: [InstallChunkedCodeArgs],
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
            paramIdls: [UninstallCodeArgs],
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
            paramIdls: [StartCanisterArgs],
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
            paramIdls: [StopCanisterArgs],
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
            paramIdls: [CanisterInfoArgs],
            returnIdl: CanisterInfoResult,
            args: [args]
        });
    }

    @update([CanisterStatusArgs], CanisterStatusResult)
    async getCanisterStatus(
        args: CanisterStatusArgs
    ): Promise<CanisterStatusResult> {
        return await call('aaaaa-aa', 'canister_status', {
            paramIdls: [CanisterStatusArgs],
            returnIdl: CanisterStatusResult,
            args: [args]
        });
    }

    @update([IDL.Principal], IDL.Bool)
    async executeDeleteCanister(canisterId: Principal): Promise<boolean> {
        await call('aaaaa-aa', 'delete_canister', {
            paramIdls: [DeleteCanisterArgs],
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
            paramIdls: [DepositCyclesArgs],
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
            returnIdl: IDL.Vec(IDL.Nat8)
        });
    }
    // TODO we should test this like we test depositCycles
    @update([], ProvisionalCreateCanisterWithCyclesResult)
    async provisionalCreateCanisterWithCycles(): Promise<ProvisionalCreateCanisterWithCyclesResult> {
        return await call(
            'aaaaa-aa',
            'provisional_create_canister_with_cycles',
            {
                paramIdls: [ProvisionalCreateCanisterWithCyclesArgs],
                returnIdl: ProvisionalCreateCanisterWithCyclesResult,
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
            paramIdls: [ProvisionalTopUpCanisterArgs],
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
        return state.createdCanisterId;
    }
}

async function createCanister(): Promise<CreateCanisterResult> {
    return await call('aaaaa-aa', 'create_canister', {
        paramIdls: [CreateCanisterArgs],
        returnIdl: CreateCanisterResult,
        args: [{ settings: [], sender_canister_version: [] }],
        payment: 50_000_000_000_000n
    });
}
