import { expect, it, Test } from 'azle/test';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('basic test', async () => {
            const response = await fetch(`${origin}?num1=1&num2=34&num3=100`);
            const responseJson = await response.json();

            const expectedResult = {
                doubleResult: 2,
                addResult: 35,
                quadrupleResult: 400
            };

            expect(responseJson).toEqual(expectedResult);
        });
    };
}
