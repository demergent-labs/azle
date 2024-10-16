import { dataCertificate, IDL, query, setCertifiedData, update } from 'azle';

// TODO an easy update would be to have a pre and post upgrade that takes a boolean and based on that boolean it will either set the data or not
// TODO set can be called from pre, post, init, and upgrade, also reply and reject callbacks
// TODO we could also tests that it traps when it should
// TODO     for example set should trap if the data is greater than 32 bytes
// TODO     set should trap if it's called from a query
// TODO we could also tests that getCertificate returns None if called outside of a query
export default class {
    @update([IDL.Vec(IDL.Nat8)])
    setData(data: Uint8Array): void {
        setCertifiedData(data);
    }

    @query([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getCertificate(): [Uint8Array] | [] {
        const certificate = dataCertificate();
        if (certificate === undefined) {
            return [];
        }
        return [certificate];
    }
}
