import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { equals, Test } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: 'query books',
            test: async () => {
                try {
                    const expectedResult = {
                        data: {
                            books: [
                                { id: '0', title: 'The Awakening' },
                                { id: '1', title: 'City of Glass' }
                            ]
                        }
                    };
                    const response = await fetch(origin, {
                        method: 'POST',
                        headers: [['Content-Type', 'application/json']],
                        body: JSON.stringify({
                            query: `
                                query {
                                    books {
                                        id
                                        title
                                    }
                                }
                        `
                        })
                    });
                    const responseJson = await response.json();
                    return equals(responseJson, expectedResult);
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: 'query authors',
            test: async () => {
                try {
                    const expectedResult = {
                        data: { authors: [{ name: 'Jordan' }, { name: 'Ben' }] }
                    };
                    const response = await fetch(origin, {
                        method: 'POST',
                        headers: [['Content-Type', 'application/json']],
                        body: JSON.stringify({
                            query: `
                                query {
                                    authors {
                                        name
                                    }
                                }
                        `
                        })
                    });
                    const responseJson = await response.json();

                    return equals(responseJson, expectedResult);
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        }
    ];
}
