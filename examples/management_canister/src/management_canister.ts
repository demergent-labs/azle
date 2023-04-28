// TODO once the Bitcoin integration is live, add the methods and tests

import {
    blob,
    match,
    nat,
    Opt,
    Principal,
    $query,
    Result,
    $update
} from 'azle';
import {
    CanisterStatusArgs,
    CanisterStatusResult,
    CreateCanisterResult,
    managementCanister
} from 'azle/canisters/management';

type State = {
    createdCanisterId: Principal;
};

let state: State = {
    createdCanisterId: Principal.fromText('aaaaa-aa')
};

$update;
export async function executeCreateCanister(): Promise<
    Result<CreateCanisterResult, string>
> {
    const createCanisterResultCallResult = await managementCanister
        .create_canister({
            settings: Opt.None
        })
        .cycles(50_000_000_000_000n)
        .call();

    return match(createCanisterResultCallResult, {
        Ok: (createCanisterResult) => {
            state.createdCanisterId = createCanisterResult.canister_id;

            return {
                Ok: createCanisterResult
            };
        },
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function executeUpdateSettings(
    canisterId: Principal
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .update_settings({
            canister_id: canisterId,
            settings: {
                controllers: Opt.None,
                compute_allocation: Opt.Some(1n),
                memory_allocation: Opt.Some(3_000_000n),
                freezing_threshold: Opt.Some(2_000_000n)
            }
        })
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function executeInstallCode(
    canisterId: Principal,
    wasmModule: blob
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .install_code({
            mode: {
                install: null
            },
            canister_id: canisterId,
            wasm_module: wasmModule,
            arg: Uint8Array.from([])
        })
        .cycles(100_000_000_000n)
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function executeUninstallCode(
    canisterId: Principal
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .uninstall_code({
            canister_id: canisterId
        })
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function executeStartCanister(
    canisterId: Principal
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .start_canister({
            canister_id: canisterId
        })
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function executeStopCanister(
    canisterId: Principal
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .stop_canister({
            canister_id: canisterId
        })
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function getCanisterStatus(
    args: CanisterStatusArgs
): Promise<Result<CanisterStatusResult, string>> {
    const canisterStatusResultCallResult = await managementCanister
        .canister_status({
            canister_id: args.canister_id
        })
        .call();

    return match(canisterStatusResultCallResult, {
        Ok: (canisterStatusResult) => ({ Ok: canisterStatusResult }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function executeDeleteCanister(
    canisterId: Principal
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .delete_canister({
            canister_id: canisterId
        })
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function executeDepositCycles(
    canisterId: Principal
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .deposit_cycles({
            canister_id: canisterId
        })
        .cycles(1_000_000n)
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function getRawRand(): Promise<Result<blob, string>> {
    const rawRandcallResult = await managementCanister.raw_rand().call();

    return match(rawRandcallResult, {
        Ok: (rawRandomness) => ({ Ok: rawRandomness }),
        Err: (err) => ({ Err: err })
    });
}

// TODO we should test this like we test depositCycles
$update;
export async function provisionalCreateCanisterWithCycles(): Promise<
    Result<CreateCanisterResult, string>
> {
    const callResult = await managementCanister
        .provisional_create_canister_with_cycles({
            amount: Opt.None,
            settings: Opt.None
        })
        .call();

    return match(callResult, {
        Ok: (provisionalCreateCanisterWithCyclesResult) => ({
            Ok: provisionalCreateCanisterWithCyclesResult
        }),
        Err: (err) => ({ Err: err })
    });
}

// TODO we should test this like we test depositCycles
$update;
export async function provisionalTopUpCanister(
    canisterId: Principal,
    amount: nat
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .provisional_top_up_canister({
            canister_id: canisterId,
            amount
        })
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}

$query;
export function getCreatedCanisterId(): Principal {
    return state.createdCanisterId;
}
