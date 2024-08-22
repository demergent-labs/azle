import { ActorSubclass } from '@dfinity/agent';
import { expect, it, please, Test } from 'azle/test';
import { execSync } from 'child_process';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/randomness/randomness.did';

let globalResults: Set<string> = new Set();

export function getTests(randomnessCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('first round', async () => {
            const randomNumberCall0Result =
                await randomnessCanister.randomNumber();
            const randomNumberCall1Result =
                await randomnessCanister.randomNumber();
            const randomNumberCall2Result =
                await randomnessCanister.randomNumber();
            const randomNumberCall3Result =
                await randomnessCanister.randomNumber();
            const randomNumberCall4Result =
                await randomnessCanister.randomNumber();

            const results = [
                randomNumberCall0Result.toString(),
                randomNumberCall1Result.toString(),
                randomNumberCall2Result.toString(),
                randomNumberCall3Result.toString(),
                randomNumberCall4Result.toString()
            ];

            for (const result of results) {
                globalResults.add(result);
            }

            expect(globalResults.size).toBe(5);
        }, 20_000);

        please('dfx deploy', async () => {
            execSync('dfx deploy --upgrade-unchanged');
        });

        it('getRedeployed', async () => {
            const result = await randomnessCanister.getRedeployed();
            expect(result).toBe(true);
        });

        it('second round', async () => {
            const randomNumberCall0Result =
                await randomnessCanister.randomNumber();
            const randomNumberCall1Result =
                await randomnessCanister.randomNumber();
            const randomNumberCall2Result =
                await randomnessCanister.randomNumber();
            const randomNumberCall3Result =
                await randomnessCanister.randomNumber();
            const randomNumberCall4Result =
                await randomnessCanister.randomNumber();

            const results = [
                randomNumberCall0Result.toString(),
                randomNumberCall1Result.toString(),
                randomNumberCall2Result.toString(),
                randomNumberCall3Result.toString(),
                randomNumberCall4Result.toString()
            ];

            for (const result of results) {
                globalResults.add(result);
            }

            expect(globalResults.size).toBe(10);
        }, 20_000);
    };
}
