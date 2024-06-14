import { expect, it, Test } from 'azle/test/jest';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    // TODO https://github.com/demergent-labs/azle/issues/1806
    return () => {
        it('uses an apollo server resolver to query a list of books', async () => {
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
                headers: [
                    ['Content-Type', 'application/json'],
                    ['X-Ic-Force-Query', 'true']
                ],
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

            expect(responseJson).toEqual(expectedResult);
        });

        it('uses an apollo server resolver to query a list of authors', async () => {
            const expectedResult = {
                data: { authors: [{ name: 'Jordan' }, { name: 'Ben' }] }
            };

            const response = await fetch(origin, {
                method: 'POST',
                headers: [
                    ['Content-Type', 'application/json'],
                    ['X-Ic-Force-Query', 'true']
                ],
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

            expect(responseJson).toEqual(expectedResult);
        });
    };
}
