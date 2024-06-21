import { ic, nat, nat64, Ok, Principal, Result, text, update } from 'azle';

export default class {
    @update([Principal, text, text, nat64], Result(text, text))
    async executeCallRaw(canisterId, method, candidArgs, payment) {
        const result = await ic.callRaw(
            canisterId,
            method,
            ic.candidEncode(candidArgs),
            payment
        );

        return Ok(ic.candidDecode(result));
    }
    @update([Principal, text, text, nat], Result(text, text))
    async executeCallRaw128(canisterId, method, candidArgs, payment) {
        const result = await ic.callRaw128(
            canisterId,
            method,
            ic.candidEncode(candidArgs),
            payment
        );

        return Ok(ic.candidDecode(result));
    }
}
