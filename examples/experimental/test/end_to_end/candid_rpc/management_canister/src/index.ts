import { call } from 'azle';
import {
    canister_info_args,
    canister_info_result,
    canister_status_args,
    canister_status_result,
    chunk_hash,
    clear_chunk_store_args,
    create_canister_args,
    create_canister_result,
    delete_canister_args,
    deposit_cycles_args,
    install_chunked_code_args,
    install_code_args,
    provisional_create_canister_with_cycles_args,
    provisional_create_canister_with_cycles_result,
    provisional_top_up_canister_args,
    raw_rand_result,
    start_canister_args,
    stop_canister_args,
    stored_chunks_args,
    stored_chunks_result,
    uninstall_code_args,
    update_settings_args,
    upload_chunk_args
} from 'azle/canisters/management';
import {
    blob,
    bool,
    Canister,
    nat,
    Principal,
    query,
    serialize,
    update,
    Vec,
    Void
} from 'azle/experimental';
import {
    CanisterInfoArgs,
    CanisterInfoResult,
    CanisterStatusArgs,
    CanisterStatusResult,
    ChunkHash,
    CreateCanisterResult,
    ProvisionalCreateCanisterWithCyclesResult,
    StoredChunksResult
} from 'azle/experimental/canisters/management';

type State = {
    createdCanisterId: Principal;
};

let state: State = {
    createdCanisterId: Principal.fromText('aaaaa-aa')
};

