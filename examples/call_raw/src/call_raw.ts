import {
    ic,
    nat,
    nat64,
    principal,
    Principal,
    Result,
    text,
    update
} from 'azle';

export default class {
    @update([principal, text, text, nat64], Result(text, text))
    async executeCallRaw(
        canisterId: Principal,
        method: text,
        candidArgs: text,
        payment: nat64
    ): Promise<Result<text, text>> {
        const result = await ic.callRaw(
            canisterId,
            method,
            ic.candidEncode(candidArgs),
            payment
        );

        return Result.Ok(ic.candidDecode(result));
    }

    @update([principal, text, text, nat], Result(text, text))
    async executeCallRaw128(
        canisterId: Principal,
        method: text,
        candidArgs: text,
        payment: nat
    ): Promise<Result<text, text>> {
        const result = await ic.callRaw128(
            canisterId,
            method,
            ic.candidEncode(candidArgs),
            payment
        );

        return Result.Ok(ic.candidDecode(result));
    }
}
