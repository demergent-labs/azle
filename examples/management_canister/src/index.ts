// TODO once the Bitcoin integration is live, add the methods and tests

import {
    blob,
    bool,
    Canister,
    ic,
    nat,
    None,
    Principal,
    query,
    Some,
    update
} from 'azle';
import {
    CanisterInfoArgs,
    CanisterInfoResult,
    CanisterStatusArgs,
    CanisterStatusResult,
    CreateCanisterResult,
    managementCanister,
    ProvisionalCreateCanisterWithCyclesResult
} from 'azle/canisters/management';

type State = {
    createdCanisterId: Principal;
};

let state: State = {
    createdCanisterId: Principal.fromText('aaaaa-aa')
};

export default Canister({
    executeCreateCanister: update([], CreateCanisterResult, async () => {
        const createCanisterResult = await ic.call(
            managementCanister.create_canister,
            {
                args: [{ settings: None }],
                cycles: 50_000_000_000_000n
            }
        );

        state.createdCanisterId = createCanisterResult.canister_id;

        return createCanisterResult;
    }),
    executeUpdateSettings: update([Principal], bool, async (canisterId) => {
        await ic.call(managementCanister.update_settings, {
            args: [
                {
                    canister_id: canisterId,
                    settings: {
                        controllers: None,
                        compute_allocation: Some(1n),
                        memory_allocation: Some(3_000_000n),
                        freezing_threshold: Some(2_000_000n)
                    }
                }
            ]
        });

        return true;
    }),
    executeInstallCode: update(
        [Principal, blob],
        bool,
        async (canisterId, wasmModule) => {
            await ic.call(managementCanister.install_code, {
                args: [
                    {
                        mode: {
                            install: null
                        },
                        canister_id: canisterId,
                        wasm_module: wasmModule,
                        arg: Uint8Array.from([])
                    }
                ],
                cycles: 100_000_000_000n
            });

            return true;
        }
    ),
    executeUninstallCode: update([Principal], bool, async (canisterId) => {
        await ic.call(managementCanister.uninstall_code, {
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    }),
    executeStartCanister: update([Principal], bool, async (canisterId) => {
        await ic.call(managementCanister.start_canister, {
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    }),
    executeStopCanister: update([Principal], bool, async (canisterId) => {
        await ic.call(managementCanister.stop_canister, {
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    }),
    getCanisterInfo: update(
        [CanisterInfoArgs],
        CanisterInfoResult,
        async (args) => {
            const result = await ic.call(managementCanister.canister_info, {
                args: [args]
            });
            return result;
        }
    ),
    getCanisterStatus: update(
        [CanisterStatusArgs],
        CanisterStatusResult,
        async (args) => {
            return await ic.call(managementCanister.canister_status, {
                args: [args]
            });
        }
    ),
    executeDeleteCanister: update([Principal], bool, async (canisterId) => {
        await ic.call(managementCanister.delete_canister, {
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    }),
    executeDepositCycles: update([Principal], bool, async (canisterId) => {
        await ic.call(managementCanister.deposit_cycles, {
            args: [
                {
                    canister_id: canisterId
                }
            ],
            cycles: 10_000_000n
        });

        return true;
    }),
    getRawRand: update([], blob, async () => {
        return await ic.call(managementCanister.raw_rand);
    }),
    // TODO we should test this like we test depositCycles
    provisionalCreateCanisterWithCycles: update(
        [],
        ProvisionalCreateCanisterWithCyclesResult,
        async () => {
            return await ic.call(
                managementCanister.provisional_create_canister_with_cycles,
                {
                    args: [
                        {
                            amount: None,
                            settings: None
                        }
                    ]
                }
            );
        }
    ),
    // TODO we should test this like we test depositCycles
    provisionalTopUpCanister: update(
        [Principal, nat],
        bool,
        async (canisterId, amount) => {
            await ic.call(managementCanister.provisional_top_up_canister, {
                args: [
                    {
                        canister_id: canisterId,
                        amount
                    }
                ]
            });

            return true;
        }
    ),
    getCreatedCanisterId: query([], Principal, () => {
        return state.createdCanisterId;
    })
});
