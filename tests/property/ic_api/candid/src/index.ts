import { candidDecode, candidEncode, IDL, query } from 'azle';

export default class {
    @query([IDL.Vec(IDL.Nat8)], IDL.Text)
    candidDecodeQuery(candidBytes: Uint8Array): string {
        return candidDecode(candidBytes);
    }

    @query([IDL.Text], IDL.Vec(IDL.Nat8))
    candidEncodeQuery(candidString: string): Uint8Array {
        return candidEncode(candidString);
    }
}
