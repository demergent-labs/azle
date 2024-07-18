import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/primitive_types/primitive_types.did';

export function getTests(
    primitiveTypesCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('getString', async () => {
            const result = await primitiveTypesCanister.getString();

            expect(result).toBe('string');
        });

        it('printString', async () => {
            const result = await primitiveTypesCanister.printString('string');

            expect(result).toBe('string');
        });

        it('getText', async () => {
            const result = await primitiveTypesCanister.getText();

            expect(result).toBe('text');
        });

        it('printText', async () => {
            const result = await primitiveTypesCanister.printText('text');

            expect(result).toBe('text');
        });

        it('getNumber', async () => {
            const result = await primitiveTypesCanister.getNumber();

            expect(result.toString()).toBe('9007199254740991');
        });

        it('printNumber', async () => {
            const result =
                await primitiveTypesCanister.printNumber(90071992547409.05);

            expect(result.toString()).toBe('90071992547409.05');
        });

        it('getInt', async () => {
            const result = await primitiveTypesCanister.getInt();

            expect(result).toBe(
                170_141_183_460_469_231_731_687_303_715_884_105_727n
            );
        });

        it('printInt', async () => {
            const result =
                await primitiveTypesCanister.printInt(
                    170_141_183_460_469_231_731_687_303_715_884_105_727n
                );

            expect(result).toBe(
                170_141_183_460_469_231_731_687_303_715_884_105_727n
            );
        });

        it('getInt64', async () => {
            const result = await primitiveTypesCanister.getInt64();

            expect(result).toBe(9_223_372_036_854_775_807n);
        });

        it('printInt64', async () => {
            const result =
                await primitiveTypesCanister.printInt(
                    9_223_372_036_854_775_807n
                );

            expect(result).toBe(9_223_372_036_854_775_807n);
        });

        it('getInt32', async () => {
            const result = await primitiveTypesCanister.getInt32();

            expect(result).toBe(2_147_483_647);
        });

        it('printInt32', async () => {
            const result =
                await primitiveTypesCanister.printInt32(2_147_483_647);

            expect(result).toBe(2_147_483_647);
        });

        it('getInt16', async () => {
            const result = await primitiveTypesCanister.getInt16();

            expect(result).toBe(32_767);
        });

        it('printInt16', async () => {
            const result = await primitiveTypesCanister.printInt16(32_767);

            expect(result).toBe(32_767);
        });

        it('getInt8', async () => {
            const result = await primitiveTypesCanister.getInt8();

            expect(result).toBe(127);
        });

        it('printInt8', async () => {
            const result = await primitiveTypesCanister.printInt8(127);

            expect(result).toBe(127);
        });

        it('getNat', async () => {
            const result = await primitiveTypesCanister.getNat();

            expect(result).toBe(
                340_282_366_920_938_463_463_374_607_431_768_211_455n
            );
        });

        it('printNat', async () => {
            const result =
                await primitiveTypesCanister.printNat(
                    340_282_366_920_938_463_463_374_607_431_768_211_455n
                );

            expect(result).toBe(
                340_282_366_920_938_463_463_374_607_431_768_211_455n
            );
        });

        it('getNat64', async () => {
            const result = await primitiveTypesCanister.getNat64();

            expect(result).toBe(18_446_744_073_709_551_615n);
        });

        it('printNat64', async () => {
            const result =
                await primitiveTypesCanister.printNat64(
                    18_446_744_073_709_551_615n
                );

            expect(result).toBe(18_446_744_073_709_551_615n);
        });

        it('getNat32', async () => {
            const result = await primitiveTypesCanister.getNat32();

            expect(result).toBe(4_294_967_295);
        });

        it('printNat32', async () => {
            const result =
                await primitiveTypesCanister.printNat32(4_294_967_295);

            expect(result).toBe(4_294_967_295);
        });

        it('getNat16', async () => {
            const result = await primitiveTypesCanister.getNat16();

            expect(result).toBe(65_535);
        });

        it('printNat16', async () => {
            const result = await primitiveTypesCanister.printNat16(65_535);

            expect(result).toBe(65_535);
        });

        it('getNat8', async () => {
            const result = await primitiveTypesCanister.getNat8();

            expect(result).toBe(255);
        });

        it('printNat8', async () => {
            const result = await primitiveTypesCanister.printNat8(255);

            expect(result).toBe(255);
        });

        it('getFloat64', async () => {
            const result = await primitiveTypesCanister.getFloat64();

            expect(result.toString()).toBe('2.718281828459045');
        });

        it('printFloat64', async () => {
            const result =
                await primitiveTypesCanister.printFloat64(2.718281828459045);

            expect(result.toString()).toBe('2.718281828459045');
        });

        it('print Float64.Nan', async () => {
            const result = await primitiveTypesCanister.printFloat64(
                Number.NaN
            );

            expect(result).toBeNaN();
        });

        it('print positive Float64.Infinity', async () => {
            const result = await primitiveTypesCanister.printFloat64(
                Number.POSITIVE_INFINITY
            );

            expect(result).toBe(Infinity);
        });

        it('print negative Float64.Infinity', async () => {
            const result = await primitiveTypesCanister.printFloat64(
                Number.NEGATIVE_INFINITY
            );

            expect(result).toBe(-Infinity);
        });

        it('getFloat32', async () => {
            const result = await primitiveTypesCanister.getFloat32();

            // expect(result.toString()).toBe('3.1415927') // TODO on the command line this is returned
            expect(result.toString()).toBe('3.1415927410125732');
        });

        it('printFloat32', async () => {
            const result = await primitiveTypesCanister.printFloat32(3.1415927);

            // expect(result.toString()).toBe('3.1415927') // TODO on the command line this is returned
            expect(result.toString()).toBe('3.1415927410125732');
        });

        it('print Float32.Nan', async () => {
            const result = await primitiveTypesCanister.printFloat32(
                Number.NaN
            );

            expect(result).toBeNaN();
        });

        it('print positive Float32.Infinity', async () => {
            const result = await primitiveTypesCanister.printFloat32(
                Number.POSITIVE_INFINITY
            );

            expect(result).toBe(Infinity);
        });

        it('print negative Float32.Infinity', async () => {
            const result = await primitiveTypesCanister.printFloat32(
                Number.NEGATIVE_INFINITY
            );

            expect(result).toBe(-Infinity);
        });

        it('getBool', async () => {
            const result = await primitiveTypesCanister.getBool();

            expect(result).toBe(true);
        });

        it('printBool', async () => {
            const result = await primitiveTypesCanister.printBool(false);

            expect(result).toBe(false);
        });

        it('getPrincipal', async () => {
            const result = await primitiveTypesCanister.getPrincipal();

            expect(result.toText()).toBe('rrkah-fqaaa-aaaaa-aaaaq-cai');
        });

        it('printPrincipal', async () => {
            const result = await primitiveTypesCanister.printPrincipal(
                Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
            );

            expect(result.toText()).toBe('rrkah-fqaaa-aaaaa-aaaaq-cai');
        });

        it('getNull', async () => {
            const result = await primitiveTypesCanister.getNull();

            expect(result).toBeNull();
        });

        it('printNull', async () => {
            const result = await primitiveTypesCanister.printNull(null);

            expect(result).toBeNull();
        });

        it('getReserved', async () => {
            const result = await primitiveTypesCanister.getReserved();

            expect(result).toBeNull();
        });

        it('printReserved', async () => {
            const result = await primitiveTypesCanister.printReserved(
                Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
            );

            expect(result).toBeNull();
        });

        it('getEmpty', async () => {
            const rejectionMessage = 'Anything you want';
            const canisterId = '[a-z2-7-]{27}';
            const expectedErrorMessage = new RegExp(
                `Call failed:\\s*Canister: ${canisterId}\\s*Method: getEmpty \\(query\\)\\s*"Status": "rejected"\\s*"Code": "CanisterError"\\s*"Message": "IC0503: Error from Canister ${canisterId}: Canister called \`ic0.trap\` with message: Uncaught Error: ${rejectionMessage}.*"`
            );
            await expect(primitiveTypesCanister.getEmpty()).rejects.toThrow(
                expectedErrorMessage
            );
        });

        it('printEmpty', async () => {
            await expect(
                primitiveTypesCanister.printEmpty(undefined as never)
            ).rejects.toThrow(/Invalid empty argument: undefined/);
        });
    };
}
