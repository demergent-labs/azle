// TODO I would also like to create property tests for crypto.getRandomValues and randSeed
// TODO for the crypto.getRandomValues, we should exhaustly test the different typed arrays
// TODO with byte lengths that are arbitrary. We should generate 5 or 10 values for each
// TODO similar to this test, then do deploys and seeding similar to this test
// TODO I have not yet decided what the randSeed test should look like...actually,
// TODO we should do an arbitrary seed, and just make sure that every time we call it,
// TODO that the values or the same afterwards, like 5 or 10 values...maybe after a deploy and uninstall as well?

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

        please('dfx canister uninstall-code randomness', async () => {
            execSync(`dfx canister uninstall-code randomness || true`);
        });

        please('dfx deploy randomness', async () => {
            execSync(`dfx deploy randomness`);
        });

        it('third round', async () => {
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

            expect(globalMathResults.size).toBe(15);
            expect(globalCryptoResults.size).toBe(15);
        });

        please('seed with 0 the first time', async () => {
            await randomnessCanister.seedWith0();
        });

        please('reset globalCryptoResults', () => {
            globalCryptoResults = new Set();
        });

        it('fourth round', async () => {
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

            const cryptoResults = [
                cryptoGetRandomValuesCall0Result.toString(),
                cryptoGetRandomValuesCall1Result.toString(),
                cryptoGetRandomValuesCall2Result.toString(),
                cryptoGetRandomValuesCall3Result.toString(),
                cryptoGetRandomValuesCall4Result.toString()
            ];

            for (const result of cryptoResults) {
                globalCryptoResults.add(result);
            }

            expect(globalCryptoResults.size).toBe(5);
        });

        please('seed with 0 the second time', async () => {
            await randomnessCanister.seedWith0();
        });

        it('fifth round', async () => {
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

            const cryptoResults = [
                cryptoGetRandomValuesCall0Result.toString(),
                cryptoGetRandomValuesCall1Result.toString(),
                cryptoGetRandomValuesCall2Result.toString(),
                cryptoGetRandomValuesCall3Result.toString(),
                cryptoGetRandomValuesCall4Result.toString()
            ];

            for (const result of cryptoResults) {
                globalCryptoResults.add(result);
            }

            expect(globalCryptoResults.size).toBe(5);
        });
    };
}
