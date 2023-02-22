import { ic, nat, nat64, ok, Principal, $update, Variant } from 'azle';

$update;
export async function execute_call_raw(
    canister_id: Principal,
    method: string,
    candid_args: string,
    payment: nat64
): Promise<
    Variant<{
        ok: string;
        err: string;
    }>
> {
    const canister_result = await ic.call_raw(
        canister_id,
        method,
        ic.candid_encode(candid_args),
        payment
    );

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: ic.candid_decode(canister_result.ok)
    };
}

$update;
export async function execute_call_raw128(
    canister_id: Principal,
    method: string,
    candid_args: string,
    payment: nat
): Promise<
    Variant<{
        ok: string;
        err: string;
    }>
> {
    const canister_result = await ic.call_raw128(
        canister_id,
        method,
        ic.candid_encode(candid_args),
        payment
    );

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: ic.candid_decode(canister_result.ok)
    };
}
