import {
    candidEncode,
    dataCertificate,
    IDL,
    query,
    setCertifiedData,
    update
} from 'azle';

export default class {
    value: number = 0;

    @update([], IDL.Nat32)
    async inc(): Promise<number> {
        this.value += 1;
        setCertifiedData(blobOfNat32(this.value));
        return this.value;
    }

    @update([IDL.Nat32])
    async set(newValue: number): Promise<void> {
        this.value = newValue;
        setCertifiedData(blobOfNat32(this.value));
    }

    /// Returns the current counter value,
    /// and, if available, an unforgeable certificate (from the system) about its authenticity.
    /// When called via update call or inter-canister call, no certificate is present (and not needed,
    /// as in these cases the system already certifies the response)
    @query(
        [],
        IDL.Record({
            value: IDL.Nat32,
            certificate: IDL.Opt(IDL.Vec(IDL.Nat8))
        })
    )
    async get(): Promise<{ value: number; certificate: [Uint8Array] | [] }> {
        const cert = dataCertificate();
        return {
            value: this.value,
            certificate: cert ? [cert] : []
        };
    }
}

function blobOfNat32(n: number): Uint8Array {
    return candidEncode(`(${n}:nat32)`).slice(-4);
}
