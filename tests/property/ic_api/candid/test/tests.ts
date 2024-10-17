import { ActorSubclass } from '@dfinity/agent';
import { defaultPropTestParams, expect, it, Test } from 'azle/test';
import fc from 'fast-check';
import { TextDecoder, TextEncoder } from 'util';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/canister/canister.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('should encode and decode Candid strings correctly, with UTF-8 verification', async () => {
            await fc.assert(
                fc.asyncProperty(fc.string(), async (arbitraryString) => {
                    const candidString = `("${escapeCandidString(
                        arbitraryString
                    )}")`;

                    // Encode the Candid string
                    const encodedBytes =
                        await canister.candidEncodeQuery(candidString);

                    // Verify UTF-8 encoding
                    const textEncoder = new TextEncoder();
                    const encodedUtf8 = textEncoder.encode(arbitraryString);
                    expect(encodedBytes.slice(8)).toEqual(encodedUtf8);

                    // Decode the encoded bytes
                    const decodedString =
                        await canister.candidDecodeQuery(encodedBytes);

                    // Verify UTF-8 decoding
                    const textDecoder = new TextDecoder('utf-8');
                    const decodedUtf8 = textDecoder.decode(encodedUtf8);
                    expect(decodedString).toBe(
                        `("${escapeCandidString(decodedUtf8)}")`
                    );

                    // The decoded string should match the original Candid string
                    expect(decodedString).toBe(candidString);
                }),
                defaultPropTestParams
            );
        });

        it('should decode Candid bytes and then encode correctly, with UTF-8 verification', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({
                        minLength: 10,
                        maxLength: 100,
                        min: 32,
                        max: 126
                    }),
                    async (arbitraryBytes) => {
                        // Prepend the DIDL header
                        const didlHeader = new Uint8Array([
                            68, 73, 68, 76, 0, 1, 113
                        ]);
                        const candidBytes = new Uint8Array([
                            ...didlHeader,
                            arbitraryBytes.length,
                            ...arbitraryBytes
                        ]);

                        // Decode the Candid bytes
                        const decodedString =
                            await canister.candidDecodeQuery(candidBytes);

                        // Verify UTF-8 decoding
                        const textDecoder = new TextDecoder('utf-8');
                        const decodedUtf8 = textDecoder.decode(arbitraryBytes);
                        expect(decodedString).toBe(
                            `("${escapeCandidString(decodedUtf8)}")`
                        );

                        // Encode the decoded string
                        const encodedBytes =
                            await canister.candidEncodeQuery(decodedString);

                        // Verify UTF-8 encoding
                        const textEncoder = new TextEncoder();
                        const encodedUtf8 = textEncoder.encode(decodedUtf8);
                        expect(encodedBytes.slice(8)).toEqual(encodedUtf8);

                        // The encoded bytes should match the original Candid bytes
                        expect(encodedBytes).toEqual(candidBytes);
                    }
                ),
                defaultPropTestParams
            );
        });

        // TODO candidCompilerQuery is not yet implemented
        it.skip('should compile Candid correctly', async () => {
            // This is a stub test for candidCompiler
            // You may want to replace this with a more meaningful test later
            const candidPath = 'path/to/candid/file.did';
            const compiledCandid =
                await canister.candidCompilerQuery(candidPath);

            expect(typeof compiledCandid).toBe('string');
            expect(compiledCandid.length).toBeGreaterThan(0);
        });
    };
}

function escapeCandidString(data: string): string {
    return data.replace(/[\\"']/g, '\\$&');
}
