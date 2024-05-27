import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { fail, succeed, Test, test, testEquality } from 'azle/test';
import { execSync } from 'child_process';

import { _SERVICE } from '../dfx_generated/robust_imports/robust_imports.did';

export function getTests(
    robustImportsCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        ...getImportCoverageTests(robustImportsCanister),
        ...getAzleCoverageTests(robustImportsCanister),
        ...getTypeAliasDeclTests(robustImportsCanister),
        ...getTsPrimAliasTest(robustImportsCanister)
    ];
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
function getImportCoverageTests(ic: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'myVariantToMyDeepVariant',
            test: async () => {
                const expected = { Thing: 7 };
                const result = await ic.myVariantToMyDeepVariant({ Thing: 7 });

                return testEquality(result, expected);
            }
        },
        {
            name: 'myFathomlessVariantToMyCavernousVariant',
            test: async () => {
                const result = await ic.myFathomlessVariantToMyCavernousVariant(
                    {
                        MyInt8: 7
                    }
                );

                return test('eight' in result);
            }
        },
        {
            name: 'returnsVec',
            test: async () => {
                return testEquality((await ic.returnVec())[1][3], 7);
            }
        },
        {
            name: 'returnsFathomlessVec',
            test: async () => {
                return testEquality((await ic.returnFathomlessVec())[6], 7);
            }
        },
        {
            name: 'returnWeird',
            test: async () => {
                return testEquality(await ic.returnWeird(), -10_000n);
            }
        },
        {
            name: 'returnFathomlessCanister',
            test: async () => {
                const result = execSync(
                    `dfx canister call robust_imports returnFathomlessCanister '(service "aaaaa-aa")'`
                )
                    .toString()
                    .trim();

                return testEquality(result, '(service "aaaaa-aa")');
            }
        },
        {
            name: 'makeCavernousRecord',
            test: async () => {
                const result = await ic.makeCavernousRecord();
                return test(
                    result.coveredRecord.count === 10 &&
                        result.coveredRecord.name === 'Bob' &&
                        result.coveredRecord.type_name === 'Imported Record' &&
                        result.coveredRecord.greeting[0] === 'Hello there' &&
                        result.myRecord.int1 === 20 &&
                        result.myRecord.int2 === 30 &&
                        result.myRecord.int3 === 40 &&
                        result.myRecord.int4 === 50 &&
                        result.myRecord.int5 === 60 &&
                        result.myRecord.int6 === 70 &&
                        result.myRecord.int7 === 80 &&
                        result.myRecord.int8 === 90 &&
                        result.myRecord.int9 === 100 &&
                        result.fathomlessRecord.mytext ===
                            'my text in a fathomless record' &&
                        result.myTuple[0] === 'my tuple' &&
                        result.myDeepTuple[0] === 'my deep tuple' &&
                        result.myCavernousTuple[0] === 'my cavernous tuple'
                );
            }
        },
        {
            name: 'typeCheck',
            test: async () => {
                const result = await ic.typeCheck([[7]]);

                return testEquality(result, 7);
            }
        }
    ];
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
function getAzleCoverageTests(fruit: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'Add Sig Figs',
            test: async () => {
                const figs = 1.234;

                return testEquality(
                    await fruit.addSigFigs(figs),
                    1.2339999675750732
                );
            }
        },
        {
            name: 'check canister',
            test: async () => {
                const result = execSync(
                    `dfx canister call robust_imports checkCanister '(service "aaaaa-aa")'`
                )
                    .toString()
                    .trim();

                return testEquality(result, '(service "aaaaa-aa")');
            }
        },
        {
            name: 'checkWatermelonForSeeds',
            test: async () => {
                const seedlessWatermelon = { Seedless: null };
                const watermelon = { Seeds: null };
                try {
                    await fruit.checkWatermelonForSeeds(true, watermelon);
                } catch (err) {
                    return fail();
                }
                try {
                    await fruit.checkWatermelonForSeeds(false, watermelon);
                    return fail();
                } catch (err) {
                    // continue regardless of error
                }
                try {
                    await fruit.checkWatermelonForSeeds(
                        true,
                        seedlessWatermelon
                    );
                    return fail();
                } catch (err) {
                    // continue regardless of error
                }
                try {
                    await fruit.checkWatermelonForSeeds(
                        false,
                        seedlessWatermelon
                    );
                } catch (err) {
                    return fail();
                }

                return succeed();
            }
        },
        {
            name: 'Compare Apples to Oranges',
            test: async () => {
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
                const result1 = await fruit.compareApplesToOranges(
                    apples,
                    oranges
                );
                const result2 = await fruit.compareApplesToOranges(
                    poisonApples,
                    oranges
                );

                return testEquality([result1, result2], [true, false]);
            }
        },
        {
            name: 'Handle Farkleberries',
            test: async () => {
                const func: [Principal, string] = [
                    Principal.fromText('aaaaa-aa'),
                    'create_canister'
                ];
                const result = await fruit.handleFarkleberries(
                    func,
                    func,
                    func
                );

                return testEquality(result, [func, func, func]);
            }
        },
        {
            name: 'Get Management Peach',
            test: async () => {
                const result = await fruit.getManagementPeach();
                const expected = Principal.fromText('aaaaa-aa');

                return testEquality(result, expected);
            }
        },
        {
            name: 'Pit Olives',
            test: async () => {
                const olives1HadAPit = await fruit.pitOlives([true]);
                const olives2HadAPit = await fruit.pitOlives([false]);
                const olives3HadAPit = await fruit.pitOlives([]);

                return testEquality(
                    [olives1HadAPit, olives2HadAPit, olives3HadAPit],
                    [true, false, false]
                );
            }
        },
        {
            name: 'Peel Banana',
            test: async () => {
                const banana = [1];
                const peeledBanana = await fruit.peelBanana(banana);

                return testEquality(peeledBanana, 1);
            }
        },
        {
            name: 'Put the Coconut in the Lime',
            test: async () => {
                const coconut = 8;
                const lime = await fruit.putTheCoconutInTheLime(coconut);

                return testEquality(lime, [coconut]);
            }
        },
        {
            name: 'Check if Mango is tricky to eat',
            test: async () => {
                return test(await fruit.isMangoTrickyToEat());
            }
        },
        {
            name: "Is Fruit Prepared? It shouldn't be yet",
            test: async () => {
                await fruit.removeRambutanSkins();
                try {
                    await fruit.dirtyIlama();
                    return fail();
                } catch {
                    // continue regardless of error
                }
                try {
                    await fruit.pickElderberry();
                    return fail();
                } catch {
                    // continue regardless of error
                }

                return test(!(await fruit.isFruitPrepared()));
            }
        },
        {
            name: 'deploy',
            prep: async () => {
                execSync(`dfx deploy --upgrade-unchanged`, {
                    stdio: 'inherit'
                });
            }
        },
        {
            name: 'Is Fruit Prepared? Yes!',
            test: async () => {
                return test(await fruit.isFruitPrepared());
            }
        }
    ];
}

