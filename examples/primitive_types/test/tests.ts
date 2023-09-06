import { Principal } from '@dfinity/principal';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/primitive_types/primitive_types.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    primitiveTypesCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getString',
            test: async () => {
                const result = await primitiveTypesCanister.getString();

                return {
                    Ok: result === 'string'
                };
            }
        },
        {
            name: 'printString',
            test: async () => {
                const result = await primitiveTypesCanister.printString(
                    'string'
                );

                return {
                    Ok: result === 'string'
                };
            }
        },
        {
            name: 'getText',
            test: async () => {
                const result = await primitiveTypesCanister.getText();

                return {
                    Ok: result === 'text'
                };
            }
        },
        {
            name: 'printText',
            test: async () => {
                const result = await primitiveTypesCanister.printText('text');

                return {
                    Ok: result === 'text'
                };
            }
        },
        {
            name: 'getNumber',
            test: async () => {
                const result = await primitiveTypesCanister.getNumber();

                return {
                    Ok: result.toString() === '9007199254740991'
                };
            }
        },
        {
            name: 'printNumber',
            test: async () => {
                const result = await primitiveTypesCanister.printNumber(
                    90071992547409.05
                );

                return {
                    Ok: result.toString() === '90071992547409.05'
                };
            }
        },
        {
            name: 'getInt',
            test: async () => {
                const result = await primitiveTypesCanister.getInt();

                return {
                    Ok:
                        result ===
                        170_141_183_460_469_231_731_687_303_715_884_105_727n
                };
            }
        },
        {
            name: 'printInt',
            test: async () => {
                const result = await primitiveTypesCanister.printInt(
                    170_141_183_460_469_231_731_687_303_715_884_105_727n
                );

                return {
                    Ok:
                        result ===
                        170_141_183_460_469_231_731_687_303_715_884_105_727n
                };
            }
        },
        {
            name: 'getInt64',
            test: async () => {
                const result = await primitiveTypesCanister.getInt64();

                return {
                    Ok: result === 9_223_372_036_854_775_807n
                };
            }
        },
        {
            name: 'printInt64',
            test: async () => {
                const result = await primitiveTypesCanister.printInt(
                    9_223_372_036_854_775_807n
                );

                return {
                    Ok: result === 9_223_372_036_854_775_807n
                };
            }
        },
        {
            name: 'getInt32',
            test: async () => {
                const result = await primitiveTypesCanister.getInt32();

                return {
                    Ok: result === 2_147_483_647
                };
            }
        },
        {
            name: 'printInt32',
            test: async () => {
                const result = await primitiveTypesCanister.printInt32(
                    2_147_483_647
                );

                return {
                    Ok: result === 2_147_483_647
                };
            }
        },
        {
            name: 'getInt16',
            test: async () => {
                const result = await primitiveTypesCanister.getInt16();

                return {
                    Ok: result === 32_767
                };
            }
        },
        {
            name: 'printInt16',
            test: async () => {
                const result = await primitiveTypesCanister.printInt16(32_767);

                return {
                    Ok: result === 32_767
                };
            }
        },
        {
            name: 'getInt8',
            test: async () => {
                const result = await primitiveTypesCanister.getInt8();

                return {
                    Ok: result === 127
                };
            }
        },
        {
            name: 'printInt8',
            test: async () => {
                const result = await primitiveTypesCanister.printInt8(127);

                return {
                    Ok: result === 127
                };
            }
        },
        {
            name: 'getNat',
            test: async () => {
                const result = await primitiveTypesCanister.getNat();

                return {
                    Ok:
                        result ===
                        340_282_366_920_938_463_463_374_607_431_768_211_455n
                };
            }
        },
        {
            name: 'printNat',
            test: async () => {
                const result = await primitiveTypesCanister.printNat(
                    340_282_366_920_938_463_463_374_607_431_768_211_455n
                );

                return {
                    Ok:
                        result ===
                        340_282_366_920_938_463_463_374_607_431_768_211_455n
                };
            }
        },
        {
            name: 'getNat64',
            test: async () => {
                const result = await primitiveTypesCanister.getNat64();

                return {
                    Ok: result === 18_446_744_073_709_551_615n
                };
            }
        },
        {
            name: 'printNat64',
            test: async () => {
                const result = await primitiveTypesCanister.printNat64(
                    18_446_744_073_709_551_615n
                );

                return {
                    Ok: result === 18_446_744_073_709_551_615n
                };
            }
        },
        {
            name: 'getNat32',
            test: async () => {
                const result = await primitiveTypesCanister.getNat32();

                return {
                    Ok: result === 4_294_967_295
                };
            }
        },
        {
            name: 'printNat32',
            test: async () => {
                const result = await primitiveTypesCanister.printNat32(
                    4_294_967_295
                );

                return {
                    Ok: result === 4_294_967_295
                };
            }
        },
        {
            name: 'getNat16',
            test: async () => {
                const result = await primitiveTypesCanister.getNat16();

                return {
                    Ok: result === 65_535
                };
            }
        },
        {
            name: 'printNat16',
            test: async () => {
                const result = await primitiveTypesCanister.printNat16(65_535);

                return {
                    Ok: result === 65_535
                };
            }
        },
        {
            name: 'getNat8',
            test: async () => {
                const result = await primitiveTypesCanister.getNat8();

                return {
                    Ok: result === 255
                };
            }
        },
        {
            name: 'printNat8',
            test: async () => {
                const result = await primitiveTypesCanister.printNat8(255);

                return {
                    Ok: result === 255
                };
            }
        },
        {
            name: 'getFloat64',
            test: async () => {
                const result = await primitiveTypesCanister.getFloat64();

                return {
                    Ok: result.toString() === '2.718281828459045'
                };
            }
        },
        {
            name: 'printFloat64',
            test: async () => {
                const result = await primitiveTypesCanister.printFloat64(
                    2.718281828459045
                );

                return {
                    Ok: result.toString() === '2.718281828459045'
                };
            }
        },
        {
            name: 'getFloat32',
            test: async () => {
                const result = await primitiveTypesCanister.getFloat32();

                return {
                    // Ok: result.toString() === '3.1415927' // TODO on the command line this is returned
                    Ok: result.toString() === '3.1415927410125732'
                };
            }
        },
        {
            name: 'printFloat32',
            test: async () => {
                const result = await primitiveTypesCanister.printFloat32(
                    3.1415927
                );

                return {
                    // Ok: result.toString() === '3.1415927' // TODO on the command line this is returned
                    Ok: result.toString() === '3.1415927410125732'
                };
            }
        },
        {
            name: 'getBool',
            test: async () => {
                const result = await primitiveTypesCanister.getBool();

                return {
                    Ok: result === true
                };
            }
        },
        {
            name: 'printBool',
            test: async () => {
                const result = await primitiveTypesCanister.printBool(false);

                return {
                    Ok: result === false
                };
            }
        },
        {
            name: 'getPrincipal',
            test: async () => {
                const result = await primitiveTypesCanister.getPrincipal();

                return {
                    Ok: result.toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        },
        {
            name: 'printPrincipal',
            test: async () => {
                const result = await primitiveTypesCanister.printPrincipal(
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                );

                return {
                    Ok: result.toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        },
        {
            name: 'getNull',
            test: async () => {
                const result = await primitiveTypesCanister.getNull();

                return {
                    Ok: result === null
                };
            }
        },
        {
            name: 'printNull',
            test: async () => {
                const result = await primitiveTypesCanister.printNull(null);

                return {
                    Ok: result === null
                };
            }
        },
        {
            name: 'getReserved',
            test: async () => {
                const result = await primitiveTypesCanister.getReserved();

                return {
                    Ok: result === null
                };
            }
        },
        {
            name: 'printReserved',
            test: async () => {
                const result = await primitiveTypesCanister.printReserved(
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                );

                return {
                    Ok: result === null
                };
            }
        },
        {
            name: 'getEmpty',
            test: async () => {
                try {
                    const result = await primitiveTypesCanister.getEmpty();
                } catch (error) {
                    return {
                        Ok: (error as any).message.startsWith('Call failed')
                    };
                }

                return {
                    Ok: false
                };
            }
        },
        {
            name: 'printEmpty',
            test: async () => {
                try {
                    const result = await primitiveTypesCanister.printEmpty(
                        undefined as never
                    );
                } catch (error) {
                    return {
                        Ok: ((error as any).message as string).includes(
                            'Invalid empty argument: undefined'
                        )
                    };
                }

                return {
                    Ok: false
                };
            }
        }
    ];
}
