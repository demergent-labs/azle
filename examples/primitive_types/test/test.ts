import { Principal } from '@dfinity/principal';
import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/primitive_types';

const primitive_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('primitive_types'),
    {
        name: 'getInt',
        test: async () => {
            const result = await primitive_types_canister.getInt();

            return {
                ok:
                    result ===
                    170_141_183_460_469_231_731_687_303_715_884_105_727n
            };
        }
    },
    {
        name: 'printInt',
        test: async () => {
            const result = await primitive_types_canister.printInt(
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
        name: 'getInt64',
        test: async () => {
            const result = await primitive_types_canister.getInt64();

            return {
                ok: result === 9_223_372_036_854_775_807n
            };
        }
    },
    {
        name: 'printInt64',
        test: async () => {
            const result = await primitive_types_canister.printInt(
                9_223_372_036_854_775_807n
            );

            return {
                ok: result === 9_223_372_036_854_775_807n
            };
        }
    },
    {
        name: 'getInt32',
        test: async () => {
            const result = await primitive_types_canister.getInt32();

            return {
                ok: result === 2_147_483_647
            };
        }
    },
    {
        name: 'printInt32',
        test: async () => {
            const result = await primitive_types_canister.printInt32(
                2_147_483_647
            );

            return {
                ok: result === 2_147_483_647
            };
        }
    },
    {
        name: 'getInt16',
        test: async () => {
            const result = await primitive_types_canister.getInt16();

            return {
                ok: result === 32_767
            };
        }
    },
    {
        name: 'printInt16',
        test: async () => {
            const result = await primitive_types_canister.printInt16(32_767);

            return {
                ok: result === 32_767
            };
        }
    },
    {
        name: 'getInt8',
        test: async () => {
            const result = await primitive_types_canister.getInt8();

            return {
                ok: result === 127
            };
        }
    },
    {
        name: 'printInt8',
        test: async () => {
            const result = await primitive_types_canister.printInt8(127);

            return {
                ok: result === 127
            };
        }
    },
    {
        name: 'getNat',
        test: async () => {
            const result = await primitive_types_canister.getNat();

            return {
                ok:
                    result ===
                    340_282_366_920_938_463_463_374_607_431_768_211_455n
            };
        }
    },
    {
        name: 'printNat',
        test: async () => {
            const result = await primitive_types_canister.printNat(
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
        name: 'getNat64',
        test: async () => {
            const result = await primitive_types_canister.getNat64();

            return {
                ok: result === 18_446_744_073_709_551_615n
            };
        }
    },
    {
        name: 'printNat64',
        test: async () => {
            const result = await primitive_types_canister.printNat64(
                18_446_744_073_709_551_615n
            );

            return {
                ok: result === 18_446_744_073_709_551_615n
            };
        }
    },
    {
        name: 'getNat32',
        test: async () => {
            const result = await primitive_types_canister.getNat32();

            return {
                ok: result === 4_294_967_295
            };
        }
    },
    {
        name: 'printNat32',
        test: async () => {
            const result = await primitive_types_canister.printNat32(
                4_294_967_295
            );

            return {
                ok: result === 4_294_967_295
            };
        }
    },
    {
        name: 'getNat16',
        test: async () => {
            const result = await primitive_types_canister.getNat16();

            return {
                ok: result === 65_535
            };
        }
    },
    {
        name: 'printNat16',
        test: async () => {
            const result = await primitive_types_canister.printNat16(65_535);

            return {
                ok: result === 65_535
            };
        }
    },
    {
        name: 'getNat8',
        test: async () => {
            const result = await primitive_types_canister.getNat8();

            return {
                ok: result === 255
            };
        }
    },
    {
        name: 'printNat8',
        test: async () => {
            const result = await primitive_types_canister.printNat8(255);

            return {
                ok: result === 255
            };
        }
    },
    {
        name: 'getFloat64',
        test: async () => {
            const result = await primitive_types_canister.getFloat64();

            return {
                ok: result.toString() === '2.718281828459045'
            };
        }
    },
    {
        name: 'printFloat64',
        test: async () => {
            const result = await primitive_types_canister.printFloat64(
                2.718281828459045
            );

            return {
                ok: result.toString() === '2.718281828459045'
            };
        }
    },
    {
        name: 'getFloat32',
        test: async () => {
            const result = await primitive_types_canister.getFloat32();

            return {
                // ok: result.toString() === '3.1415927' // TODO on the command line this is returned
                ok: result.toString() === '3.1415927410125732'
            };
        }
    },
    {
        name: 'printFloat32',
        test: async () => {
            const result = await primitive_types_canister.printFloat32(
                3.1415927
            );

            return {
                // ok: result.toString() === '3.1415927' // TODO on the command line this is returned
                ok: result.toString() === '3.1415927410125732'
            };
        }
    },
    {
        name: 'getPrincipal',
        test: async () => {
            const result = await primitive_types_canister.getPrincipal();

            return {
                ok: result.toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
            };
        }
    },
    {
        name: 'printPrincipal',
        test: async () => {
            const result = await primitive_types_canister.printPrincipal(
                Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
            );

            return {
                ok: result.toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
            };
        }
    },
    {
        name: 'getNull',
        test: async () => {
            const result = await primitive_types_canister.getNull();

            return {
                ok: result === null
            };
        }
    },
    {
        name: 'printNull',
        test: async () => {
            const result = await primitive_types_canister.printNull(null);

            return {
                ok: result === null
            };
        }
    },
    {
        name: 'getReserved',
        test: async () => {
            const result = await primitive_types_canister.getReserved();

            return {
                ok: result === null
            };
        }
    },
    {
        name: 'printReserved',
        test: async () => {
            const result = await primitive_types_canister.printReserved(
                Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
            );

            return {
                ok: result === null
            };
        }
    },
    {
        name: 'getEmpty',
        test: async () => {
            try {
                const result = await primitive_types_canister.getEmpty();
            } catch (error) {
                return {
                    ok: error.message.startsWith('Call failed')
                };
            }

            return {
                ok: false
            };
        }
    },
    {
        name: 'printEmpty',
        test: async () => {
            try {
                const result = await primitive_types_canister.printEmpty(
                    undefined
                );
            } catch (error) {
                return {
                    ok: error.message === 'Invalid empty argument: undefined'
                };
            }

            return {
                ok: false
            };
        }
    }
];

run_tests(tests);
