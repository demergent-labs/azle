import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: 'load db',
            test: async () => {
                try {
                    const response = await fetch(origin, {
                        method: 'POST'
                    });
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'Hello world'
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
