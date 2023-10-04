import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/randomness/randomness.did';

let globalResults: Set<string> = new Set();

export function getTests(randomnessCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'first round',
            test: async () => {
                const randomNumberCall_0Result =
                    await randomnessCanister.randomNumber();
                const randomNumberCall_1Result =
                    await randomnessCanister.randomNumber();
                const randomNumberCall_2Result =
                    await randomnessCanister.randomNumber();
                const randomNumberCall_3Result =
                    await randomnessCanister.randomNumber();
                const randomNumberCall_4Result =
                    await randomnessCanister.randomNumber();

                const results = [
                    randomNumberCall_0Result.toString(),
                    randomNumberCall_1Result.toString(),
                    randomNumberCall_2Result.toString(),
                    randomNumberCall_3Result.toString(),
                    randomNumberCall_4Result.toString()
                ];

                for (const result of results) {
                    globalResults.add(result);
                }

                return {
                    Ok: globalResults.size === 5
                };
            }
        },
        {
            name: 'dfx deploy',
            prep: async () => {
                execSync('dfx deploy --upgrade-unchanged');
            }
        },
        {
            name: 'getRedeployed',
            test: async () => {
                const result = await randomnessCanister.getRedeployed();
                return {
                    Ok: result === true
                };
            }
        },
        {
            name: 'second round',
            test: async () => {
                const randomNumberCall_0Result =
                    await randomnessCanister.randomNumber();
                const randomNumberCall_1Result =
                    await randomnessCanister.randomNumber();
                const randomNumberCall_2Result =
                    await randomnessCanister.randomNumber();
                const randomNumberCall_3Result =
                    await randomnessCanister.randomNumber();
                const randomNumberCall_4Result =
                    await randomnessCanister.randomNumber();

                const results = [
                    randomNumberCall_0Result.toString(),
                    randomNumberCall_1Result.toString(),
                    randomNumberCall_2Result.toString(),
                    randomNumberCall_3Result.toString(),
                    randomNumberCall_4Result.toString()
                ];

                for (const result of results) {
                    globalResults.add(result);
                }

                return {
                    Ok: globalResults.size === 10
                };
            }
        }
    ];
}
