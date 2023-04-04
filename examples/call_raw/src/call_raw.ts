import { ic, match, nat, nat64, Principal, Result, $update } from 'azle';

$update;
export async function executeCallRaw(
    canisterId: Principal,
    method: string,
    candidArgs: string,
    payment: nat64
): Promise<Result<string, string>> {
    const callResult = await ic.callRaw(
        canisterId,
        method,
        ic.candidEncode(candidArgs),
        payment
    );

    return match(callResult, {
        Ok: (ok) => ({
            Ok: ic.candidDecode(ok)
        }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function executeCallRaw128(
    canisterId: Principal,
    method: string,
    candidArgs: string,
    payment: nat
): Promise<Result<string, string>> {
    const callResult = await ic.callRaw128(
        canisterId,
        method,
        ic.candidEncode(candidArgs),
        payment
    );

    return match(callResult, {
        Ok: (ok) => ({
            Ok: ic.candidDecode(ok)
        }),
        Err: (err) => ({ Err: err })
    });
}
