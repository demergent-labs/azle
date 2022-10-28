import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/tuple_types/tuple_types.did';

export function get_tests(
    tuple_types_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'primitive_one_tuple_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_one_tuple_return_type();

                return {
                    ok: result[0] === 'Hello'
                };
            }
        },
        {
            name: 'primitive_one_tuple_param',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_one_tuple_param([
                        'Yes'
                    ]);

                return {
                    ok: result[0] === 'Yes'
                };
            }
        },
        {
            name: 'primitive_one_tuple_inline_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_one_tuple_inline_return_type();

                return {
                    ok: result[0] === 'Greenland'
                };
            }
        },
        {
            name: 'primitive_one_tuple_inline_param',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_one_tuple_inline_param(
                        ['Rocks']
                    );

                return {
                    ok: result[0] === 'Rocks'
                };
            }
        },
        {
            name: 'primitive_two_tuple_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_two_tuple_return_type();

                return {
                    ok: result[0] === 'Content-Type' && result[1] === 64n
                };
            }
        },
        {
            name: 'primitive_two_tuple_param',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_two_tuple_param([
                        'Folly',
                        6_433n
                    ]);

                return {
                    ok: result[0] === 'Folly' && result[1] === 6433n
                };
            }
        },
        {
            name: 'primitive_two_tuple_inline_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_two_tuple_inline_return_type();

                return {
                    ok: result[0] === 'Fun' && result[1] === 'Times'
                };
            }
        },
        {
            name: 'primitive_two_tuple_inline_param',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_two_tuple_inline_param(
                        ['Great', 'Days']
                    );

                return {
                    ok: result[0] === 'Great' && result[1] === 'Days'
                };
            }
        },
        {
            name: 'primitive_three_tuple_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_three_tuple_return_type();

                return {
                    ok:
                        result[0] === 'Good' &&
                        result[1] === 454n &&
                        result[2].toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        },
        {
            name: 'primitive_three_tuple_param',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_three_tuple_param([
                        'Antarctica',
                        41_415n,
                        Principal.fromText('aaaaa-aa')
                    ]);

                return {
                    ok:
                        result[0] === 'Antarctica' &&
                        result[1] === 41_415n &&
                        result[2].toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'primitive_three_tuple_inline_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_three_tuple_inline_return_type();

                return {
                    ok:
                        result[0] === 'Fun' &&
                        result[1] === 101n &&
                        result[2].toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'primitive_three_tuple_inline_param',
            test: async () => {
                const result =
                    await tuple_types_canister.primitive_three_tuple_inline_param(
                        ['Great', 300n, Principal.fromText('aaaaa-aa')]
                    );

                return {
                    ok:
                        result[0] === 'Great' &&
                        result[1] === 300n &&
                        result[2].toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'complex_one_tuple_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_one_tuple_return_type();

                return {
                    ok: result[0][0] === 'Hello' && result[0][1] === 0n
                };
            }
        },
        {
            name: 'complex_one_tuple_param',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_one_tuple_param([
                        ['Goodbye', 1n]
                    ]);

                return {
                    ok: result[0][0] === 'Goodbye' && result[0][1] === 1n
                };
            }
        },
        {
            name: 'complex_one_tuple_inline_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_one_tuple_inline_return_type();

                return {
                    ok: result[0][0] === 'Candy' && result[0][1] === 56n
                };
            }
        },
        {
            name: 'complex_one_tuple_inline_param',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_one_tuple_inline_param([
                        ['Mountain', 76n]
                    ]);

                return {
                    ok: result[0][0] === 'Mountain' && result[0][1] === 76n
                };
            }
        },
        {
            name: 'complex_two_tuple_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_two_tuple_return_type();

                return {
                    ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 64n &&
                        result[1].id === '0' &&
                        result[1].primitive_two_tuple[0] === 'Content-Type' &&
                        result[1].primitive_two_tuple[1] === 64n
                };
            }
        },
        {
            name: 'complex_two_tuple_param',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_two_tuple_param([
                        ['Content-Length', 6_422n],
                        {
                            id: '1',
                            primitive_two_tuple: ['Content-Type', 64n]
                        }
                    ]);

                return {
                    ok:
                        result[0][0] === 'Content-Length' &&
                        result[0][1] === 6_422n &&
                        result[1].id === '1' &&
                        result[1].primitive_two_tuple[0] === 'Content-Type' &&
                        result[1].primitive_two_tuple[1] === 64n
                };
            }
        },
        {
            name: 'complex_two_tuple_inline_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_two_tuple_inline_return_type();

                return {
                    ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 644n &&
                        result[1].id === '444' &&
                        result[1].primitive_two_tuple[0] === 'Content-Type' &&
                        result[1].primitive_two_tuple[1] === 6_422n
                };
            }
        },
        {
            name: 'complex_two_tuple_inline_param',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_two_tuple_inline_param([
                        ['Content-Length', 6_422n],
                        {
                            id: '133',
                            primitive_two_tuple: ['Content-Type', 6_224n]
                        }
                    ]);

                return {
                    ok:
                        result[0][0] === 'Content-Length' &&
                        result[0][1] === 6_422n &&
                        result[1].id === '133' &&
                        result[1].primitive_two_tuple[0] === 'Content-Type' &&
                        result[1].primitive_two_tuple[1] === 6_224n
                };
            }
        },
        {
            name: 'complex_three_tuple_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_three_tuple_return_type();

                return {
                    ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 64n &&
                        result[1].id === '0' &&
                        result[1].primitive_two_tuple[0] === 'Content-Type' &&
                        result[1].primitive_two_tuple[1] === 64n &&
                        'Bad' in result[2] &&
                        result[2].Bad[0][0] === 'Content-Type' &&
                        result[2].Bad[0][1] === 64n &&
                        result[2].Bad[1].id === '1' &&
                        result[2].Bad[1].primitive_two_tuple[0] ===
                            'Content-Type' &&
                        result[2].Bad[1].primitive_two_tuple[1] === 64n &&
                        'Good' in result[2].Bad[2]
                };
            }
        },
        {
            name: 'complex_three_tuple_param',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_three_tuple_param([
                        ['Content-Type', 64n],
                        {
                            id: '0',
                            primitive_two_tuple: ['Content-Type', 64n]
                        },
                        {
                            Bad: [
                                ['Content-Type', 64n],
                                {
                                    id: '1',
                                    primitive_two_tuple: ['Content-Type', 64n]
                                },
                                {
                                    Good: null
                                }
                            ]
                        }
                    ]);

                return {
                    ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 64n &&
                        result[1].id === '0' &&
                        result[1].primitive_two_tuple[0] === 'Content-Type' &&
                        result[1].primitive_two_tuple[1] === 64n &&
                        'Bad' in result[2] &&
                        result[2].Bad[0][0] === 'Content-Type' &&
                        result[2].Bad[0][1] === 64n &&
                        result[2].Bad[1].id === '1' &&
                        result[2].Bad[1].primitive_two_tuple[0] ===
                            'Content-Type' &&
                        result[2].Bad[1].primitive_two_tuple[1] === 64n &&
                        'Good' in result[2].Bad[2]
                };
            }
        },
        {
            name: 'complex_three_tuple_inline_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_three_tuple_inline_return_type();

                return {
                    ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 64n &&
                        result[1].id === '0' &&
                        result[1].primitive_two_tuple[0] === 'Content-Type' &&
                        result[1].primitive_two_tuple[1] === 64n &&
                        'Bad' in result[2] &&
                        result[2].Bad[0][0] === 'Content-Type' &&
                        result[2].Bad[0][1] === 64n &&
                        result[2].Bad[1].id === '1' &&
                        result[2].Bad[1].primitive_two_tuple[0] ===
                            'Content-Type' &&
                        result[2].Bad[1].primitive_two_tuple[1] === 64n &&
                        'Good' in result[2].Bad[2]
                };
            }
        },
        {
            name: 'complex_three_tuple_inline_param',
            test: async () => {
                const result =
                    await tuple_types_canister.complex_three_tuple_inline_param(
                        [
                            ['Content-Type', 64n],
                            {
                                id: '0',
                                primitive_two_tuple: ['Content-Type', 64n]
                            },
                            {
                                Bad: [
                                    ['Content-Type', 64n],
                                    {
                                        id: '1',
                                        primitive_two_tuple: [
                                            'Content-Type',
                                            64n
                                        ]
                                    },
                                    {
                                        Good: null
                                    }
                                ]
                            }
                        ]
                    );

                return {
                    ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 64n &&
                        result[1].id === '0' &&
                        result[1].primitive_two_tuple[0] === 'Content-Type' &&
                        result[1].primitive_two_tuple[1] === 64n &&
                        'Bad' in result[2] &&
                        result[2].Bad[0][0] === 'Content-Type' &&
                        result[2].Bad[0][1] === 64n &&
                        result[2].Bad[1].id === '1' &&
                        result[2].Bad[1].primitive_two_tuple[0] ===
                            'Content-Type' &&
                        result[2].Bad[1].primitive_two_tuple[1] === 64n &&
                        'Good' in result[2].Bad[2]
                };
            }
        },
        {
            name: 'tuple_array_params_and_return_type',
            test: async () => {
                const result =
                    await tuple_types_canister.tuple_array_params_and_return_type(
                        [
                            ['Content-Type', 'application/json'],
                            ['Accept-Ranges', 'bytes']
                        ]
                    );

                return {
                    ok:
                        result[0][0] === 'Content-Type' &&
                        result[0][1] === 'application/json' &&
                        result[1][0] === 'Accept-Ranges' &&
                        result[1][1] === 'bytes'
                };
            }
        },
        {
            name: 'tuple_array_record_field',
            test: async () => {
                const result =
                    await tuple_types_canister.tuple_array_record_field();

                return {
                    ok:
                        result.headers[0][0] === 'Content-Type' &&
                        result.headers[0][1] === 'application/json' &&
                        result.headers[1][0] === 'Accept-Ranges' &&
                        result.headers[1][1] === 'bytes'
                };
            }
        },
        {
            name: 'tuple_array_variant_field',
            test: async () => {
                const result =
                    await tuple_types_canister.tuple_array_variant_field();

                return {
                    ok:
                        'with_headers' in result &&
                        result.with_headers[0][0] === 'Content-Type' &&
                        result.with_headers[0][1] === 'application/json' &&
                        result.with_headers[1][0] === 'Accept-Ranges' &&
                        result.with_headers[1][1] === 'bytes'
                };
            }
        },
        {
            name: 'two_tuple_with_inline_records',
            test: async () => {
                const result =
                    await tuple_types_canister.two_tuple_with_inline_records([
                        {
                            hello: 0n
                        },
                        {
                            goodbye: 1n
                        }
                    ]);

                return {
                    ok: result[0].hello === 0n && result[1].goodbye === 1n
                };
            }
        }
    ];
}
