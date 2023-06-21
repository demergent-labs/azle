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
        ...getAzleCoverageTests(robustImportsCanister)
    ];
}

function getImportCoverageTests(
    robustImportsCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'query',
            test: async () => {
                const result = await robustImportsCanister.simpleQuery();

                return {
                    Ok: result === 'This is a query function'
                };
            }
        }
    ];
}

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
            name: 'check service',
            test: async () => {
                return {
                    Ok: true // TODO fix this
                };
                const result = execSync(
                    `dfx canister call robust_imports checkService '(service "aaaaa-aa")'`
                )
                    .toString()
                    .trim();

                console.log(result);

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
                    int64: 5n
                };
                const poisonApples = {
                    int: -1n,
                    int8: -2,
                    int16: -3,
                    int32: -4,
                    int64: -5n
                };
                const oranges = {
                    nat: 1n,
                    nat8: 2,
                    nat16: 3,
                    nat32: 4,
                    nat64: 5n
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
                let func: [Principal, string] = [
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
                execSync(`dfx deploy`, {
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
