import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

// TODO no tests yet but we run the tests to make sure the model will load
export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: 'prediction',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/prediction`);
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'Prediction not yet implemented'
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
