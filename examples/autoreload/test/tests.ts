import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';
import { writeFileSync } from 'fs';

export const originalServerTs = `import express from 'express';

const app = express();

app.get('/test', (req, res) => {
    res.send('test');
});

app.listen();
`;

const testChangedServerTs = `import express from 'express';

const app = express();

app.get('/test-changed', (req, res) => {
    res.send('test-changed');
});

app.listen();
`;

const testChangedRapidlyServerTs = `import express from 'express';

const app = express();

app.get('/test-changed-rapidly', (req, res) => {
    res.send('test-changed-rapidly');
});

app.listen();
`;

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/test',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/test`);
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'test'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: 'change file to new code',
            prep: async () => {
                writeFileSync('./src/server.ts', testChangedServerTs);
            }
        },
        {
            name: 'waiting for Azle to reload',
            wait: 10_000
        },
        {
            name: '/test-changed',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/test-changed`);
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'test-changed'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: 'restore original file contents',
            prep: async () => {
                writeFileSync('./src/server.ts', originalServerTs);
            }
        },
        {
            name: 'waiting for Azle to reload',
            wait: 10_000
        },
        {
            name: '/test',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/test`);
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'test'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: 'rapidly write to file',
            prep: async () => {
                for (let i = 0; i < 100; i++) {
                    writeFileSync(
                        './src/server.ts',
                        testChangedRapidlyServerTs
                    );

                    // chokidar seems to debounce if writes are too close together
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
            }
        },
        {
            name: 'waiting for Azle to reload',
            wait: 30_000
        },
        {
            name: '/test-changed-rapidly',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/test-changed-rapidly`
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'test-changed-rapidly'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: 'restore original file contents',
            prep: async () => {
                writeFileSync('./src/server.ts', originalServerTs);
            }
        },
        {
            name: 'waiting for Azle to reload',
            wait: 30_000
        },
        {
            name: '/test',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/test`);
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'test'
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
