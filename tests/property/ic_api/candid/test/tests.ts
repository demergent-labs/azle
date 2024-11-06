import { ActorSubclass } from '@dfinity/agent';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import fc from 'fast-check';
import { TextDecoder, TextEncoder } from 'util';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should encode and decode Candid strings correctly, with UTF-8 verification', async () => {
            await fc.assert(
                fc.asyncProperty(fc.string(), async (arbitraryString) => {
                    const candidString = toCandidString(arbitraryString);
                    const canister = await getCanisterActor<Actor>('canister');

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
                        const candidBytes = toCandidBytes(arbitraryBytes);
                        const canister =
                            await getCanisterActor<Actor>('canister');

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
    };
}

async function checkCandidDecoding(
    canister: ActorSubclass<Actor>,
    encodedBytes: Uint8Array
): Promise<string> {
    const decodedString = await canister.candidDecodeQuery(encodedBytes);
    const textDecoder = new TextDecoder('utf-8');
    const decodedUtf8 = textDecoder.decode(encodedBytes.slice(8));
    expect(decodedString).toBe(toCandidString(decodedUtf8));
    return decodedString;
}

async function checkCandidEncoding(
    canister: ActorSubclass<Actor>,
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

function toCandidBytes(data: Uint8Array): Uint8Array {
    const didlHeader = new Uint8Array([68, 73, 68, 76, 0, 1, 113]);
    return new Uint8Array([...didlHeader, data.length, ...data]);
}

function toCandidString(data: string): string {
    return `("${escapeCandidString(data)}")`;
}

function escapeCandidString(data: string): string {
    return data.replace(/[\\"']/g, '\\$&');
}
