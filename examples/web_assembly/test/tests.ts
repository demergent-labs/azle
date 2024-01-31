import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

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

                    return {
                        Ok:
                            responseJson.doubleResult === 2 &&
                            responseJson.addResult === 35 &&
                            responseJson.quadrupleResult === 400
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        }
    ];
}
