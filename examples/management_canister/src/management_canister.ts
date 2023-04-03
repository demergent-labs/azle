// TODO once the Bitcoin integration is live, add the methods and tests

import { blob, match, nat, Principal, $query, $update } from 'azle';
import {
    CanisterStatusArgs,
    managementCanister
} from 'azle/canisters/management';
import {
    DefaultResult,
    ExecuteCreateCanisterResult,
    ExecuteProvisionalCreateCanisterWithCyclesResult,
    GetCanisterStatusResult,
    RawRandResult
} from './types';

type State = {
    createdCanisterId: Principal;
};

let state: State = {
    createdCanisterId: Principal.fromText('aaaaa-aa')
};

$update;
export async function executeCreateCanister(): Promise<ExecuteCreateCanisterResult> {
    const createCanisterResultCallResult = await managementCanister
        .create_canister({
            settings: null
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
): Promise<DefaultResult> {
    const callResult = await managementCanister
        .update_settings({
            canister_id: canisterId,
            settings: {
                controllers: null,
                compute_allocation: 1n,
                memory_allocation: 3_000_000n,
                freezing_threshold: 2_000_000n
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
): Promise<DefaultResult> {
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
): Promise<DefaultResult> {
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
): Promise<DefaultResult> {
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
): Promise<DefaultResult> {
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
): Promise<GetCanisterStatusResult> {
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
): Promise<DefaultResult> {
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
): Promise<DefaultResult> {
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
export async function getRawRand(): Promise<RawRandResult> {
    const rawRandcallResult = await managementCanister.raw_rand().call();

    return match(rawRandcallResult, {
        Ok: (rawRandomness) => ({ Ok: rawRandomness }),
        Err: (err) => ({ Err: err })
    });
}

// TODO we should test this like we test depositCycles
$update;
export async function provisionalCreateCanisterWithCycles(): Promise<ExecuteProvisionalCreateCanisterWithCyclesResult> {
    const callResult = await managementCanister
        .provisional_create_canister_with_cycles({
            amount: null,
            settings: null
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
): Promise<DefaultResult> {
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