function getTsPrimAliasTest(canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'Test TS Prim Aliases',
            test: async () => {
                const result = await canister.checkPrimAliases(
                    true,
                    null,
                    'Hello',
                    7n,
                    1.23
                );

                return testEquality(result, undefined);
            }
        }
    ];
}

/**
 *
 * @param canister
 * @returns
 */
function getTypeAliasDeclTests(canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'Text Aliases',
            test: async () => {
                const textAliasResult = await canister.helloTextAlias();
                const azleAliasResult = await canister.helloAzleTextAlias();
                const mixedTextAliasResult =
                    await canister.helloMixedTextAlias();
                const deepTextAlias = await canister.helloDeepTextAlias();
                const stirredTextAlias = await canister.helloStirredTextAlias();

                return test(
                    textAliasResult === azleAliasResult &&
                        azleAliasResult === mixedTextAliasResult &&
                        mixedTextAliasResult === deepTextAlias &&
                        deepTextAlias === stirredTextAlias &&
                        stirredTextAlias === textAliasResult,
                    `Expected all of the following to be the same: ${textAliasResult}, ${azleAliasResult}, ${mixedTextAliasResult}, ${deepTextAlias}, ${stirredTextAlias}`
                );
            }
        },
        {
            name: 'Deep Blob Alias',
            test: async () => {
                const expected = [7];
                const result = await canister.getDeepBlob(expected);

                return testEquality(result, expected);
            }
        },
        {
            name: 'Deep Empty Alias',
            test: async () => {
                try {
                    await canister.deepEmptyAlias();
                    return fail();
                } catch {
                    // continue regardless of error
                }

                return succeed();
            }
        },
        {
            name: 'Number Aliases',
            test: async () => {
                const result = await canister.getNumberAliases();
                const expected = {
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

                return testEquality(result, expected);
            }
        },
        {
            name: 'Principal Aliases',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');
                const result = await canister.passPrincipal(principal);

                return testEquality(result, principal);
            }
        },
        {
            name: '$query Aliases',
            test: async () => {
                await canister.simpleQuery();
                await canister.simpleAzleQuery();
                await canister.simpleDeepQuery();
                // If these functions didn't compile correctly then they should
                // fail when called

                return succeed();
            }
        },
        {
            name: 'check canister alias',
            test: async () => {
                const result = execSync(
                    `dfx canister call robust_imports checkCanisterAlias '(service "aaaaa-aa")'`
                )
                    .toString()
                    .trim();

                return testEquality(result, '(service "aaaaa-aa")');
            }
        },
        {
            name: 'Reserved Alias',
            test: async () => {
                const result = await canister.getReservedAlias();

                return testEquality(result, null);
            }
        },
        {
            name: 'Check My Record',
            test: async () => {
                const result = await canister.getMyRecord();
                const expected = {
                    id: 7n,
                    name: ['Bob'],
                    depth: {
                        depth: 3
                    },
                    tups: ['Hello', 1.23],
                    description: {
                        ugly: null
                    },
                    list: [1]
                };

                return testEquality(result, expected);
            }
        },
        {
            name: 'Return Func Alias',

            test: async () => {
                const func: [Principal, string] = [
                    Principal.fromText('aaaaa-aa'),
                    'create_canister'
                ];
                const result = await canister.returnFuncAlias(func);

                return testEquality(result, func);
            }
        },
        {
            name: 'Check Stable',
            test: async () => {
                const stable = 'Hello';
                await canister.setStable(0, stable);
                const getResult = await canister.getStable(0);

                return testEquality(getResult, [stable]);
            }
        },
        {
            name: 'Check Manual Alias',
            test: async () => {
                const result = await canister.getManualAlias();

                return testEquality(result, 9.87);
            }
        },
        {
            name: 'Check * exports for aliases',
            test: async () => {
                const result = await canister.compareStars(
                    { star: true },
                    { star: true }
                );

                return test('Ok' in result);
            }
        }
    ];
}
