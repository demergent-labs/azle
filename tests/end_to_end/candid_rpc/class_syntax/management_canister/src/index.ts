// TODO once the Bitcoin integration is live, add the methods and tests

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
import {
    blob,
    bool,
    ic,
    nat,
    None,
    Opt,
    Principal,
    query,
    serialize,
    Some,
    update,
    Vec
} from 'azle/experimental';

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
        if (process.env.AZLE_TEST_FETCH === 'true' || false) {
            await fetch(`icp://aaaaa-aa/update_settings`, {
                body: serialize({
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
                })
            });
        } else {
            await ic.call(managementCanister.update_settings, {
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
        }

        return true;
    }
    @update([Principal, blob], ChunkHash)
    async executeUploadChunk(canisterId, chunk) {
        if (process.env.AZLE_TEST_FETCH === 'true' || false) {
            const response = await fetch(`icp://aaaaa-aa/upload_chunk`, {
                body: serialize({
                    args: [
                        {
                            canister_id: canisterId,
                            chunk
                        }
                    ]
                })
            });

            return await response.json();
        } else {
            return await ic.call(managementCanister.upload_chunk, {
                args: [
                    {
                        canister_id: canisterId,
                        chunk
                    }
                ]
            });
        }
    }
    @update([Principal], bool)
    async executeClearChunkStore(canisterId) {
        if (process.env.AZLE_TEST_FETCH === 'true' || false) {
            await fetch(`icp://aaaaa-aa/clear_chunk_store`, {
                body: serialize({
                    args: [
                        {
                            canister_id: canisterId
                        }
                    ]
                })
            });
        } else {
            await ic.call(managementCanister.clear_chunk_store, {
                args: [
                    {
                        canister_id: canisterId
                    }
                ]
            });
        }

        return true;
    }
    @update([Principal], StoredChunksResult)
    async getStoredChunks(canisterId) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(`icp://aaaaa-aa/stored_chunks`, {
                body: serialize({
                    args: [
                        {
                            canister_id: canisterId
                        }
                    ]
                })
            });
            return await response.json();
        } else {
            return await ic.call(managementCanister.stored_chunks, {
                args: [
                    {
                        canister_id: canisterId
                    }
                ]
            });
        }
    }
    @update([Principal, blob], bool)
    async executeInstallCode(canisterId, wasmModule) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/install_code`, {
                body: serialize({
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
                    cycles: 100_000_000_000n
                })
            });
        } else {
            await ic.call(managementCanister.install_code, {
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
        }

        return true;
    }
    @update([Principal, Vec(ChunkHash), blob], bool)
    async executeInstallChunkedCode(canisterId, chunkHashes, wasmModuleHash) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/install_chunked_code`, {
                body: serialize({
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
                    cycles: 100_000_000_000n
                })
            });
        } else {
            await ic.call(managementCanister.install_chunked_code, {
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
        }

        return true;
    }
    @update([Principal], bool)
    async executeUninstallCode(canisterId) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/uninstall_code`, {
                body: serialize({
                    args: [
                        {
                            canister_id: canisterId,
                            sender_canister_version: []
                        }
                    ]
                })
            });
        } else {
            await ic.call(managementCanister.uninstall_code, {
                args: [
                    {
                        canister_id: canisterId,
                        sender_canister_version: None
                    }
                ]
            });
        }

        return true;
    }
    @update([Principal], bool)
    async executeStartCanister(canisterId) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/start_canister`, {
                body: serialize({
                    args: [{ canister_id: canisterId }]
                })
            });
        } else {
            await ic.call(managementCanister.start_canister, {
                args: [
                    {
                        canister_id: canisterId
                    }
                ]
            });
        }
        return true;
    }
    @update([Principal], bool)
    async executeStopCanister(canisterId) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/stop_canister`, {
                body: serialize({
                    args: [{ canister_id: canisterId }]
                })
            });
        } else {
            await ic.call(managementCanister.stop_canister, {
                args: [
                    {
                        canister_id: canisterId
                    }
                ]
            });
        }

        return true;
    }
    @update([CanisterInfoArgs], CanisterInfoResult)
    async getCanisterInfo(args) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const { canister_id, num_requested_changes } = args;
            const infoArgs = {
                canister_id,
                num_requested_changes: azleOptToAgentOpt(num_requested_changes)
            };
            const response = await fetch(`icp://aaaaa-aa/canister_info`, {
                body: serialize({
                    args: [infoArgs]
                })
            });
            return await response.json();
        } else {
            return await ic.call(managementCanister.canister_info, {
                args: [args]
            });
        }
    }
    @update([CanisterStatusArgs], CanisterStatusResult)
    async getCanisterStatus(args) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(`icp://aaaaa-aa/canister_status`, {
                body: serialize({
                    args: [args]
                })
            });
            return await response.json();
        } else {
            return await ic.call(managementCanister.canister_status, {
                args: [args]
            });
        }
    }
    @update([Principal], bool)
    async executeDeleteCanister(canisterId) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/delete_canister`, {
                body: serialize({
                    args: [{ canister_id: canisterId }]
                })
            });
        } else {
            await ic.call(managementCanister.delete_canister, {
                args: [
                    {
                        canister_id: canisterId
                    }
                ]
            });
        }

        return true;
    }
    @update([Principal], bool)
    async executeDepositCycles(canisterId) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/deposit_cycles`, {
                body: serialize({
                    args: [{ canister_id: canisterId }],
                    cycles: 10_000_000n
                })
            });
        } else {
            await ic.call(managementCanister.deposit_cycles, {
                args: [
                    {
                        canister_id: canisterId
                    }
                ],
                cycles: 10_000_000n
            });
        }

        return true;
    }
    @update([], blob)
    async getRawRand() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(`icp://aaaaa-aa/raw_rand`);
            return await response.json();
        } else {
            return await ic.call(managementCanister.raw_rand);
        }
    }
    // TODO we should test this like we test depositCycles
    @update([], ProvisionalCreateCanisterWithCyclesResult)
    async provisionalCreateCanisterWithCycles() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://aaaaa-aa/provisional_create_canister_with_cycles`,
                {
                    body: serialize({
                        args: [
                            {
                                amount: [],
                                settings: [],
                                sender_canister_version: [],
                                specified_id: []
                            }
                        ]
                    })
                }
            );
            return await response.json();
        } else {
            return await ic.call(
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
    }
    // TODO we should test this like we test depositCycles
    @update([Principal, nat], bool)
    async provisionalTopUpCanister(canisterId, amount) {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://aaaaa-aa/provisional_top_up_canister`, {
                body: serialize({
                    args: [{ canister_id: canisterId, amount }],
                    cycles: 10_000_000n
                })
            });
        } else {
            await ic.call(managementCanister.provisional_top_up_canister, {
                args: [
                    {
                        canister_id: canisterId,
                        amount
                    }
                ]
            });
        }

        return true;
    }
    @query([], Principal)
    getCreatedCanisterId() {
        return state.createdCanisterId;
    }
}

async function createCanister() {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(`icp://aaaaa-aa/create_canister`, {
            body: serialize({
                args: [{ settings: [], sender_canister_version: [] }],
                cycles: 50_000_000_000_000n
            })
        });
        return await response.json();
    } else {
        return await ic.call(managementCanister.create_canister, {
            args: [{ settings: None, sender_canister_version: None }],
            cycles: 50_000_000_000_000n
        });
    }
}

function azleOptToAgentOpt<T>(opt: Opt<T>): [T] | [] {
    if ('None' in opt) {
        return [];
    } else {
        return [opt.Some];
    }
}
