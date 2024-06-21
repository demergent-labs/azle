import { IDL, query, update } from 'azle';

export default class {
    // encodes a Candid string to Candid bytes
    @query([IDL.Text], IDL.Vec(IDL.Nat8))
    candidEncode(candidString) {
        return ic.candidEncode(candidString);
    }
    // decodes Candid bytes to a Candid string
    @query([IDL.Vec(IDL.Nat8)], IDL.Text)
    candidDecode(candidEncoded) {
        return ic.candidDecode(candidEncoded);
    }
}
