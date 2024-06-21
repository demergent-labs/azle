import { callRaw, callRaw128, IDL, query, update } from 'azle';

export default class {
    @update([Principal, IDL.Text, IDL.Text, nat64], Result(IDL.Text, IDL.Text))
    async executeCallRaw(canisterId, method, candidArgs, payment) {
        const result = await callRaw(
            canisterId,
            method,
            ic.candidEncode(candidArgs),
            payment
        );

        return Ok(ic.candidDecode(result));
    }
    @update([Principal, IDL.Text, IDL.Text, nat], Result(IDL.Text, IDL.Text))
    async executeCallRaw128(canisterId, method, candidArgs, payment) {
        const result = await callRaw128(
            canisterId,
            method,
            ic.candidEncode(candidArgs),
            payment
        );

        return Ok(ic.candidDecode(result));
    }
}
