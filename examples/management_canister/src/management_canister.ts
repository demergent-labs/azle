// TODO once the Bitcoin integration is live, add the methods and tests

import {
    blob,
    bool,
    ic,
    nat,
    None,
    principal,
    Principal,
    query,
    Service,
    Some,
    update
} from 'azle';
import {
    CanisterStatusArgs,
    CanisterStatusResult,
    CreateCanisterResult,
    managementCanister,
    CreateCanisterArgs,
    UpdateSettingsArgs,
    InstallCodeArgs,
    InstallCodeMode,
    UninstallCodeArgs,
    StartCanisterArgs,
    StopCanisterArgs,
    DeleteCanisterArgs,
    ProvisionalCreateCanisterWithCyclesArgs,
    ProvisionalTopUpCanisterArgs,
    DepositCyclesArgs
} from 'azle/canisters/management';

type State = {
    createdCanisterId: Principal;
};

let state: State = {
    createdCanisterId: Principal.fromText('aaaaa-aa')
};

export default class extends Service {
    @update([], CreateCanisterResult)
    async executeCreateCanister(): Promise<CreateCanisterResult> {
        const createCanisterResult = await ic.call(
            managementCanister.create_canister,
            {
                args: [CreateCanisterArgs.create({ settings: None })],
                cycles: 50_000_000_000_000n
            }
        );

        state.createdCanisterId = createCanisterResult.canister_id;

        return createCanisterResult;
    }

    @update([principal], bool)
    async executeUpdateSettings(canisterId: Principal): Promise<bool> {
        await ic.call(managementCanister.update_settings, {
            args: [
                UpdateSettingsArgs.create({
                    canister_id: canisterId,
                    settings: {
                        controllers: None,
                        compute_allocation: Some(1n),
                        memory_allocation: Some(3_000_000n),
                        freezing_threshold: Some(2_000_000n)
                    }
                })
            ]
        });

        return true;
    }

    @update([principal, blob], bool)
    async executeInstallCode(
        canisterId: Principal,
        wasmModule: blob
    ): Promise<bool> {
        await ic.call(managementCanister.install_code, {
            args: [
                InstallCodeArgs.create({
                    mode: InstallCodeMode.create({
                        install: null
                    }),
                    canister_id: canisterId,
                    wasm_module: wasmModule,
                    arg: Uint8Array.from([])
                })
            ],
            cycles: 100_000_000_000n
        });

        return true;
    }

    @update([principal], bool)
    async executeUninstallCode(canisterId: Principal): Promise<boolean> {
        await ic.call(managementCanister.uninstall_code, {
            args: [
                UninstallCodeArgs.create({
                    canister_id: canisterId
                })
            ]
        });

        return true;
    }

    @update([principal], bool)
    async executeStartCanister(canisterId: Principal): Promise<boolean> {
        await ic.call(managementCanister.start_canister, {
            args: [
                StartCanisterArgs.create({
                    canister_id: canisterId
                })
            ]
        });

        return true;
    }

    @update([principal], bool)
    async executeStopCanister(canisterId: Principal): Promise<boolean> {
        await ic.call(managementCanister.stop_canister, {
            args: [
                StopCanisterArgs.create({
                    canister_id: canisterId
                })
            ]
        });

        return true;
    }

    @update([CanisterStatusArgs], CanisterStatusResult)
    async getCanisterStatus(
        args: CanisterStatusArgs
    ): Promise<CanisterStatusResult> {
        return await ic.call(managementCanister.canister_status, {
            args: [
                CanisterStatusArgs.create({
                    canister_id: args.canister_id
                })
            ]
        });
    }

    @update([principal], bool)
    async executeDeleteCanister(canisterId: Principal): Promise<bool> {
        await ic.call(managementCanister.delete_canister, {
            args: [
                DeleteCanisterArgs.create({
                    canister_id: canisterId
                })
            ]
        });

        return true;
    }

    @update([principal], bool)
    async executeDepositCycles(canisterId: Principal): Promise<bool> {
        await ic.call(managementCanister.deposit_cycles, {
            args: [
                DepositCyclesArgs.create({
                    canister_id: canisterId
                })
            ],
            cycles: 10_000_000n
        });

        return true;
    }

    @update([], blob)
    async getRawRand(): Promise<blob> {
        return await ic.call(managementCanister.raw_rand);
    }

    // TODO we should test this like we test depositCycles
    @update([], CreateCanisterResult)
    async provisionalCreateCanisterWithCycles(): Promise<CreateCanisterResult> {
        return await ic.call(
            managementCanister.provisional_create_canister_with_cycles,
            {
                args: [
                    ProvisionalCreateCanisterWithCyclesArgs.create({
                        amount: None,
                        settings: None
                    })
                ]
            }
        );
    }

    // TODO we should test this like we test depositCycles
    @update([], bool)
    async provisionalTopUpCanister(
        canisterId: Principal,
        amount: nat
    ): Promise<boolean> {
        await ic.call(managementCanister.provisional_top_up_canister, {
            args: [
                ProvisionalTopUpCanisterArgs.create({
                    canister_id: canisterId,
                    amount
                })
            ]
        });

        return true;
    }

    @query([], principal)
    getCreatedCanisterId(): Principal {
        return state.createdCanisterId;
    }
}
