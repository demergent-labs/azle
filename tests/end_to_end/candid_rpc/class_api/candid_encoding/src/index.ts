import { candidDecode, candidEncode, IDL, query } from 'azle';

export default class {
    // encodes a Candid string to Candid bytes
    @query([IDL.Text], IDL.Vec(IDL.Nat8))
    candidEncode(candidString: string): Uint8Array {
        return candidEncode(candidString);
    }

    // decodes Candid bytes to a Candid string
    @query([IDL.Vec(IDL.Nat8)], IDL.Text)
    candidDecode(candidEncoded: Uint8Array): string {
        return candidDecode(candidEncoded);
    }
}
