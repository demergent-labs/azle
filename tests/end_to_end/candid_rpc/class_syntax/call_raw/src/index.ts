import {
    callRaw,
    callRaw128,
    candidDecode,
    candidEncode,
    IDL,
    Principal,
    update
} from 'azle';

function Result<T extends IDL.Type<any>, E extends IDL.Type<any>>(
    Ok: T,
    Err: E
): IDL.RecordClass {
    return IDL.Record({
        Ok: Ok,
        Err: Err
    });
}

type Result<Ok, Err> = {
    Ok: Ok;
    Err: Err;
};

export default class {
    @update(
        [IDL.Principal, IDL.Text, IDL.Text, IDL.Nat64],
        Result(IDL.Text, IDL.Text)
    )
    async executeCallRaw(
        canisterId: Principal,
        method: string,
        candidArgs: string,
        payment: bigint
    ) {
        const result = await callRaw(
            canisterId,
            method,
            candidEncode(candidArgs),
            payment
        );

        return { Ok: candidDecode(result) };
    }
    @update(
        [IDL.Principal, IDL.Text, IDL.Text, IDL.Nat],
        Result(IDL.Text, IDL.Text)
    )
    async executeCallRaw128(
        canisterId: Principal,
        method: string,
        candidArgs: string,
        payment: bigint
    ) {
        const result = await callRaw128(
            canisterId,
            method,
            candidEncode(candidArgs),
            payment
        );

        return { Ok: candidDecode(result) };
    }
}
