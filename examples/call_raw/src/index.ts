import {
    Canister,
    ic,
    nat,
    nat64,
    Principal,
    text,
    update
} from 'azle/experimental';

export default Canister({
    executeCallRaw: update(
        [Principal, text, text, nat64],
        text,
        async (canisterId, method, candidArgs, payment) => {
            const result = await ic.callRaw(
                canisterId,
                method,
                ic.candidEncode(candidArgs),
                payment
            );

            return ic.candidDecode(result);
        }
    ),
    executeCallRaw128: update(
        [Principal, text, text, nat],
        text,
        async (canisterId, method, candidArgs, payment) => {
            const result = await ic.callRaw128(
                canisterId,
                method,
                ic.candidEncode(candidArgs),
                payment
            );

            return ic.candidDecode(result);
        }
    )
});
