import { expect, it, Test } from 'azle/_internal/test';

// TODO no tests yet but we run the tests to make sure the model will load
export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.raw.localhost:4943`;

    return () => {
        it('loads the model', async () => {
            const response = await fetch(`${origin}/load-model`, {
                method: 'POST'
            });
            const responseText = await response.text();

            expect(responseText).toBe('Model loaded');
        });

        it('prediction', async () => {
            const response = await fetch(`${origin}/prediction`);
            const responseText = await response.text();

            expect(responseText).toBe('Prediction not yet implemented');
        });
    };
}
