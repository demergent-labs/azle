import { Principal } from '@dfinity/principal';
import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/tuple_types';

const tuple_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('tuple_types'),
    // TODO https://github.com/demergent-labs/azle/issues/254
    // {
    //     name: 'primitive_one_tuple_return_type',
    //     test: async () => {
    //         const result = await tuple_types_canister.primitive_one_tuple_return_type();

    //         return {
    //             ok: result[0] === 'Hello'
    //         };
    //     }
    // },
    // {
    //     name: 'primitive_one_tuple_param',
    //     test: async () => {
    //         const result = await tuple_types_canister.primitive_one_tuple_param(['Yes']);

    //         return {
    //             ok: result[0] === 'Yes'
    //         };
    //     }
    // },
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
            const result = await tuple_types_canister.primitive_two_tuple_param(
                ['Folly', 6433n]
            );

            return {
                ok: result[0] === 'Folly' && result[1] === 6433n
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
                    41415n,
                    Principal.fromText('aaaaa-aa')
                ]);

            return {
                ok:
                    result[0] === 'Antarctica' &&
                    result[1] === 41415n &&
                    result[2].toText() === 'aaaaa-aa'
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
            const result = await tuple_types_canister.complex_two_tuple_param([
                ['Content-Length', 6422n],
                {
                    id: '1',
                    primitive_two_tuple: ['Content-Type', 64n]
                }
            ]);

            return {
                ok:
                    result[0][0] === 'Content-Length' &&
                    result[0][1] === 6422n &&
                    result[1].id === '1' &&
                    result[1].primitive_two_tuple[0] === 'Content-Type' &&
                    result[1].primitive_two_tuple[1] === 64n
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
            const result = await tuple_types_canister.complex_three_tuple_param(
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
                                primitive_two_tuple: ['Content-Type', 64n]
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
                await tuple_types_canister.tuple_array_params_and_return_type([
                    ['Content-Type', 'application/json'],
                    ['Accept-Ranges', 'bytes']
                ]);

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
    }
];

run_tests(tests);
