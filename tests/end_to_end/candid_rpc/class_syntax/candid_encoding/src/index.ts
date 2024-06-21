import { IDL, query, update } from 'azle';

export default class {
    // encodes a Candid string to Candid bytes
    @query([text], IDL.Vec(IDL.Nat8))
    candidEncode(candidString) {
        return ic.candidEncode(candidString);
    }
    // decodes Candid bytes to a Candid string
    @query([IDL.Vec(IDL.Nat8)], text)
    candidDecode(candidEncoded) {
        return ic.candidDecode(candidEncoded);
    }
}
