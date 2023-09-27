import { Test } from 'azle/test';
import { Principal } from '@dfinity/principal';
import { execSync } from 'child_process';
import { _SERVICE } from '../dfx_generated/robust_imports/robust_imports.did';
import { ActorSubclass } from '@dfinity/agent';

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
                const result = await ic.myVariantToMyDeepVariant({ Thing: 7 });
                return {
                    Ok: result.Thing === 7
                };
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
                return {
                    Ok: 'eight' in result
                };
            }
        },
        {
            name: 'returnsVec',
            test: async () => {
                return {
                    Ok: 7 === (await ic.returnVec())[1][3]
                };
            }
        },
        {
            name: 'returnsFathomlessVec',
            test: async () => {
                return {
                    Ok: 7 === (await ic.returnFathomlessVec())[6]
                };
            }
        },
        {
            name: 'returnWeird',
            test: async () => {
                return {
                    Ok: -10_000n === (await ic.returnWeird())
                };
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

                return {
                    Ok: result === '(service "aaaaa-aa")'
                };
            }
        },
        {
            name: 'makeCavernousRecord',
            test: async () => {
                const result = await ic.makeCavernousRecord();
                return {
                    Ok:
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
                };
            }
        },
        {
            name: 'typeCheck',
            test: async () => {
                const result = await ic.typeCheck([[7]]);
                return {
                    Ok: result === 7
                };
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
                return {
                    Ok: 1.2339999675750732 === (await fruit.addSigFigs(figs))
                };
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

                return {
                    Ok: result === '(service "aaaaa-aa")'
                };
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
                    return { Ok: false };
                }
                try {
                    await fruit.checkWatermelonForSeeds(false, watermelon);
                    return { Ok: false };
                } catch (err) {}
                try {
                    await fruit.checkWatermelonForSeeds(
                        true,
                        seedlessWatermelon
                    );
                    return { Ok: false };
                } catch (err) {}
                try {
                    await fruit.checkWatermelonForSeeds(
                        false,
                        seedlessWatermelon
                    );
                } catch (err) {
                    return { Ok: false };
                }
                return { Ok: true };
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
                return { Ok: result1 && !result2 };
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

                return {
                    Ok:
                        result[0][0].toText() === 'aaaaa-aa' &&
                        result[0][1] === 'create_canister' &&
                        result[1][0].toText() === 'aaaaa-aa' &&
                        result[1][1] === 'create_canister' &&
                        result[2][0].toText() === 'aaaaa-aa' &&
                        result[2][1] === 'create_canister'
                };
            }
        },
        {
            name: 'Get Management Peach',
            test: async () => {
                const result = await fruit.getManagementPeach();
                return {
                    Ok: result.toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'Pit Olives',
            test: async () => {
                const olives1HadAPit = await fruit.pitOlives([true]);
                const olives2HadAPit = await fruit.pitOlives([false]);
                const olives3HadAPit = await fruit.pitOlives([]);
                return {
                    Ok: olives1HadAPit && !olives2HadAPit && !olives3HadAPit
                };
            }
        },
        {
            name: 'Peel Banana',
            test: async () => {
                const banana = [1];
                const peeledBanana = await fruit.peelBanana(banana);
                return { Ok: peeledBanana === 1 };
            }
        },
        {
            name: 'Put the Coconut in the Lime',
            test: async () => {
                const lime = await fruit.putTheCoconutInTheLime(8);
                return { Ok: lime.length === 1 && lime[0] === 8 };
            }
        },
        {
            name: 'Check if Mango is tricky to eat',
            test: async () => {
                return {
                    Ok: await fruit.isMangoTrickyToEat()
                };
            }
        },
        {
            name: "Is Fruit Prepared? It shouldn't be yet",
            test: async () => {
                await fruit.removeRambutanSkins();
                try {
                    await fruit.dirtyIlama();
                    return { Ok: false };
                } catch {}
                try {
                    await fruit.pickElderberry();
                    return { Ok: false };
                } catch {}
                return {
                    Ok: !(await fruit.isFruitPrepared())
                };
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
                return {
                    Ok: await fruit.isFruitPrepared()
                };
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
                return { Ok: result === undefined };
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
                return {
                    Ok:
                        textAliasResult === azleAliasResult &&
                        azleAliasResult === mixedTextAliasResult &&
                        mixedTextAliasResult === deepTextAlias &&
                        deepTextAlias === stirredTextAlias &&
                        stirredTextAlias === textAliasResult
                };
            }
        },
        {
            name: 'Deep Blob Alias',
            test: async () => {
                const result = await canister.getDeepBlob([7]);
                return { Ok: result[0] === 7 };
            }
        },
        {
            name: 'Deep Empty Alias',
            test: async () => {
                try {
                    await canister.deepEmptyAlias();
                    return { Ok: false };
                } catch {}
                return { Ok: true };
            }
        },
        {
            name: 'Number Aliases',
            test: async () => {
                const result = await canister.getNumberAliases();
                return {
                    Ok:
                        result.first === 1n &&
                        result.second === 2n &&
                        result.third === 3 &&
                        result.fourth === 4n &&
                        result.fifth === 5n &&
                        result.sixth === 6 &&
                        result.seventh === 7 &&
                        result.eighth === 8n &&
                        result.ninth === 9 &&
                        result.tenth === 10n &&
                        result.eleventh === 11 &&
                        result.twelfth === 12
                };
            }
        },
        {
            name: 'Principal Aliases',
            test: async () => {
                const result = await canister.passPrincipal(
                    Principal.fromText('aaaaa-aa')
                );
                return { Ok: result.toText() === 'aaaaa-aa' };
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
                return { Ok: true };
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

                return {
                    Ok: result === '(service "aaaaa-aa")'
                };
            }
        },
        {
            name: 'Reserved Alias',
            test: async () => {
                const result = await canister.getReservedAlias();
                return { Ok: result === null };
            }
        },
        {
            name: 'Check My Record',
            test: async () => {
                const result = await canister.getMyRecord();
                return {
                    Ok:
                        result.id === 7n &&
                        result.name[0] === 'Bob' &&
                        result.depth.depth === 3 &&
                        result.tups[0] === 'Hello' &&
                        result.tups[1] === 1.23 &&
                        'ugly' in result.description &&
                        result.list[0] === 1
                };
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
                return { Ok: result[0].toText() === 'aaaaa-aa' };
            }
        },
        {
            name: 'Check Stable',
            test: async () => {
                await canister.setStable(0, 'Hello');
                const getResult = await canister.getStable(0);
                return {
                    Ok: getResult[0] === 'Hello'
                };
            }
        },
        {
            name: 'Check Manual Alias',
            test: async () => {
                const result = await canister.getManualAlias();
                return { Ok: result === 9.87 };
            }
        },
        {
            name: 'Check * exports for aliases',
            test: async () => {
                const result = await canister.compareStars(
                    { star: true },
                    { star: true }
                );

                if ('Ok' in result) {
                    return { Ok: true };
                }

                return { Ok: false };
            }
        }
    ];
}
