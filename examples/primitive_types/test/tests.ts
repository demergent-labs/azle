import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { fail, Test, test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/primitive_types/primitive_types.did';

export function getTests(
    primitiveTypesCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getString',
            test: async () => {
                const result = await primitiveTypesCanister.getString();

                return testEquality(result, 'string');
            }
        },
        {
            name: 'printString',
            test: async () => {
                const result =
                    await primitiveTypesCanister.printString('string');

                return testEquality(result, 'string');
            }
        },
        {
            name: 'getText',
            test: async () => {
                const result = await primitiveTypesCanister.getText();

                return testEquality(result, 'text');
            }
        },
        {
            name: 'printText',
            test: async () => {
                const result = await primitiveTypesCanister.printText('text');

                return testEquality(result, 'text');
            }
        },
        {
            name: 'getNumber',
            test: async () => {
                const result = await primitiveTypesCanister.getNumber();

                return testEquality(result.toString(), '9007199254740991');
            }
        },
        {
            name: 'printNumber',
            test: async () => {
                const result =
                    await primitiveTypesCanister.printNumber(90071992547409.05);

                return testEquality(result.toString(), '90071992547409.05');
            }
        },
        {
            name: 'getInt',
            test: async () => {
                const result = await primitiveTypesCanister.getInt();

                return testEquality(
                    result,
                    170_141_183_460_469_231_731_687_303_715_884_105_727n
                );
            }
        },
        {
            name: 'printInt',
            test: async () => {
                const result =
                    await primitiveTypesCanister.printInt(
                        170_141_183_460_469_231_731_687_303_715_884_105_727n
                    );

                return testEquality(
                    result,
                    170_141_183_460_469_231_731_687_303_715_884_105_727n
                );
            }
        },
        {
            name: 'getInt64',
            test: async () => {
                const result = await primitiveTypesCanister.getInt64();

                return testEquality(result, 9_223_372_036_854_775_807n);
            }
        },
        {
            name: 'printInt64',
            test: async () => {
                const result =
                    await primitiveTypesCanister.printInt(
                        9_223_372_036_854_775_807n
                    );

                return testEquality(result, 9_223_372_036_854_775_807n);
            }
        },
        {
            name: 'getInt32',
            test: async () => {
                const result = await primitiveTypesCanister.getInt32();

                return testEquality(result, 2_147_483_647);
            }
        },
        {
            name: 'printInt32',
            test: async () => {
                const result =
                    await primitiveTypesCanister.printInt32(2_147_483_647);

                return testEquality(result, 2_147_483_647);
            }
        },
        {
            name: 'getInt16',
            test: async () => {
                const result = await primitiveTypesCanister.getInt16();

                return testEquality(result, 32_767);
            }
        },
        {
            name: 'printInt16',
            test: async () => {
                const result = await primitiveTypesCanister.printInt16(32_767);

                return testEquality(result, 32_767);
            }
        },
        {
            name: 'getInt8',
            test: async () => {
                const result = await primitiveTypesCanister.getInt8();

                return testEquality(result, 127);
            }
        },
        {
            name: 'printInt8',
            test: async () => {
                const result = await primitiveTypesCanister.printInt8(127);

                return testEquality(result, 127);
            }
        },
        {
            name: 'getNat',
            test: async () => {
                const result = await primitiveTypesCanister.getNat();

                return testEquality(
                    result,
                    340_282_366_920_938_463_463_374_607_431_768_211_455n
                );
            }
        },
        {
            name: 'printNat',
            test: async () => {
                const result =
                    await primitiveTypesCanister.printNat(
                        340_282_366_920_938_463_463_374_607_431_768_211_455n
                    );

                return testEquality(
                    result,
                    340_282_366_920_938_463_463_374_607_431_768_211_455n
                );
            }
        },
        {
            name: 'getNat64',
            test: async () => {
                const result = await primitiveTypesCanister.getNat64();

                return testEquality(result, 18_446_744_073_709_551_615n);
            }
        },
        {
            name: 'printNat64',
            test: async () => {
                const result =
                    await primitiveTypesCanister.printNat64(
                        18_446_744_073_709_551_615n
                    );

                return testEquality(result, 18_446_744_073_709_551_615n);
            }
        },
        {
            name: 'getNat32',
            test: async () => {
                const result = await primitiveTypesCanister.getNat32();

                return testEquality(result, 4_294_967_295);
            }
        },
        {
            name: 'printNat32',
            test: async () => {
                const result =
                    await primitiveTypesCanister.printNat32(4_294_967_295);

                return testEquality(result, 4_294_967_295);
            }
        },
        {
            name: 'getNat16',
            test: async () => {
                const result = await primitiveTypesCanister.getNat16();

                return testEquality(result, 65_535);
            }
        },
        {
            name: 'printNat16',
            test: async () => {
                const result = await primitiveTypesCanister.printNat16(65_535);

                return testEquality(result, 65_535);
            }
        },
        {
            name: 'getNat8',
            test: async () => {
                const result = await primitiveTypesCanister.getNat8();

                return testEquality(result, 255);
            }
        },
        {
            name: 'printNat8',
            test: async () => {
                const result = await primitiveTypesCanister.printNat8(255);

                return testEquality(result, 255);
            }
        },
        {
            name: 'getFloat64',
            test: async () => {
                const result = await primitiveTypesCanister.getFloat64();

                return testEquality(result.toString(), '2.718281828459045');
            }
        },
        {
            name: 'printFloat64',
            test: async () => {
                const result =
                    await primitiveTypesCanister.printFloat64(
                        2.718281828459045
                    );

                return testEquality(result.toString(), '2.718281828459045');
            }
        },
        {
            name: 'print Float64.Nan',
            test: async () => {
                const result = await primitiveTypesCanister.printFloat64(
                    Number.NaN
                );

                return test(Number.isNaN(result));
            }
        },
        {
            name: 'print positive Float64.Infinity',
            test: async () => {
                const result = await primitiveTypesCanister.printFloat64(
                    Number.POSITIVE_INFINITY
                );

                return test(!Number.isFinite(result));
            }
        },
        {
            name: 'print negative Float64.Infinity',
            test: async () => {
                const result = await primitiveTypesCanister.printFloat64(
                    Number.NEGATIVE_INFINITY
                );

                return test(!Number.isFinite(result));
            }
        },
        {
            name: 'getFloat32',
            test: async () => {
                const result = await primitiveTypesCanister.getFloat32();

                //return testEquality(result.toString(), '3.1415927') // TODO on the command line this is returned
                return testEquality(result.toString(), '3.1415927410125732');
            }
        },
        {
            name: 'printFloat32',
            test: async () => {
                const result =
                    await primitiveTypesCanister.printFloat32(3.1415927);

                // return testEquality(result.toString(),'3.1415927') // TODO on the command line this is returned
                return testEquality(result.toString(), '3.1415927410125732');
            }
        },
        {
            name: 'print Float32.Nan',
            test: async () => {
                const result = await primitiveTypesCanister.printFloat32(
                    Number.NaN
                );

                return test(Number.isNaN(result));
            }
        },
        {
            name: 'print positive Float32.Infinity',
            test: async () => {
                const result = await primitiveTypesCanister.printFloat32(
                    Number.POSITIVE_INFINITY
                );

                return test(!Number.isFinite(result));
            }
        },
        {
            name: 'print negative Float32.Infinity',
            test: async () => {
                const result = await primitiveTypesCanister.printFloat32(
                    Number.NEGATIVE_INFINITY
                );

                return test(!Number.isFinite(result));
            }
        },
        {
            name: 'getBool',
            test: async () => {
                const result = await primitiveTypesCanister.getBool();

                return testEquality(result, true);
            }
        },
        {
            name: 'printBool',
            test: async () => {
                const result = await primitiveTypesCanister.printBool(false);

                return testEquality(result, false);
            }
        },
        {
            name: 'getPrincipal',
            test: async () => {
                const result = await primitiveTypesCanister.getPrincipal();
                const expected = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                return testEquality(result, expected);
            }
        },
        {
            name: 'printPrincipal',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );
                const result =
                    await primitiveTypesCanister.printPrincipal(principal);

                return testEquality(result, principal);
            }
        },
        {
            name: 'getNull',
            test: async () => {
                const result = await primitiveTypesCanister.getNull();

                return testEquality(result, null);
            }
        },
        {
            name: 'printNull',
            test: async () => {
                const result = await primitiveTypesCanister.printNull(null);

                return testEquality(result, null);
            }
        },
        {
            name: 'getReserved',
            test: async () => {
                const result = await primitiveTypesCanister.getReserved();

                return testEquality(result, null);
            }
        },
        {
            name: 'printReserved',
            test: async () => {
                const result = await primitiveTypesCanister.printReserved(
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                );

                return testEquality(result, null);
            }
        },
        {
            name: 'getEmpty',
            test: async () => {
                try {
                    await primitiveTypesCanister.getEmpty();
                } catch (error) {
                    return test(
                        (error as any).message.startsWith('Call failed')
                    );
                }

                return fail();
            }
        },
        {
            name: 'printEmpty',
            test: async () => {
                try {
                    await primitiveTypesCanister.printEmpty(undefined as never);
                } catch (error) {
                    return test(
                        ((error as any).message as string).includes(
                            'Invalid empty argument: undefined'
                        )
                    );
                }

                return fail();
            }
        }
    ];
}