export default Canister({
    executeCreateCanister: update([], CreateCanisterResult, async () => {
        const createCanisterResult = await createCanister();

        state.createdCanisterId = createCanisterResult.canister_id;

        return createCanisterResult;
    }),
    executeUpdateSettings: update([Principal], bool, async (canisterId) => {
        const arg: update_settings_args = {
            canister_id: canisterId,
            settings: {
                controllers: [],
                compute_allocation: [1n],
                log_visibility: [],
                memory_allocation: [3_000_000n],
                freezing_threshold: [2_000_000n],
                reserved_cycles_limit: [],
                wasm_memory_limit: []
            },
            sender_canister_version: []
        };

        if (process.env.AZLE_TEST_FETCH === 'true' || false) {
            await fetch(`icp://aaaaa-aa/update_settings`, {
                body: serialize({
                    args: [arg]
                })
            });
        } else {
            await call<[update_settings_args], Void>(
                'aaaaa-aa',
                'update_settings',
                {
                    paramIdlTypes: [update_settings_args],
                    args: [arg]
                }
            );
        }

        return true;
    }),
    executeUploadChunk: update(
        [Principal, blob],
        ChunkHash,
        async (canisterId, chunk) => {
            const arg: upload_chunk_args = {
                canister_id: canisterId,
                chunk
            };

            if (process.env.AZLE_TEST_FETCH === 'true' || false) {
                const response = await fetch(`icp://aaaaa-aa/upload_chunk`, {
                    body: serialize({
                        args: [arg]
                    })
                });

                return await response.json();
            } else {
                return await call<[upload_chunk_args], chunk_hash>(
                    'aaaaa-aa',
                    'upload_chunk',
                    {
                        paramIdlTypes: [upload_chunk_args],
                        returnIdlType: chunk_hash,
                        args: [arg]
                    }
                );
            }
        }
    ),
    executeClearChunkStore: update([Principal], bool, async (canisterId) => {
        const arg: clear_chunk_store_args = {
            canister_id: canisterId
        };

        if (process.env.AZLE_TEST_FETCH === 'true' || false) {
            await fetch(`icp://aaaaa-aa/clear_chunk_store`, {
                body: serialize({
                    args: [arg]
                })
            });
        } else {
            await call<[clear_chunk_store_args], Void>(
                'aaaaa-aa',
                'clear_chunk_store',
                {
                    paramIdlTypes: [clear_chunk_store_args],
                    args: [arg]
                }
            );
        }

        return true;
    }),
    getStoredChunks: update(
        [Principal],
        StoredChunksResult,
        async (canisterId) => {
            const arg: stored_chunks_args = {
                canister_id: canisterId
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(`icp://aaaaa-aa/stored_chunks`, {
                    body: serialize({
                        args: [arg]
                    })
                });
                return await response.json();
            } else {
                return await call<[stored_chunks_args], stored_chunks_result>(
                    'aaaaa-aa',
                    'stored_chunks',
                    {
                        paramIdlTypes: [stored_chunks_args],
                        returnIdlType: stored_chunks_result,
                        args: [arg]
                    }
                );
            }
        }
    ),
    executeInstallCode: update(
        [Principal, blob],
        bool,
        async (canisterId, wasmModule) => {
            const arg: install_code_args = {
                mode: {
                    install: null
                },
                canister_id: canisterId,
                wasm_module: wasmModule,
                arg: Uint8Array.from([]),
                sender_canister_version: []
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://aaaaa-aa/install_code`, {
                    body: serialize({
                        args: [arg],
                        cycles: 100_000_000_000n
                    })
                });
            } else {
                await call<[install_code_args], Void>(
                    'aaaaa-aa',
                    'install_code',
                    {
                        paramIdlTypes: [install_code_args],
                        args: [arg],
                        cycles: 100_000_000_000n
                    }
                );
            }

            return true;
        }
    ),
    executeInstallChunkedCode: update(
        [Principal, Vec(ChunkHash), blob],
        bool,
        async (canisterId, chunkHashes, wasmModuleHash) => {
            const arg: install_chunked_code_args = {
                mode: {
                    install: null
                },
                target_canister: canisterId,
                store_canister: [],
                chunk_hashes_list: chunkHashes,
                wasm_module_hash: wasmModuleHash,
                arg: Uint8Array.from([]),
                sender_canister_version: []
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://aaaaa-aa/install_chunked_code`, {
                    body: serialize({
                        args: [arg],
                        cycles: 100_000_000_000n
                    })
                });
            } else {
                await call<[install_chunked_code_args], Void>(
                    'aaaaa-aa',
                    'install_chunked_code',
                    {
                        paramIdlTypes: [install_chunked_code_args],
                        args: [arg],
                        cycles: 100_000_000_000n
                    }
                );
            }

            return true;
        }
    ),
    executeUninstallCode: update([Principal], bool, async (canisterId) => {
        const arg: uninstall_code_args = {
            canister_id: canisterId,
            sender_canister_version: []
        };

        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/uninstall_code`, {
                body: serialize({
                    args: [arg]
                })
            });
        } else {
            await call<[uninstall_code_args], Void>(
                'aaaaa-aa',
                'uninstall_code',
                {
                    paramIdlTypes: [uninstall_code_args],
                    args: [arg]
                }
            );
        }

        return true;
    }),
    executeStartCanister: update([Principal], bool, async (canisterId) => {
        const arg: start_canister_args = {
            canister_id: canisterId
        };

        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/start_canister`, {
                body: serialize({
                    args: [arg]
                })
            });
        } else {
            await call<[start_canister_args], Void>(
                'aaaaa-aa',
                'start_canister',
                {
                    paramIdlTypes: [start_canister_args],
                    args: [arg]
                }
            );
        }
        return true;
    }),
    executeStopCanister: update([Principal], bool, async (canisterId) => {
        const arg: stop_canister_args = {
            canister_id: canisterId
        };

        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/stop_canister`, {
                body: serialize({
                    args: [arg]
                })
            });
        } else {
            await call<[stop_canister_args], Void>(
                'aaaaa-aa',
                'stop_canister',
                {
                    paramIdlTypes: [stop_canister_args],
                    args: [arg]
                }
            );
        }

        return true;
    }),
    getCanisterInfo: update(
        [CanisterInfoArgs],
        CanisterInfoResult,
        async (args) => {
            const arg: canister_info_args = {
                canister_id: args.canister_id,
                num_requested_changes:
                    args.num_requested_changes?.Some === undefined
                        ? []
                        : [args.num_requested_changes.Some]
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(`icp://aaaaa-aa/canister_info`, {
                    body: serialize({
                        args: [arg]
                    })
                });
                return await response.json();
            } else {
                return await call<[canister_info_args], canister_info_result>(
                    'aaaaa-aa',
                    'canister_info',
                    {
                        paramIdlTypes: [canister_info_args],
                        returnIdlType: canister_info_result,
                        args: [arg]
                    }
                );
            }
        }
    ),
    getCanisterStatus: update(
        [CanisterStatusArgs],
        CanisterStatusResult,
        async (arg) => {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(`icp://aaaaa-aa/canister_status`, {
                    body: serialize({
                        args: [arg]
                    })
                });
                return await response.json();
            } else {
                return await call<
                    [canister_status_args],
                    canister_status_result
                >('aaaaa-aa', 'canister_status', {
                    paramIdlTypes: [canister_status_args],
                    returnIdlType: canister_status_result,
                    args: [arg]
                });
            }
        }
    ),
    executeDeleteCanister: update([Principal], bool, async (canisterId) => {
        const arg: delete_canister_args = {
            canister_id: canisterId
        };

        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/delete_canister`, {
                body: serialize({
                    args: [arg]
                })
            });
        } else {
            await call<[delete_canister_args], Void>(
                'aaaaa-aa',
                'delete_canister',
                {
                    paramIdlTypes: [delete_canister_args],
                    args: [arg]
                }
            );
        }

        return true;
    }),
    executeDepositCycles: update([Principal], bool, async (canisterId) => {
        const arg: deposit_cycles_args = {
            canister_id: canisterId
        };

        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/deposit_cycles`, {
                body: serialize({
                    args: [arg],
                    cycles: 10_000_000n
                })
            });
        } else {
            await call<[deposit_cycles_args], Void>(
                'aaaaa-aa',
                'deposit_cycles',
                {
                    paramIdlTypes: [deposit_cycles_args],
                    args: [arg],
                    cycles: 10_000_000n
                }
            );
        }

        return true;
    }),
    getRawRand: update([], blob, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(`icp://aaaaa-aa/raw_rand`);
            return await response.json();
        } else {
            return await call<undefined, raw_rand_result>(
                'aaaaa-aa',
                'raw_rand',
                {
                    returnIdlType: raw_rand_result
                }
            );
        }
    }),
    provisionalCreateCanisterWithCycles: update(
        [],
        ProvisionalCreateCanisterWithCyclesResult,
        async () => {
            const arg: provisional_create_canister_with_cycles_args = {
                amount: [],
                settings: [],
                sender_canister_version: [],
                specified_id: []
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://aaaaa-aa/provisional_create_canister_with_cycles`,
                    {
                        body: serialize({
                            args: [arg]
                        })
                    }
                );
                return await response.json();
            } else {
                return await call<
                    [provisional_create_canister_with_cycles_args],
                    provisional_create_canister_with_cycles_result
                >('aaaaa-aa', 'provisional_create_canister_with_cycles', {
                    paramIdlTypes: [
                        provisional_create_canister_with_cycles_args
                    ],
                    returnIdlType:
                        provisional_create_canister_with_cycles_result,
                    args: [arg]
                });
            }
        }
    ),
    provisionalTopUpCanister: update(
        [Principal, nat],
        bool,
        async (canisterId, amount) => {
            const arg: provisional_top_up_canister_args = {
                canister_id: canisterId,
                amount
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://aaaaa-aa/provisional_top_up_canister`, {
                    body: serialize({
                        args: [arg],
                        cycles: 10_000_000n
                    })
                });
            } else {
                await call<[provisional_top_up_canister_args], Void>(
                    'aaaaa-aa',
                    'provisional_top_up_canister',
                    {
                        paramIdlTypes: [provisional_top_up_canister_args],
                        args: [arg]
                    }
                );
            }

            return true;
        }
    ),
    getCreatedCanisterId: query([], Principal, () => {
        return state.createdCanisterId;
    })
});

async function createCanister(): Promise<any> {
    const arg: create_canister_args = {
        settings: [],
        sender_canister_version: []
    };

    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(`icp://aaaaa-aa/create_canister`, {
            body: serialize({
                args: [arg],
                cycles: 50_000_000_000_000n
            })
        });
        return await response.json();
    } else {
        return await call<[create_canister_args], create_canister_result>(
            'aaaaa-aa',
            'create_canister',
            {
                paramIdlTypes: [create_canister_args],
                returnIdlType: create_canister_result,
                args: [arg],
                cycles: 50_000_000_000_000n
            }
        );
    }
}
