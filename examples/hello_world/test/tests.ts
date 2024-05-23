import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test, testEquality } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/db',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/db`);
                    const responseJson = await response.json();

                    return testEquality(responseJson, { hello: '' });
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/db/update',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/db/update`, {
                        method: 'POST',
                        headers: [['Content-Type', 'application/json']],
                        body: JSON.stringify({
                            hello: 'world'
                        })
                    });
                    const responseJson = await response.json();

                    return testEquality(responseJson, { hello: 'world' });
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        }
    ];
}
