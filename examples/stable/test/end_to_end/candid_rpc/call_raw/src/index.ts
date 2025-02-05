import { call, candidDecode, candidEncode, IDL, Principal, update } from 'azle';

export default class {
    @update([IDL.Principal, IDL.Text, IDL.Text, IDL.Nat64], IDL.Text)
    async executeCallRaw(
        canisterId: Principal,
        method: string,
        candidArgs: string,
        cycles: bigint
    ): Promise<string> {
        const result = await call<Uint8Array, Uint8Array>(canisterId, method, {
            args: candidEncode(candidArgs),
            cycles
        });

        return candidDecode(result);
    }
}
