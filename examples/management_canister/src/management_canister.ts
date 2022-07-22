// TODO once the Bitcoin integration is live, add the methods and tests

import { blob, CanisterResult, nat, ok, Principal, Query, Update } from 'azle';
import {
    CreateCanisterResult,
    CanisterStatusArgs,
    CanisterStatusResult,
    ManagementCanister,
    ProvisionalCreateCanisterWithCyclesResult
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

export function* execute_create_canister(): Update<ExecuteCreateCanisterResult> {
    const create_canister_result_canister_result: CanisterResult<CreateCanisterResult> =
        yield ManagementCanister.create_canister({
            settings: null
        }).with_cycles(1_000_000_000_000n);

    if (!ok(create_canister_result_canister_result)) {
        return {
            err: create_canister_result_canister_result.err
        };
    }

    const create_canister_result = create_canister_result_canister_result.ok;

    state.created_canister_id = create_canister_result.canister_id;

    return {
        ok: create_canister_result
    };
}

export function* execute_update_settings(
    canister_id: Principal
): Update<DefaultResult> {
    const canister_result: CanisterResult<void> =
        yield ManagementCanister.update_settings({
            canister_id,
            settings: {
                controllers: null,
                compute_allocation: 1n,
                memory_allocation: 3_000_000n,
                freezing_threshold: 2_000_000n
            }
        });

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: true
    };
}

export function* execute_install_code(
    canister_id: Principal,
    wasm_module: blob
): Update<DefaultResult> {
    const canister_result: CanisterResult<void> =
        yield ManagementCanister.install_code({
            mode: {
                install: null
            },
            canister_id,
            wasm_module,
            arg: Uint8Array.from([])
        }).with_cycles(100_000_000_000n);

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: true
    };
}

export function* execute_uninstall_code(
    canister_id: Principal
): Update<DefaultResult> {
    const canister_result: CanisterResult<void> =
        yield ManagementCanister.uninstall_code({
            canister_id
        });

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: true
    };
}

export function* execute_start_canister(
    canister_id: Principal
): Update<DefaultResult> {
    const canister_result: CanisterResult<void> =
        yield ManagementCanister.start_canister({
            canister_id
        });

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: true
    };
}

export function* execute_stop_canister(
    canister_id: Principal
): Update<DefaultResult> {
    const canister_result: CanisterResult<void> =
        yield ManagementCanister.stop_canister({
            canister_id
        });

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: true
    };
}

export function* get_canister_status(
    args: CanisterStatusArgs
): Update<GetCanisterStatusResult> {
    const canister_status_result_canister_result: CanisterResult<CanisterStatusResult> =
        yield ManagementCanister.canister_status({
            canister_id: args.canister_id
        });

    if (canister_status_result_canister_result.ok === undefined) {
        return {
            err: canister_status_result_canister_result.err
        };
    }

    const canister_status_result = canister_status_result_canister_result.ok;

    return {
        ok: canister_status_result
    };
}

export function* execute_delete_canister(
    canister_id: Principal
): Update<DefaultResult> {
    const canister_result: CanisterResult<void> =
        yield ManagementCanister.delete_canister({
            canister_id
        });

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: true
    };
}

// TODO see https://forum.dfinity.org/t/question-about-deposit-cycles/12693
// TODO this method won't work until we implement call_with_payment and/or call_with_payment128
// TODO we will need to implement the ability to send payments with our cross canister calls
// export function* execute_deposit_cycles(canister_id: Principal): Update<DefaultResult> {
//     const canister_result: CanisterResult<void> = yield ManagementCanister.deposit_cycles({
//         canister_id
//     });

//     if (!ok(canister_result)) {
//         return {
//             err: canister_result.err
//         };
//     }

//     return {
//         ok: true
//     };
// }

export function* get_raw_rand(): Update<RawRandResult> {
    const raw_rand_canister_result: CanisterResult<blob> =
        yield ManagementCanister.raw_rand();

    if (!ok(raw_rand_canister_result)) {
        return {
            err: raw_rand_canister_result.err
        };
    }

    const randomness = raw_rand_canister_result.ok;

    return {
        ok: randomness
    };
}

// TODO we will test these once we can measure cycles better locally
export function* provisional_create_canister_with_cycles(): Update<ExecuteProvisionalCreateCanisterWithCyclesResult> {
    const canister_result: CanisterResult<ProvisionalCreateCanisterWithCyclesResult> =
        yield ManagementCanister.provisional_create_canister_with_cycles({
            amount: null,
            settings: null
        });

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    const provisional_create_canister_with_cycles_result = canister_result.ok;

    return {
        ok: provisional_create_canister_with_cycles_result
    };
}

// TODO we will test these once we can measure cycles better locally
export function* provisional_top_up_canister(
    canister_id: Principal,
    amount: nat
): Update<DefaultResult> {
    const canister_result: CanisterResult<void> =
        yield ManagementCanister.provisional_top_up_canister({
            canister_id,
            amount
        });

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: true
    };
}

export function get_created_canister_id(): Query<Principal> {
    return state.created_canister_id;
}
