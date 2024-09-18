import { call, candidDecode, candidEncode, IDL, Principal, update } from 'azle';

export default class {
    @update([IDL.Principal, IDL.Text, IDL.Text, IDL.Nat64], IDL.Text)
    async executeCallRaw(
        canisterId: Principal,
        method: string,
        candidArgs: string,
        payment: bigint
    ): Promise<string> {
        const result = await call<undefined>(canisterId, method, {
            raw: candidEncode(candidArgs),
            payment
        });

        return candidDecode(result);
    }
}
