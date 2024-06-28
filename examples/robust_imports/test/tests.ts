import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { describe } from '@jest/globals';
import { expect, it, please, Test } from 'azle/test';
import { execSync } from 'child_process';

import { _SERVICE } from '../dfx_generated/robust_imports/robust_imports.did';

export function getTests(robustImportsCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        describe('', getImportCoverageTests(robustImportsCanister));
        describe('', getAzleCoverageTests(robustImportsCanister));
        describe('', getTypeAliasDeclTests(robustImportsCanister));
        describe('', getTsPrimAliasTest(robustImportsCanister));
    };
}

/**
 * The process of robust imports is in two stages.
 * Stage 1 is making the table that tells us which aliases come from map to Azle
 * types.
 * Stage 2 is using that table in azle to correctly parse each file.
 */

/**
 * The import coverage tests test to make sure that stage 1 is working properly,
 * that means it tests that we are handling all different types of imports and
 * exports.
 *
 * @param ic
 * @returns
 */
function getImportCoverageTests(ic: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('myVariantToMyDeepVariant', async () => {
            const result = await ic.myVariantToMyDeepVariant({ Thing: 7 });

            expect(result.Thing).toBe(7);
        });

        it('myFathomlessVariantToMyCavernousVariant', async () => {
            const result = await ic.myFathomlessVariantToMyCavernousVariant({
                MyInt8: 7
            });

            expect(result).toStrictEqual({ eight: null });
        });

        it('returnsVec', async () => {
            expect((await ic.returnVec())[1][3]).toBe(7);
        });

        it('returnsFathomlessVec', async () => {
            expect((await ic.returnFathomlessVec())[6]).toBe(7);
        });

        it('returnWeird', async () => {
            expect(await ic.returnWeird()).toBe(-10_000n);
        });

        it('returnFathomlessCanister', async () => {
            const result = execSync(
                `dfx canister call robust_imports returnFathomlessCanister '(service "aaaaa-aa")'`
            )
                .toString()
                .trim();

            expect(result).toBe('(service "aaaaa-aa")');
        });

        it('makeCavernousRecord', async () => {
            const result = await ic.makeCavernousRecord();
            const expectedResult = {
                coveredRecord: {
                    count: 10,
                    name: 'Bob',
                    type_name: 'Imported Record',
                    greeting: ['Hello there']
                },
                myRecord: {
                    int1: 20,
                    int2: 30,
                    int3: 40,
                    int4: 50,
                    int5: 60,
                    int6: 70,
                    int7: 80,
                    int8: 90,
                    int9: 100
                },
                fathomlessRecord: {
                    mytext: 'my text in a fathomless record'
                },
                myTuple: ['my tuple'],
                myDeepTuple: ['my deep tuple'],
                myCavernousTuple: ['my cavernous tuple']
            };

            expect(result).toStrictEqual(expectedResult);
        });

        it('typeCheck', async () => {
            const result = await ic.typeCheck([[7]]);

            expect(result).toBe(7);
        });
    };
}

/**
 * The azle coverage tests test that stage 2 is implemented correctly. These
 * tests should make sure that every possible Azle symbol is used and renamed at
 * least once so that we can make sure that Azle is reading the generated alias
 * table correctly
 *
 * @param fruit
 * @returns
 */
function getAzleCoverageTests(fruit: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('Add Sig Figs', async () => {
            const figs = 1.234;

            expect(await fruit.addSigFigs(figs)).toBe(1.2339999675750732);
        });

        it('check canister', async () => {
            const result = execSync(
                `dfx canister call robust_imports checkCanister '(service "aaaaa-aa")'`
            )
                .toString()
                .trim();

            expect(result).toBe('(service "aaaaa-aa")');
        });

        it('checkWatermelonForSeeds', async () => {
            const seedlessWatermelon = { Seedless: null };
            const watermelon = { Seeds: null };

            await expect(
                fruit.checkWatermelonForSeeds(true, watermelon)
            ).resolves.not.toThrow();
            await expect(
                fruit.checkWatermelonForSeeds(false, watermelon)
            ).rejects.toThrow();
            await expect(
                fruit.checkWatermelonForSeeds(true, seedlessWatermelon)
            ).rejects.toThrow();
            await expect(
                fruit.checkWatermelonForSeeds(false, seedlessWatermelon)
            ).resolves.not.toThrow();
        });

        it('Compare Apples to Oranges', async () => {
            const apples = {
                int: 1n,
                int8: 2,
                int16: 3,
                int32: 4,
                int64: 5n,
                starInt: 6n
            };
            const poisonApples = {
                int: -1n,
                int8: -2,
                int16: -3,
                int32: -4,
                int64: -5n,
                starInt: 6n
            };
            const oranges = {
                nat: 1n,
                nat8: 2,
                nat16: 3,
                nat32: 4,
                nat64: 5n,
                starNat: 6n
            };
            const result1 = await fruit.compareApplesToOranges(apples, oranges);
            const result2 = await fruit.compareApplesToOranges(
                poisonApples,
                oranges
            );

            expect(result1).toBe(true);
            expect(result2).toBe(false);
        });

        it('Handle Farkleberries', async () => {
            const func: [Principal, string] = [
                Principal.fromText('aaaaa-aa'),
                'create_canister'
            ];
            const result = await fruit.handleFarkleberries(func, func, func);

            expect(result).toEqual([func, func, func]);
        });

        it('Get Management Peach', async () => {
            const result = await fruit.getManagementPeach();

            expect(result.toText()).toBe('aaaaa-aa');
        });

        it('Pit Olives', async () => {
            const olives1HadAPit = await fruit.pitOlives([true]);
            const olives2HadAPit = await fruit.pitOlives([false]);
            const olives3HadAPit = await fruit.pitOlives([]);

            expect(olives1HadAPit).toBe(true);
            expect(olives2HadAPit).toBe(false);
            expect(olives3HadAPit).toBe(false);
        });

        it('Peel Banana', async () => {
            const banana = [1];
            const peeledBanana = await fruit.peelBanana(banana);

            expect(peeledBanana).toBe(1);
        });

        it('Put the Coconut in the Lime', async () => {
            const lime = await fruit.putTheCoconutInTheLime(8);

            expect(lime.length === 1 && lime[0]).toBe(8);
        });

        it('Check if Mango is tricky to eat', async () => {
            expect(await fruit.isMangoTrickyToEat()).toBe(true);
        });

        it("Is Fruit Prepared? It shouldn't be yet", async () => {
            await fruit.removeRambutanSkins();

            await expect(fruit.dirtyIlama()).rejects.toThrowError();
            await expect(fruit.pickElderberry()).rejects.toThrowError();
            expect(await fruit.isFruitPrepared()).toBe(false);
        });

        please('deploy', async () => {
            execSync(`dfx deploy --upgrade-unchanged`, {
                stdio: 'inherit'
            });
        });

        it('Is Fruit Prepared? Yes!', async () => {
            expect(await fruit.isFruitPrepared()).toBe(true);
        });
    };
}

