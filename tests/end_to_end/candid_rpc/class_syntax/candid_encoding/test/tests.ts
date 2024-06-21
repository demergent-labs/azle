import { ActorSubclass } from '@dfinity/agent';
import { describe } from '@jest/globals';
import { expect, it, please, Test } from 'azle/test/jest';
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
                await candid_encode_test(candidEncodingCanister, candidString));

            it(`candid decodes ${candidString}`, async () =>
                await candid_decode_test(candidEncodingCanister, candidString));
        });

        it('candid encodes/candid decodes (record { first_name = "John"; last_name = "Doe" })', async () => {
            const candid_string = `(record { first_name = "John"; last_name = "Doe" })`;
            await candid_encode_test(candidEncodingCanister, candid_string);

            const candid_encoded_hex_string = execSync(
                `didc encode '${candid_string}'`
            )
                .toString()
                .trim();
            const candid_encoded_byte_array =
                candid_encoded_hex_string
                    .match(/.{1,2}/g)
                    ?.map((x) => parseInt(x, 16)) ?? [];

            const candid_decoded_result =
                await candidEncodingCanister.candidDecode(
                    Uint8Array.from(candid_encoded_byte_array)
                );

            expect(candid_decoded_result).toMatch('record');
            expect(candid_decoded_result).toMatch('John');
            expect(candid_decoded_result).toMatch('Doe');
        });

        it('candid encodes/candid decodes (variant { ok = true })', async () => {
            const candid_string = `(variant { ok = true })`;
            await candid_encode_test(candidEncodingCanister, candid_string);

            const candid_encoded_hex_string = execSync(
                `didc encode '${candid_string}'`
            )
                .toString()
                .trim();
            const candid_encoded_byte_array =
                candid_encoded_hex_string
                    .match(/.{1,2}/g)
                    ?.map((x) => parseInt(x, 16)) ?? [];

            const candid_decoded_result =
                await candidEncodingCanister.candidDecode(
                    Uint8Array.from(candid_encoded_byte_array)
                );

            expect(candid_decoded_result).toMatch('variant');
            expect(candid_decoded_result).toMatch('= true');
        });
    };
}

async function candid_encode_test(
    candid_encoding_canister: ActorSubclass<_SERVICE>,
    candid_string: string
): Promise<void> {
    const candid_encoded_hex_string = execSync(`didc encode '${candid_string}'`)
        .toString()
        .trim();
    const candid_encoded_byte_array =
        candid_encoded_hex_string
            .match(/.{1,2}/g)
            ?.map((x) => parseInt(x, 16)) ?? [];

    const result = await candid_encoding_canister.candidEncode(candid_string);

    expect(Array.from(result)).toStrictEqual(candid_encoded_byte_array);
}

async function candid_decode_test(
    candid_encoding_canister: ActorSubclass<_SERVICE>,
    candid_string: string
): Promise<void> {
    const candid_encoded_hex_string = execSync(`didc encode '${candid_string}'`)
        .toString()
        .trim();
    const candid_encoded_byte_array =
        candid_encoded_hex_string
            .match(/.{1,2}/g)
            ?.map((x) => parseInt(x, 16)) ?? [];

    const result = await candid_encoding_canister.candidDecode(
        Uint8Array.from(candid_encoded_byte_array)
    );

    expect(result).toBe(candid_string);
}
