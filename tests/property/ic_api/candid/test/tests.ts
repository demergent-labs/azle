import { ActorSubclass } from '@dfinity/agent';
import { defaultPropTestParams, expect, it, Test } from 'azle/test';
import fc from 'fast-check';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/canister/canister.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('should encode and decode Candid strings correctly', async () => {
            await fc.assert(
                fc.asyncProperty(fc.string(), async (arbitraryString) => {
                    const candidString = `("${arbitraryString}")`;

                    // Encode the Candid string
                    const encodedBytes =
                        await canister.candidEncodeQuery(candidString);

                    // Decode the encoded bytes
                    const decodedString =
                        await canister.candidDecodeQuery(encodedBytes);

                    // The decoded string should match the original Candid string
                    expect(decodedString).toBe(candidString);
                }),
                defaultPropTestParams
            );
        });

        it('should decode and encode Candid bytes correctly', async () => {
            await fc.assert(
                fc.asyncProperty(fc.string(), async (arbitraryString) => {
                    const candidString = `("${arbitraryString}")`;

                    // Encode the Candid string to get some valid Candid bytes
                    const encodedBytes =
                        await canister.candidEncodeQuery(candidString);

                    // Decode the encoded bytes
                    const decodedString =
                        await canister.candidDecodeQuery(encodedBytes);

                    // Encode the decoded string again
                    const reEncodedBytes =
                        await canister.candidEncodeQuery(decodedString);

                    // The re-encoded bytes should match the original encoded bytes
                    expect(reEncodedBytes).toEqual(encodedBytes);
                }),
                defaultPropTestParams
            );
        });

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