function getTsPrimAliasTest(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('Test TS Prim Aliases', async () => {
            const result = await canister.checkPrimAliases(
                true,
                null,
                'Hello',
                7n,
                1.23
            );

            expect(result).toBeUndefined();
        });
    };
}

/**
 *
 * @param canister
 * @returns
 */
function getTypeAliasDeclTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('Text Aliases', async () => {
            const textAliasResult = await canister.helloTextAlias();
            const azleAliasResult = await canister.helloAzleTextAlias();
            const mixedTextAliasResult = await canister.helloMixedTextAlias();
            const deepTextAlias = await canister.helloDeepTextAlias();
            const stirredTextAlias = await canister.helloStirredTextAlias();

            expect(textAliasResult).toBe(azleAliasResult);
            expect(azleAliasResult).toBe(mixedTextAliasResult);
            expect(mixedTextAliasResult).toBe(deepTextAlias);
            expect(deepTextAlias).toBe(stirredTextAlias);
            expect(stirredTextAlias).toBe(textAliasResult);
        });

        it('Deep Blob Alias', async () => {
            const result = await canister.getDeepBlob([7]);

            expect(result[0]).toBe(7);
        });

        it('Deep Empty Alias', async () => {
            await expect(canister.deepEmptyAlias()).rejects.toThrowError();
        });

        it('Number Aliases', async () => {
            const result = await canister.getNumberAliases();
            const expectedResult = {
                first: 1n,
                second: 2n,
                third: 3,
                fourth: 4n,
                fifth: 5n,
                sixth: 6,
                seventh: 7,
                eighth: 8n,
                ninth: 9,
                tenth: 10n,
                eleventh: 11,
                twelfth: 12
            };

            expect(result).toStrictEqual(expectedResult);
        });

        it('Principal Aliases', async () => {
            const result = await canister.passPrincipal(
                Principal.fromText('aaaaa-aa')
            );

            expect(result.toText()).toBe('aaaaa-aa');
        });

        it('$query Aliases', async () => {
            await canister.simpleQuery();
            await canister.simpleAzleQuery();
            await canister.simpleDeepQuery();

            // If these functions didn't compile correctly then they should
            // fail when called
            expect(true).toBe(true);
        });

        it('check canister alias', async () => {
            const result = execSync(
                `dfx canister call robust_imports checkCanisterAlias '(service "aaaaa-aa")'`
            )
                .toString()
                .trim();

            expect(result).toBe('(service "aaaaa-aa")');
        });

        it('Reserved Alias', async () => {
            const result = await canister.getReservedAlias();

            expect(result).toBeNull();
        });

        it('Check My Record', async () => {
            const result = await canister.getMyRecord();
            const expectedResult = {
                id: 7n,
                name: ['Bob'],
                depth: { depth: 3 },
                tups: ['Hello', 1.23],
                description: { ugly: null },
                list: Uint16Array.from([1, 2, 3, 4, 5, 6, 7])
            };

            expect(result).toStrictEqual(expectedResult);
        });

        it('Return Func Alias', async () => {
            const func: [Principal, string] = [
                Principal.fromText('aaaaa-aa'),
                'create_canister'
            ];
            const result = await canister.returnFuncAlias(func);

            expect(result[0].toText()).toBe('aaaaa-aa');
        });

        it('Check Stable', async () => {
            await canister.setStable(0, 'Hello');
            const getResult = await canister.getStable(0);

            expect(getResult[0]).toBe('Hello');
        });

        it('Check Manual Alias', async () => {
            const result = await canister.getManualAlias();

            expect(result).toBe(9.87);
        });

        it('Check * exports for aliases', async () => {
            const result = await canister.compareStars(
                { star: true },
                { star: true }
            );

            expect(result).toStrictEqual({ Ok: true });
        });
    };
}
