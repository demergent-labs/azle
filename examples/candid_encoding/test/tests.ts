import { ActorSubclass } from '@dfinity/agent';
import { AzleResult, ok, Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/candid_encoding/candid_encoding.did';

export function get_tests(
    candid_encoding_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'install didc',
            prep: async () => {
                execSync(
                    `cargo install --git https://github.com/dfinity/candid --rev 5d3c7c35da652d145171bc071ac11c63d73bf803 --force didc`,
                    { stdio: 'inherit' }
                );
            }
        },
        {
            name: 'candid_encode/candid_decode ()',
            test: async () => {
                const candid_string = '()';
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        },
        {
            name: 'candid_encode/candid_decode ("hello my friend")',
            test: async () => {
                const candid_string = `("hello my friend")`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (blob "0123456789")',
            test: async () => {
                const candid_string = `(blob "0123456789")`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)',
            test: async () => {
                const candid_string = `(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (170_141_183_460_469_231_731_687_303_715_884_105_727 : int)',
            test: async () => {
                const candid_string = `(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (true)',
            test: async () => {
                const candid_string = `(true)`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (null : null)',
            test: async () => {
                const candid_string = `(null : null)`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (vec { 0 : int8; 1 : int8; 2 : int8 })',
            test: async () => {
                const candid_string = `(vec { 0 : int8; 1 : int8; 2 : int8 })`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (opt (43 : int32))',
            test: async () => {
                const candid_string = `(opt (43 : int32))`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (record { first_name = "John"; last_name = "Doe" })',
            test: async () => {
                const candid_string = `(record { first_name = "John"; last_name = "Doe" })`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

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
                    await candid_encoding_canister.candidDecode(
                        Uint8Array.from(candid_encoded_byte_array)
                    );

                return {
                    Ok:
                        candid_encoded.Ok === true &&
                        candid_decoded_result.includes('record') &&
                        candid_decoded_result.includes('John') &&
                        candid_decoded_result.includes('Doe')
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (variant { ok = true })',
            test: async () => {
                const candid_string = `(variant { ok = true })`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

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
                    await candid_encoding_canister.candidDecode(
                        Uint8Array.from(candid_encoded_byte_array)
                    );

                return {
                    Ok:
                        candid_encoded.Ok === true &&
                        candid_decoded_result.includes('variant') &&
                        candid_decoded_result.includes('= true')
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (func "aaaaa-aa".raw_rand)',
            test: async () => {
                const candid_string = `(func "aaaaa-aa".raw_rand)`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        },
        {
            name: 'candid_encode/candid_decode (principal "rrkah-fqaaa-aaaaa-aaaaq-cai")',
            test: async () => {
                const candid_string = `(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")`;
                const candid_encoded = await candid_encode_test(
                    candid_encoding_canister,
                    candid_string
                );
                const candid_decoded = await candid_decode_test(
                    candid_encoding_canister,
                    candid_string
                );

                if (!ok(candid_encoded)) {
                    return {
                        Err: candid_encoded.Err
                    };
                }

                if (!ok(candid_decoded)) {
                    return {
                        Err: candid_decoded.Err
                    };
                }

                return {
                    Ok: candid_encoded.Ok === true && candid_decoded.Ok === true
                };
            }
        }
    ];
}

async function candid_encode_test(
    candid_encoding_canister: ActorSubclass<_SERVICE>,
    candid_string: string
): Promise<AzleResult<boolean, string>> {
    const candid_encoded_hex_string = execSync(`didc encode '${candid_string}'`)
        .toString()
        .trim();
    const candid_encoded_byte_array =
        candid_encoded_hex_string
            .match(/.{1,2}/g)
            ?.map((x) => parseInt(x, 16)) ?? [];

    const result = await candid_encoding_canister.candidEncode(candid_string);

    return {
        Ok:
            result.length === candid_encoded_byte_array.length &&
            result.every(
                (element, index) => element === candid_encoded_byte_array[index]
            )
    };
}

async function candid_decode_test(
    candid_encoding_canister: ActorSubclass<_SERVICE>,
    candid_string: string
): Promise<AzleResult<boolean, string>> {
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

    return {
        Ok: result === candid_string
    };
}
