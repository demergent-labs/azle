import { expect, it, Test } from 'azle/test';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('gets a simple hello world database', async () => {
            const response = await fetch(`${origin}/db`);
            const responseJson = await response.json();

            expect(responseJson).toEqual({ hello: '' });
        });

        it('updates a simple hello world database', async () => {
            const response = await fetch(`${origin}/db/update`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    hello: 'world'
                })
            });
            const responseJson = await response.json();

            expect(responseJson).toEqual({ hello: 'world' });
        });
    };
}
