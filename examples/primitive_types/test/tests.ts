import { Principal } from '@dfinity/principal';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/primitive_types/primitive_types.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    primitive_types_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get_int',
            test: async () => {
                const result = await primitive_types_canister.get_int();

                return {
                    ok:
                        result ===
                        170_141_183_460_469_231_731_687_303_715_884_105_727n
                };
            }
        },
        {
            name: 'print_int',
            test: async () => {
                const result = await primitive_types_canister.print_int(
                    170_141_183_460_469_231_731_687_303_715_884_105_727n
                );

                return {
                    ok:
                        result ===
                        170_141_183_460_469_231_731_687_303_715_884_105_727n
                };
            }
        },
        {
            name: 'get_int64',
            test: async () => {
                const result = await primitive_types_canister.get_int64();

                return {
                    ok: result === 9_223_372_036_854_775_807n
                };
            }
        },
        {
            name: 'print_int64',
            test: async () => {
                const result = await primitive_types_canister.print_int(
                    9_223_372_036_854_775_807n
                );

                return {
                    ok: result === 9_223_372_036_854_775_807n
                };
            }
        },
        {
            name: 'get_int32',
            test: async () => {
                const result = await primitive_types_canister.get_int32();

                return {
                    ok: result === 2_147_483_647
                };
            }
        },
        {
            name: 'print_int32',
            test: async () => {
                const result = await primitive_types_canister.print_int32(
                    2_147_483_647
                );

                return {
                    ok: result === 2_147_483_647
                };
            }
        },
        {
            name: 'get_int16',
            test: async () => {
                const result = await primitive_types_canister.get_int16();

                return {
                    ok: result === 32_767
                };
            }
        },
        {
            name: 'print_int16',
            test: async () => {
                const result = await primitive_types_canister.print_int16(
                    32_767
                );

                return {
                    ok: result === 32_767
                };
            }
        },
        {
            name: 'get_int8',
            test: async () => {
                const result = await primitive_types_canister.get_int8();

                return {
                    ok: result === 127
                };
            }
        },
        {
            name: 'print_int8',
            test: async () => {
                const result = await primitive_types_canister.print_int8(127);

                return {
                    ok: result === 127
                };
            }
        },
        {
            name: 'get_nat',
            test: async () => {
                const result = await primitive_types_canister.get_nat();

                return {
                    ok:
                        result ===
                        340_282_366_920_938_463_463_374_607_431_768_211_455n
                };
            }
        },
        {
            name: 'print_nat',
            test: async () => {
                const result = await primitive_types_canister.print_nat(
                    340_282_366_920_938_463_463_374_607_431_768_211_455n
                );

                return {
                    ok:
                        result ===
                        340_282_366_920_938_463_463_374_607_431_768_211_455n
                };
            }
        },
        {
            name: 'get_nat64',
            test: async () => {
                const result = await primitive_types_canister.get_nat64();

                return {
                    ok: result === 18_446_744_073_709_551_615n
                };
            }
        },
        {
            name: 'print_nat64',
            test: async () => {
                const result = await primitive_types_canister.print_nat64(
                    18_446_744_073_709_551_615n
                );

                return {
                    ok: result === 18_446_744_073_709_551_615n
                };
            }
        },
        {
            name: 'get_nat32',
            test: async () => {
                const result = await primitive_types_canister.get_nat32();

                return {
                    ok: result === 4_294_967_295
                };
            }
        },
        {
            name: 'print_nat32',
            test: async () => {
                const result = await primitive_types_canister.print_nat32(
                    4_294_967_295
                );

                return {
                    ok: result === 4_294_967_295
                };
            }
        },
        {
            name: 'get_nat16',
            test: async () => {
                const result = await primitive_types_canister.get_nat16();

                return {
                    ok: result === 65_535
                };
            }
        },
        {
            name: 'print_nat16',
            test: async () => {
                const result = await primitive_types_canister.print_nat16(
                    65_535
                );

                return {
                    ok: result === 65_535
                };
            }
        },
        {
            name: 'get_nat8',
            test: async () => {
                const result = await primitive_types_canister.get_nat8();

                return {
                    ok: result === 255
                };
            }
        },
        {
            name: 'print_nat8',
            test: async () => {
                const result = await primitive_types_canister.print_nat8(255);

                return {
                    ok: result === 255
                };
            }
        },
        {
            name: 'get_float64',
            test: async () => {
                const result = await primitive_types_canister.get_float64();

                return {
                    ok: result.toString() === '2.718281828459045'
                };
            }
        },
        {
            name: 'print_float64',
            test: async () => {
                const result = await primitive_types_canister.print_float64(
                    2.718281828459045
                );

                return {
                    ok: result.toString() === '2.718281828459045'
                };
            }
        },
        {
            name: 'get_float32',
            test: async () => {
                const result = await primitive_types_canister.get_float32();

                return {
                    // ok: result.toString() === '3.1415927' // TODO on the command line this is returned
                    ok: result.toString() === '3.1415927410125732'
                };
            }
        },
        {
            name: 'print_float32',
            test: async () => {
                const result = await primitive_types_canister.print_float32(
                    3.1415927
                );

                return {
                    // ok: result.toString() === '3.1415927' // TODO on the command line this is returned
                    ok: result.toString() === '3.1415927410125732'
                };
            }
        },
        {
            name: 'get_principal',
            test: async () => {
                const result = await primitive_types_canister.get_principal();

                return {
                    ok: result.toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        },
        {
            name: 'print_principal',
            test: async () => {
                const result = await primitive_types_canister.print_principal(
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                );

                return {
                    ok: result.toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        },
        {
            name: 'get_null',
            test: async () => {
                const result = await primitive_types_canister.get_null();

                return {
                    ok: result === null
                };
            }
        },
        {
            name: 'print_null',
            test: async () => {
                const result = await primitive_types_canister.print_null(null);

                return {
                    ok: result === null
                };
            }
        },
        {
            name: 'get_reserved',
            test: async () => {
                const result = await primitive_types_canister.get_reserved();

                return {
                    ok: result === null
                };
            }
        },
        {
            name: 'print_reserved',
            test: async () => {
                const result = await primitive_types_canister.print_reserved(
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                );

                return {
                    ok: result === null
                };
            }
        },
        {
            name: 'get_empty',
            test: async () => {
                try {
                    const result = await primitive_types_canister.get_empty();
                } catch (error) {
                    return {
                        ok: (error as any).message.startsWith('Call failed')
                    };
                }

                return {
                    ok: false
                };
            }
        },
        {
            name: 'print_empty',
            test: async () => {
                try {
                    const result = await primitive_types_canister.print_empty(
                        undefined as never
                    );
                } catch (error) {
                    return {
                        ok:
                            (error as any).message ===
                            'Invalid empty argument: undefined'
                    };
                }

                return {
                    ok: false
                };
            }
        }
    ];
}
