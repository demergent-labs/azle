import { call, candidDecode, candidEncode } from 'azle';
import { Canister, nat, Principal, text, update } from 'azle/experimental';

export default Canister({
    executeCallRaw: update(
        [Principal, text, text, nat],
        text,
        async (canisterId, method, candidArgs, payment) => {
            const result = await call<Uint8Array, Uint8Array>(
                canisterId,
                method,
                {
                    args: candidEncode(candidArgs),
                    cycles: payment
                }
            );

            return candidDecode(result);
        }
    )
});
