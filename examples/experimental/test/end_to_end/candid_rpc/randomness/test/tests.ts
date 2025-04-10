import { ActorSubclass } from '@dfinity/agent';
import { expect, it, please, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/randomness/randomness.did';

let globalMathResults: Set<string> = new Set();
let globalCryptoResults: Set<string> = new Set();

export function getTests(randomnessCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('first round', async () => {
            const mathRandomCall0Result = await randomnessCanister.mathRandom();
            const mathRandomCall1Result = await randomnessCanister.mathRandom();
            const mathRandomCall2Result = await randomnessCanister.mathRandom();
            const mathRandomCall3Result = await randomnessCanister.mathRandom();
            const mathRandomCall4Result = await randomnessCanister.mathRandom();

            const cryptoGetRandomValuesCall0Result =
                await randomnessCanister.cryptoGetRandomValues();
            const cryptoGetRandomValuesCall1Result =
                await randomnessCanister.cryptoGetRandomValues();
            const cryptoGetRandomValuesCall2Result =
                await randomnessCanister.cryptoGetRandomValues();
            const cryptoGetRandomValuesCall3Result =
                await randomnessCanister.cryptoGetRandomValues();
            const cryptoGetRandomValuesCall4Result =
                await randomnessCanister.cryptoGetRandomValues();

            const mathResults = [
                mathRandomCall0Result.toString(),
                mathRandomCall1Result.toString(),
                mathRandomCall2Result.toString(),
                mathRandomCall3Result.toString(),
                mathRandomCall4Result.toString()
            ];

            const cryptoResults = [
                cryptoGetRandomValuesCall0Result.toString(),
                cryptoGetRandomValuesCall1Result.toString(),
                cryptoGetRandomValuesCall2Result.toString(),
                cryptoGetRandomValuesCall3Result.toString(),
                cryptoGetRandomValuesCall4Result.toString()
            ];

            for (const result of mathResults) {
                globalMathResults.add(result);
            }

            for (const result of cryptoResults) {
                globalCryptoResults.add(result);
            }

            expect(globalMathResults.size).toBe(5);
            expect(globalCryptoResults.size).toBe(5);
        });

        please('dfx deploy', async () => {
            execSync('dfx deploy --upgrade-unchanged');
        });

        it('second round', async () => {
            const mathRandomCall0Result = await randomnessCanister.mathRandom();
            const mathRandomCall1Result = await randomnessCanister.mathRandom();
            const mathRandomCall2Result = await randomnessCanister.mathRandom();
            const mathRandomCall3Result = await randomnessCanister.mathRandom();
            const mathRandomCall4Result = await randomnessCanister.mathRandom();

            const cryptoGetRandomValuesCall0Result =
                await randomnessCanister.cryptoGetRandomValues();
            const cryptoGetRandomValuesCall1Result =
                await randomnessCanister.cryptoGetRandomValues();
            const cryptoGetRandomValuesCall2Result =
                await randomnessCanister.cryptoGetRandomValues();
            const cryptoGetRandomValuesCall3Result =
                await randomnessCanister.cryptoGetRandomValues();
            const cryptoGetRandomValuesCall4Result =
                await randomnessCanister.cryptoGetRandomValues();

            const mathResults = [
                mathRandomCall0Result.toString(),
                mathRandomCall1Result.toString(),
                mathRandomCall2Result.toString(),
                mathRandomCall3Result.toString(),
                mathRandomCall4Result.toString()
            ];

            const cryptoResults = [
                cryptoGetRandomValuesCall0Result.toString(),
                cryptoGetRandomValuesCall1Result.toString(),
                cryptoGetRandomValuesCall2Result.toString(),
                cryptoGetRandomValuesCall3Result.toString(),
                cryptoGetRandomValuesCall4Result.toString()
            ];

            for (const result of mathResults) {
                globalMathResults.add(result);
            }

            for (const result of cryptoResults) {
                globalCryptoResults.add(result);
            }

            expect(globalMathResults.size).toBe(10);
            expect(globalCryptoResults.size).toBe(10);
        });
    };
}
