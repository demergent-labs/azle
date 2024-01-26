import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: 'query books',
            test: async () => {
                try {
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

                    return {
                        Ok:
                            responseJson.data.books.length === 2 &&
                            responseJson.data.books[0].title === 'The Awakening'
                    };
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

                    return {
                        Ok:
                            responseJson.data.authors.length === 2 &&
                            responseJson.data.authors[0].name === 'Jordan'
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
