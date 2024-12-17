import { Canister, ic, nat, Principal, text, update } from 'azle/experimental';

export default Canister({
    executeCallRaw: update(
        [Principal, text, text, nat],
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
    )
});
