// TODO once the Bitcoin integration is live, add the methods and tests

import { blob, match, nat, Principal, $query, $update } from 'azle';
import {
    CanisterStatusArgs,
    management_canister
} from 'azle/canisters/management';
import {
    DefaultResult,
    ExecuteCreateCanisterResult,
    ExecuteProvisionalCreateCanisterWithCyclesResult,
    GetCanisterStatusResult,
    RawRandResult
} from './types';

type State = {
    created_canister_id: Principal;
};

let state: State = {
    created_canister_id: Principal.fromText('aaaaa-aa')
};

$update;
export async function execute_create_canister(): Promise<ExecuteCreateCanisterResult> {
    const create_canister_result_canister_result = await management_canister
        .create_canister({
            settings: null
        })
        .cycles(50_000_000_000_000n)
        .call();

    return match(create_canister_result_canister_result, {
        ok: (create_canister_result) => {
            state.created_canister_id = create_canister_result.canister_id;

            return {
                ok: create_canister_result
            };
        },
        err: (err) => ({ err })
    });
}

$update;
export async function execute_update_settings(
    canister_id: Principal
): Promise<DefaultResult> {
    const canister_result = await management_canister
        .update_settings({
            canister_id,
            settings: {
                controllers: null,
                compute_allocation: 1n,
                memory_allocation: 3_000_000n,
                freezing_threshold: 2_000_000n
            }
        })
        .call();

    return match(canister_result, {
        ok: () => ({ ok: true }),
        err: (err) => ({ err })
    });
}

$update;
export async function execute_install_code(
    canister_id: Principal,
    wasm_module: blob
): Promise<DefaultResult> {
    const canister_result = await management_canister
        .install_code({
            mode: {
                install: null
            },
            canister_id,
            wasm_module,
            arg: Uint8Array.from([])
        })
        .cycles(100_000_000_000n)
        .call();

    return match(canister_result, {
        ok: () => ({ ok: true }),
        err: (err) => ({ err })
    });
}

$update;
export async function execute_uninstall_code(
    canister_id: Principal
): Promise<DefaultResult> {
    const canister_result = await management_canister
        .uninstall_code({
            canister_id
        })
        .call();

    return match(canister_result, {
        ok: () => ({ ok: true }),
        err: (err) => ({ err })
    });
}

$update;
export async function execute_start_canister(
    canister_id: Principal
): Promise<DefaultResult> {
    const canister_result = await management_canister
        .start_canister({
            canister_id
        })
        .call();

    return match(canister_result, {
        ok: () => ({ ok: true }),
        err: (err) => ({ err })
    });
}

$update;
export async function execute_stop_canister(
    canister_id: Principal
): Promise<DefaultResult> {
    const canister_result = await management_canister
        .stop_canister({
            canister_id
        })
        .call();

    return match(canister_result, {
        ok: () => ({ ok: true }),
        err: (err) => ({ err })
    });
}

$update;
export async function get_canister_status(
    args: CanisterStatusArgs
): Promise<GetCanisterStatusResult> {
    const canister_status_result_canister_result = await management_canister
        .canister_status({
            canister_id: args.canister_id
        })
        .call();

    return match(canister_status_result_canister_result, {
        ok: (canister_status_result) => ({ ok: canister_status_result }),
        err: (err) => ({ err })
    });
}

$update;
export async function execute_delete_canister(
    canister_id: Principal
): Promise<DefaultResult> {
    const canister_result = await management_canister
        .delete_canister({
            canister_id
        })
        .call();

    return match(canister_result, {
        ok: () => ({ ok: true }),
        err: (err) => ({ err })
    });
}

$update;
export async function execute_deposit_cycles(
    canister_id: Principal
): Promise<DefaultResult> {
    const canister_result = await management_canister
        .deposit_cycles({
            canister_id
        })
        .cycles(1_000_000n)
        .call();

    return match(canister_result, {
        ok: () => ({ ok: true }),
        err: (err) => ({ err })
    });
}

$update;
export async function get_raw_rand(): Promise<RawRandResult> {
    const raw_rand_canister_result = await management_canister
        .raw_rand()
        .call();

    return match(raw_rand_canister_result, {
        ok: (raw_randomness) => ({ ok: raw_randomness }),
        err: (err) => ({ err })
    });
}

// TODO we should test this like we test deposit_cycles
$update;
export async function provisional_create_canister_with_cycles(): Promise<ExecuteProvisionalCreateCanisterWithCyclesResult> {
    const canister_result = await management_canister
        .provisional_create_canister_with_cycles({
            amount: null,
            settings: null
        })
        .call();

    return match(canister_result, {
        ok: (provisional_create_canister_with_cycles_result) => ({
            ok: provisional_create_canister_with_cycles_result
        }),
        err: (err) => ({ err })
    });
}

// TODO we should test this like we test deposit_cycles
$update;
export async function provisional_top_up_canister(
    canister_id: Principal,
    amount: nat
): Promise<DefaultResult> {
    const canister_result = await management_canister
        .provisional_top_up_canister({
            canister_id,
            amount
        })
        .call();

    return match(canister_result, {
        ok: () => ({ ok: true }),
        err: (err) => ({ err })
    });
}

$query;
export function get_created_canister_id(): Principal {
    return state.created_canister_id;
}
