import { ic, match, nat, nat64, Principal, $update, Variant } from 'azle';

$update;
export async function execute_call_raw(
    canister_id: Principal,
    method: string,
    candid_args: string,
    payment: nat64
): Promise<
    Variant<{
        Ok: string;
        Err: string;
    }>
> {
    const canister_result = await ic.callRaw(
        canister_id,
        method,
        ic.candidEncode(candid_args),
        payment
    );

    return match(canister_result, {
        Ok: (ok) => ({
            Ok: ic.candidDecode(ok)
        }),
        Err: (err) => ({ Err: err })
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
        Ok: string;
        Err: string;
    }>
> {
    const canister_result = await ic.callRaw128(
        canister_id,
        method,
        ic.candidEncode(candid_args),
        payment
    );

    return match(canister_result, {
        Ok: (ok) => ({
            Ok: ic.candidDecode(ok)
        }),
        Err: (err) => ({ Err: err })
    });
}
