import { describe } from '@jest/globals';
import { expect, it, Test } from 'azle/test';
import { getTests as getBitcoinTests } from 'bitcore_lib_example/test/tests';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;
    return () => {
        describe(
            'run tests common with bitcore_lib_example',
            getBitcoinTests(canisterId)
        );

        it('creates a psbt with bitcoinlib-js', async () => {
            const response = await fetch(`${origin}/create-psbt`, {
                method: 'POST'
            });
            const transaction = await response.text();

            expect(transaction).toBe(
                '02000000013ebc8203037dda39d482bf41ff3be955996c50d9d4f7cfc3d2097a694a7b067d000000006b483045022100931b6db94aed25d5486884d83fc37160f37f3368c0d7f48c757112abefec983802205fda64cff98c849577026eb2ce916a50ea70626a7669f8596dd89b720a26b4d501210365db9da3f8a260078a7e8f8b708a1161468fb2323ffda5ec16b261ec1056f455ffffffff0180380100000000001976a914ca0d36044e0dc08a22724efa6f6a07b0ec4c79aa88ac00000000'
            );
        });

        it('signs a bitcoin message deterministically with bitcoinlib-js', async () => {
            const response = await fetch(`${origin}/sign-bitcoin-message`, {
                method: 'POST'
            });
            const responseText = await response.text();

            const expectedResult =
                'H/Mj0TA83ABdvOdzdrvJsSN0RzZcJjawMj8Znr+nBd3oVt9+Tky2lsJjpl0G4hRxA5xHXQD5W/w9z6vbbLwnOwo=';

            expect(responseText).toBe(expectedResult);
        });

        it('signs a bitcoin message with ecpair and bitcoinlib-js', async () => {
            const response = await fetch(
                `${origin}/ecpair-sign-bitcoin-message`,
                { method: 'POST' }
            );
            const responseText = await response.text();
            const expectedResponse =
                'B2WVZh++ju5lbe/csYm9zr6qNPjcgRX3jBHftvYodEtR0Wtdkf9wIXCEZ47q30eaBF62Uwr40EKn9SFiLZpMOA==';

            expect(responseText).toBe(expectedResponse);
        });

        it('verifies a well signed bitcoin message with ecpair and bitcoinlib-js', async () => {
            const response = await fetch(
                `${origin}/ecpair-verify-bitcoin-message`,
                {
                    method: 'POST'
                }
            );
            const responseText = await response.json();

            expect(responseText).toBe(true);
        });

        it('fails to verify a poorly signed bitcoin message with ecpair and bitcoinlib-js', async () => {
            const response = await fetch(
                `${origin}/ecpair-fail-to-verify-bitcoin-message`,
                {
                    method: 'POST'
                }
            );
            const responseText = await response.json();

            expect(responseText).toBe(false);
        });
    };
}
