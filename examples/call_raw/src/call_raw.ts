import {
    Canister,
    ic,
    nat,
    nat64,
    principal,
    Result,
    text,
    update
} from 'azle';

export default Canister({
    executeCallRaw: update(
        [principal, text, text, nat64],
        Result(text, text),
        async (canisterId, method, candidArgs, payment) => {
            const result = await ic.callRaw(
                canisterId,
                method,
                ic.candidEncode(candidArgs),
                payment
            );

            return Result.Ok(ic.candidDecode(result));
        }
    ),
    executeCallRaw128: update(
        [principal, text, text, nat],
        Result(text, text),
        async (canisterId, method, candidArgs, payment) => {
            const result = await ic.callRaw128(
                canisterId,
                method,
                ic.candidEncode(candidArgs),
                payment
            );

            return Result.Ok(ic.candidDecode(result));
        }
    )
});
