// TODO add some tests where the file is written to rapidly

import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';
import { writeFileSync } from 'fs';

export const originalServerTs = `import { Server } from 'azle';
import express from 'express';

export default Server(() => {
const app = express();

app.get('/test', (req, res) => {
    res.send('test');
});

return app.listen();
});
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
                writeFileSync(
                    './src/server.ts',
                    `
                        import { Server } from 'azle';
                        import express from 'express';

                        export default Server(() => {
                            const app = express();

                            app.get('/test-changed', (req, res) => {
                                res.send('test-changed');
                            });

                            return app.listen();
                        });
                    `
                );
            }
        },
        {
            name: 'waiting for Azle to reload',
            wait: 5_000
        },
        {
            name: '/test-changed',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/test-changed`);
                    const responseText = await response.text();

                    console.log('responseText', responseText);

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
            wait: 5_000
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
