import {
    CanisterResult,
    ic,
    nat,
    nat8,
    nat64,
    ok,
    Principal,
    UpdateAsync,
    Variant
} from 'azle';

type ExecuteCallRawResult = Variant<{
    ok: nat8[];
    err: string;
}>;

export function* execute_call_raw(
    canister_id: Principal,
    method: string,
    args_raw: nat8[],
    payment: nat64
): UpdateAsync<ExecuteCallRawResult> {
    const canister_result: CanisterResult<nat8[]> = yield ic.call_raw(
        canister_id,
        method,
        args_raw,
        payment
    );

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: canister_result.ok
    };
}

type ExecuteCallRaw128Result = Variant<{
    ok: nat8[];
    err: string;
}>;

export function* execute_call_raw128(
    canister_id: Principal,
    method: string,
    args_raw: nat8[],
    payment: nat
): UpdateAsync<ExecuteCallRaw128Result> {
    const canister_result: CanisterResult<nat8[]> = yield ic.call_raw128(
        canister_id,
        method,
        args_raw,
        payment
    );

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: canister_result.ok
    };
}