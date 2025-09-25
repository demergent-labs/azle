import { ActorSubclass } from '@icp-sdk/core/agent';
import { expect, it, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

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

        it.each(rounds)(
            'should produce math & crypto unique values for round $name (math=$expectedMath crypto=$expectedCrypto)',
            async (round: Round) => {
                if (round.doUpgrade === true) {
                    execSync('dfx deploy --upgrade-unchanged');
                }

                if (round.doUninstall === true) {
                    execSync('dfx canister uninstall-code randomness || true');
                }

                if (round.doRedeploy === true) {
                    execSync('dfx deploy randomness');
                }

                if (round.doSeed === true) {
                    await randomnessCanister.seedWith0();
                }

                if (round.doResetCrypto === true) {
                    globalCryptoResults = new Set();
                }

                const mathValues = await Promise.all(
                    Array(5)
                        .fill(0)
                        .map(
                            (): Promise<number> =>
                                randomnessCanister.mathRandom()
                        )
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
                        .map(
                            (): Promise<Uint8Array | number[]> =>
                                randomnessCanister.cryptoGetRandomValues()
                        )
                );

                cryptoValues
                    .map((value) => Buffer.from(value).toString('hex'))
                    .forEach((valueString) =>
                        globalCryptoResults.add(valueString)
                    );

                expect(globalCryptoResults.size).toBe(round.expectedCrypto);
            }
        );
    };
}
