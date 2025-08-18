import { candidDecode, candidEncode, IDL, query } from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/_internal/test/assert_type';

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
    assertCandidDecodeTypes(candidBytes: Uint8Array): boolean {
        type _AssertParamType = AssertType<
            NotAnyAndExact<Parameters<typeof candidDecode>[0], Uint8Array>
        >;
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof candidDecode>, string>
        >;
        return (
            candidBytes instanceof Uint8Array &&
            typeof candidDecode(candidBytes) === 'string'
        );
    }

    @query([IDL.Text], IDL.Bool)
    assertCandidEncodeTypes(candidString: string): boolean {
        type _AssertParamType = AssertType<
            NotAnyAndExact<Parameters<typeof candidEncode>[0], string>
        >;
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof candidEncode>, Uint8Array>
        >;
        return (
            typeof candidString === 'string' &&
            candidEncode(candidString) instanceof Uint8Array
        );
    }
}
