import {
    blob,
    CanisterResult,
    ic,
    nat,
    nat64,
    ok,
    Principal,
    UpdateAsync,
    Variant
} from 'azle';

type ExecuteCallRawResult = Variant<{
    ok: blob;
    err: string;
}>;

export function* execute_call_raw(
    canister_id: Principal,
    method: string,
    args_raw: blob,
    payment: nat64
): UpdateAsync<ExecuteCallRawResult> {
    const canister_result: CanisterResult<blob> = yield ic.call_raw(
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
    ok: blob;
    err: string;
}>;

export function* execute_call_raw128(
    canister_id: Principal,
    method: string,
    args_raw: blob,
    payment: nat
): UpdateAsync<ExecuteCallRaw128Result> {
    const canister_result: CanisterResult<blob> = yield ic.call_raw128(
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
