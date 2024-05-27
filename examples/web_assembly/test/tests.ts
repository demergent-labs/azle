import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { error, Test, testEquality } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: 'basic test',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}?num1=1&num2=34&num3=100`
                    );
                    const responseJson = await response.json();
                    const expected = {
                        doubleResult: 2,
                        addResult: 35,
                        quaddrupleResult: 400
                    };

                    return testEquality(responseJson, expected);
                } catch (err: any) {
                    return error(err);
                }
            }
        }
    ];
}
