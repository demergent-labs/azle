import { ic, match, nat, nat64, Principal, $update, Variant } from 'azle';

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

    return match(canister_result, {
        ok: (ok) => ({
            ok: ic.candid_decode(ok)
        }),
        err: (err) => ({ err })
    });
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

    return match(canister_result, {
        ok: (ok) => ({
            ok: ic.candid_decode(ok)
        }),
        err: (err) => ({ err })
    });
}
