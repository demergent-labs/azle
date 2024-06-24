import {
    Canister,
    ic,
    nat,
    nat64,
    Ok,
    Principal,
    Result,
    text,
    update
} from 'azle/experimental';

export default Canister({
    executeCallRaw: update(
        [Principal, text, text, nat64],
        Result(text, text),
        async (canisterId, method, candidArgs, payment) => {
            const result = await ic.callRaw(
                canisterId,
                method,
                ic.candidEncode(candidArgs),
                payment
            );

            return Ok(ic.candidDecode(result));
        }
    ),
    executeCallRaw128: update(
        [Principal, text, text, nat],
        Result(text, text),
        async (canisterId, method, candidArgs, payment) => {
            const result = await ic.callRaw128(
                canisterId,
                method,
                ic.candidEncode(candidArgs),
                payment
            );

            return Ok(ic.candidDecode(result));
        }
    )
});
