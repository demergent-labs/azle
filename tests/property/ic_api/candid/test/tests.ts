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

                    const encodedBytes = await checkCandidEncoding(
                        canister,
                        arbitraryString,
                        candidString
                    );

                    const decodedString = await checkCandidDecoding(
                        canister,
                        encodedBytes
                    );

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
                        const didlHeader = new Uint8Array([
                            68, 73, 68, 76, 0, 1, 113
                        ]);
                        const candidBytes = new Uint8Array([
                            ...didlHeader,
                            arbitraryBytes.length,
                            ...arbitraryBytes
                        ]);

                        const decodedString = await checkCandidDecoding(
                            canister,
                            candidBytes
                        );

                        const encodedBytes = await checkCandidEncoding(
                            canister,
                            arbitraryBytes,
                            decodedString
                        );

                        expect(encodedBytes).toEqual(candidBytes);
                    }
                ),
                defaultPropTestParams
            );
        });

        // TODO candidCompilerQuery is not yet implemented
        it.skip('should compile Candid correctly', async () => {
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

async function checkCandidDecoding(
    canister: ActorSubclass<_SERVICE>,
    encodedBytes: Uint8Array
): Promise<string> {
    const decodedString = await canister.candidDecodeQuery(encodedBytes);
    const textDecoder = new TextDecoder('utf-8');
    const decodedUtf8 = textDecoder.decode(encodedBytes.slice(8));
    expect(decodedString).toBe(`("${escapeCandidString(decodedUtf8)}")`);
    return decodedString;
}

async function checkCandidEncoding(
    canister: ActorSubclass<_SERVICE>,
    rawData: string | Uint8Array,
    candidString: string
): Promise<Uint8Array> {
    const encodedBytes = await canister.candidEncodeQuery(candidString);
    const textEncoder = new TextEncoder();
    const expectedEncodedData =
        typeof rawData === 'string' ? textEncoder.encode(rawData) : rawData;
    expect(encodedBytes.slice(8)).toEqual(expectedEncodedData);
    return new Uint8Array(encodedBytes);
}
