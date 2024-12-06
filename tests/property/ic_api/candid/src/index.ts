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

    @query([IDL.Vec(IDL.Nat8)], IDL.Bool)
    candidDecodeTypesAreCorrect(candidBytes: Uint8Array): boolean {
        return (
            candidBytes instanceof Uint8Array &&
            typeof candidDecode(candidBytes) === 'string'
        );
    }

    @query([IDL.Text], IDL.Bool)
    candidEncodeTypesAreCorrect(candidString: string): boolean {
        return (
            typeof candidString === 'string' &&
            candidEncode(candidString) instanceof Uint8Array
        );
    }
}
