// TODO use Result in here

import { ic, IDL, nat, nat64, principal, Principal, text, update } from 'azle';

export default class {
    @update(
        [principal, text, text, nat64],
        IDL.Variant({
            Ok: IDL.Text,
            Err: IDL.Text
        })
    )
    async executeCallRaw(
        canisterId: Principal,
        method: string,
        candidArgs: string,
        payment: nat64
    ): Promise<{
        Ok?: string;
        Err?: string;
    }> {
        const result = await ic.callRaw(
            canisterId,
            method,
            ic.candidEncode(candidArgs),
            payment
        );

        return {
            Ok: ic.candidDecode(result)
        };
    }

    @update(
        [principal, text, text, nat],
        IDL.Variant({
            Ok: IDL.Text,
            Err: IDL.Text
        })
    )
    async executeCallRaw128(
        canisterId: Principal,
        method: string,
        candidArgs: string,
        payment: nat
    ): Promise<{
        Ok?: string;
        Err?: string;
    }> {
        const result = await ic.callRaw128(
            canisterId,
            method,
            ic.candidEncode(candidArgs),
            payment
        );

        return {
            Ok: ic.candidDecode(result)
        };
    }
}
