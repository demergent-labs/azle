// TODO once the Bitcoin integration is live, add the methods and tests

import {
    CanisterResult,
    nat,
    nat8,
    ok,
    Principal,
    Query,
    UpdateAsync
} from 'azle';
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
    created_canister_id: ''
};

export function* execute_create_canister(): UpdateAsync<ExecuteCreateCanisterResult> {
    const create_canister_result_canister_result: CanisterResult<CreateCanisterResult> = yield ManagementCanister.create_canister({
        settings: null
    });

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

export function* execute_update_settings(canister_id: Principal): UpdateAsync<DefaultResult> {
    const canister_result: CanisterResult<void> = yield ManagementCanister.update_settings({
        canister_id,
        settings: {
            controllers: null,
            compute_allocation: 1n,
            memory_allocation: 4014733n,
            freezing_threshold: 153n
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

// TODO revisit while addressing https://github.com/demergent-labs/azle/issues/249
// TODO any nat8[] of significant size will use up all of the canister's cycles
// export function* execute_install_code(canister_id: Principal, wasm_module: nat8[]): UpdateAsync<DefaultResult> {
//     const canister_result: CanisterResult<void> = yield ManagementCanister.install_code({
//         mode: {
//             install: null
//         },
//         canister_id,
//         wasm_module,
//         arg: []
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

export function* execute_uninstall_code(canister_id: Principal): UpdateAsync<DefaultResult> {
    const canister_result: CanisterResult<void> = yield ManagementCanister.uninstall_code({
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

export function* execute_start_canister(canister_id: Principal): UpdateAsync<DefaultResult> {
    const canister_result: CanisterResult<void> = yield ManagementCanister.start_canister({
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

export function* execute_stop_canister(canister_id: Principal): UpdateAsync<DefaultResult> {
    const canister_result: CanisterResult<void> = yield ManagementCanister.stop_canister({
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

export function* get_canister_status(args: CanisterStatusArgs): UpdateAsync<GetCanisterStatusResult> {
    const canister_status_result_canister_result: CanisterResult<CanisterStatusResult> = yield ManagementCanister.canister_status({
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

export function* execute_delete_canister(canister_id: Principal): UpdateAsync<DefaultResult> {
    const canister_result: CanisterResult<void> = yield ManagementCanister.delete_canister({
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
// export function* execute_deposit_cycles(canister_id: Principal): UpdateAsync<DefaultResult> {
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

export function* get_raw_rand(): UpdateAsync<RawRandResult> {
    const raw_rand_canister_result: CanisterResult<nat8[]> = yield ManagementCanister.raw_rand();

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
export function* provisional_create_canister_with_cycles(): UpdateAsync<ExecuteProvisionalCreateCanisterWithCyclesResult> {
    const canister_result: CanisterResult<ProvisionalCreateCanisterWithCyclesResult> = yield ManagementCanister.provisional_create_canister_with_cycles({
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
export function* provisional_top_up_canister(canister_id: Principal, amount: nat): UpdateAsync<DefaultResult> {
    const canister_result: CanisterResult<void> = yield ManagementCanister.provisional_top_up_canister({
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
    return state.created_canister_id
}