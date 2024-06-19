import { expect, it, please, Test, wait } from 'azle/test/jest';
import { writeFileSync } from 'fs';

import {
    originalServerTs,
    testChangedRapidlyServerTs,
    testChangedServerTs
} from './server_source';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('loads the original canister', async () => {
            const response = await fetch(`${origin}/test`);
            const responseText = await response.text();

            expect(responseText).toBe('test');
        });

        please('updates file with new code', () => {
            writeFileSync('./src/server.ts', testChangedServerTs);
        });

        wait('for Azle to reload', 10_000);

        it('has /test-changed endpoint after the code is reloaded', async () => {
            const response = await fetch(`${origin}/test-changed`);
            const responseText = await response.text();

            expect(responseText).toBe('test-changed');
        });

        please('restore original file contents', () => {
            writeFileSync('./src/server.ts', originalServerTs);
        });

        wait('for Azle to reload', 10_000);

        it('has the /test endpoint after the original contents are restored', async () => {
            const response = await fetch(`${origin}/test`);
            const responseText = await response.text();

            expect(responseText).toBe('test');
        });

        it('rapidly changes the file', async () => {
            for (let i = 0; i < 100; i++) {
                writeFileSync('./src/server.ts', testChangedRapidlyServerTs);

                // chokidar seems to debounce if writes are too close together
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        }, 20_000);

        wait('for Azle to reload', 90_000);

        it('has the /test-changed-rapidly endpoint after the file is reloaded rapidly', async () => {
            const response = await fetch(`${origin}/test-changed-rapidly`);
            const responseText = await response.text();

            expect(responseText).toBe('test-changed-rapidly');
        });

        please('restore original file contents', () => {
            writeFileSync('./src/server.ts', originalServerTs);
        });

        wait('for Azle to reload', 30_000);

        it('has the /test endpoint after the original contents are restored', async () => {
            const response = await fetch(`${origin}/test`);
            const responseText = await response.text();

            expect(responseText).toMatch('test');
        });
    };
}
