import { ActorSubclass } from '@dfinity/agent';
import { describe } from '@jest/globals';
import { expect, it, please, Test } from 'azle/test';
import { execSync } from 'child_process';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/candid_encoding/candid_encoding.did';

export function getTests(
    candidEncodingCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        please('install didc', async () => {
            execSync(
                `cargo install --git https://github.com/dfinity/candid --rev 5d3c7c35da652d145171bc071ac11c63d73bf803 --force didc`,
                { stdio: 'inherit' }
            );
        });

        describe.each([
            '()',
            `("hello my friend")`,
            `(blob "0123456789")`,
            `(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)`,
            `(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)`,
            `(true)`,
            `(null : null)`,
            `(vec { 0 : int8; 1 : int8; 2 : int8 })`,
            `(opt (43 : int32))`,
            `(func "aaaaa-aa".raw_rand)`,
            `(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")`
        ])('simple tests', (candidString) => {
            it(`candid encodes ${candidString}`, async () =>
                await candidEncodeTest(candidEncodingCanister, candidString));

            it(`candid decodes ${candidString}`, async () =>
                await candidDecodeTest(candidEncodingCanister, candidString));
        });

        it('candid encodes/candid decodes (record { first_name = "John"; last_name = "Doe" })', async () => {
            const candidString = `(record { first_name = "John"; last_name = "Doe" })`;
            await candidEncodeTest(candidEncodingCanister, candidString);

            const candidEncodedHexString = execSync(
                `didc encode '${candidString}'`
            )
                .toString()
                .trim();
            const candidEncodedByteArray =
                candidEncodedHexString
                    .match(/.{1,2}/g)
                    ?.map((x) => parseInt(x, 16)) ?? [];

            const candidDecodedResult =
                await candidEncodingCanister.candidDecode(
                    Uint8Array.from(candidEncodedByteArray)
                );

            expect(candidDecodedResult).toMatch('record');
            expect(candidDecodedResult).toMatch('John');
            expect(candidDecodedResult).toMatch('Doe');
        });

        it('candid encodes/candid decodes (variant { ok = true })', async () => {
            const candidString = `(variant { ok = true })`;
            await candidEncodeTest(candidEncodingCanister, candidString);

            const candidEncodedHexString = execSync(
                `didc encode '${candidString}'`
            )
                .toString()
                .trim();
            const candidEncodedByteArray =
                candidEncodedHexString
                    .match(/.{1,2}/g)
                    ?.map((x) => parseInt(x, 16)) ?? [];

            const candidDecodedResult =
                await candidEncodingCanister.candidDecode(
                    Uint8Array.from(candidEncodedByteArray)
                );

            expect(candidDecodedResult).toMatch('variant');
            expect(candidDecodedResult).toMatch('= true');
        });
    };
}

async function candidEncodeTest(
    candidEncodingCanister: ActorSubclass<_SERVICE>,
    candidString: string
): Promise<void> {
    const candidEncodedHexString = execSync(`didc encode '${candidString}'`)
        .toString()
        .trim();
    const candidEncodedByteArray =
        candidEncodedHexString.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ??
        [];

    const result = await candidEncodingCanister.candidEncode(candidString);

    expect(Array.from(result)).toStrictEqual(candidEncodedByteArray);
}

async function candidDecodeTest(
    candidEncodingCanister: ActorSubclass<_SERVICE>,
    candidString: string
): Promise<void> {
    const candidEncodedHexString = execSync(`didc encode '${candidString}'`)
        .toString()
        .trim();
    const candidEncodedByteArray =
        candidEncodedHexString.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ??
        [];

    const result = await candidEncodingCanister.candidDecode(
        Uint8Array.from(candidEncodedByteArray)
    );

    expect(result).toBe(candidString);
}
