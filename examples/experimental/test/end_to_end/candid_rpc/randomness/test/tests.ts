import { ActorSubclass } from '@dfinity/agent';
import { describe } from '@jest/globals';
import { expect, it, please, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/randomness/randomness.did';

let globalMathResults: Set<string> = new Set();
let globalCryptoResults: Set<string> = new Set();

type Round = {
    name: string;
    expectedMath: number;
    expectedCrypto: number;
    doUpgrade?: boolean;
    doUninstall?: boolean;
    doRedeploy?: boolean;
    doSeed?: boolean;
    doResetCrypto?: boolean;
};

export function getTests(randomnessCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        describe('randomness canister rounds', () => {
            const rounds: Round[] = [
                { name: 'initial', expectedMath: 5, expectedCrypto: 5 },
                {
                    name: 'after upgrade-unchanged',
                    doUpgrade: true,
                    expectedMath: 10,
                    expectedCrypto: 10
                },
                {
                    name: 'after reinstall',
                    doUninstall: true,
                    doRedeploy: true,
                    expectedMath: 15,
                    expectedCrypto: 15
                },
                {
                    name: 'after seeding 0 (first)',
                    doSeed: true,
                    doResetCrypto: true,
                    expectedMath: 20,
                    expectedCrypto: 5
                },
                {
                    name: 'after seeding 0 (second)',
                    doSeed: true,
                    expectedMath: 25,
                    expectedCrypto: 5
                }
            ];

            describe.each(rounds)('round: $name', (round: Round) => {
                if (round.doUpgrade === true) {
                    please('deploy with --upgrade-unchanged', async () => {
                        execSync('dfx deploy --upgrade-unchanged');
                    });
                }

                if (round.doUninstall === true) {
                    please('uninstall-code randomness', async () => {
                        execSync(
                            'dfx canister uninstall-code randomness || true'
                        );
                    });
                }

                if (round.doRedeploy === true) {
                    please('deploy randomness', async () => {
                        execSync('dfx deploy randomness');
                    });
                }

                if (round.doSeed === true) {
                    please('seed with 0', async () => {
                        await randomnessCanister.seedWith0();
                    });
                }

                if (round.doResetCrypto === true) {
                    please('reset crypto results', () => {
                        globalCryptoResults = new Set();
                    });
                }

                it(
                    `should produce math & crypto unique values ` +
                        `(math=${round.expectedMath} crypto=${round.expectedCrypto})`,
                    async () => {
                        const mathValues = await Promise.all(
                            Array(5)
                                .fill(0)
                                .map(() => randomnessCanister.mathRandom())
                        );

                        mathValues
                            .map((value) => value.toString())
                            .forEach((valueString) =>
                                globalMathResults.add(valueString)
                            );

                        expect(globalMathResults.size).toBe(round.expectedMath);

                        const cryptoValues = await Promise.all(
                            Array(5)
                                .fill(0)
                                .map(() =>
                                    randomnessCanister.cryptoGetRandomValues()
                                )
                        );

                        cryptoValues
                            .map((value) => value.toString())
                            .forEach((valueString) =>
                                globalCryptoResults.add(valueString)
                            );

                        expect(globalCryptoResults.size).toBe(
                            round.expectedCrypto
                        );
                    }
                );
            });
        });
    };
}
