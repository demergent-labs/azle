import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/read-test0',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/read-test0?filename=${'assets/test0.txt'}`
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText.trim() === 'test0'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/read-test2',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/read-test2`, {
                        method: 'POST',
                        headers: [['Content-Type', 'application/json']],
                        body: JSON.stringify({
                            filename: 'assets/test1/test2.txt'
                        })
                    });
                    const responseText = await response.text();

                    return {
                        Ok: responseText.trim() === 'test2'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/read-test3',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/read-test3`, {
                        method: 'PUT',
                        headers: [['Content-Type', 'application/json']],
                        body: JSON.stringify({
                            filename: 'assets/test1/test3.txt'
                        })
                    });
                    const responseText = await response.text();

                    return {
                        Ok: responseText.trim() === 'test3'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/read-test5',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/read-test5`, {
                        method: 'PATCH',
                        headers: [['Content-Type', 'application/json']],
                        body: JSON.stringify({
                            filename: 'assets/test1/test4/test5.txt'
                        })
                    });
                    const responseText = await response.text();

                    return {
                        Ok: responseText.trim() === 'test5'
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
