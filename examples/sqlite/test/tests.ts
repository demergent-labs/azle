// TODO test adding blog posts, etc
// TODO test updating, and deleting

import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';
import { execSync } from 'child_process';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/init-state true',
            test: async () => {
                const response = await fetch(`${origin}/init-state`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === true
                };
            }
        },
        {
            name: '/post-upgrade-state false',
            test: async () => {
                const response = await fetch(`${origin}/post-upgrade-state`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === false
                };
            }
        },
        {
            name: '/users empty',
            test: async () => {
                const response = await fetch(`${origin}/users`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.length === 0
                };
            }
        },
        {
            name: '/users/count 0',
            test: async () => {
                const response = await fetch(`${origin}/users/count`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 0
                };
            }
        },
        {
            name: '/users/1 null',
            test: async () => {
                const response = await fetch(`${origin}/users/1`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === null
                };
            }
        },
        {
            name: '/users post 1',
            test: async () => {
                const response = await fetch(`${origin}/users`, {
                    method: 'POST',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        username: 'lastmjs',
                        age: 33
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 1
                };
            }
        },
        {
            name: '/users not empty',
            test: async () => {
                const response = await fetch(`${origin}/users`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.length === 1
                };
            }
        },
        {
            name: '/users/count 1',
            test: async () => {
                const response = await fetch(`${origin}/users/count`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 1
                };
            }
        },
        {
            name: '/users/1 not null',
            test: async () => {
                const response = await fetch(`${origin}/users/1`);
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 1 &&
                        responseJson.username === 'lastmjs' &&
                        responseJson.age === 33
                };
            }
        },
        {
            name: '/users/batch/999',
            test: async () => {
                const response = await fetch(`${origin}/users/batch/999`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok: responseJson.Success === '999 users created'
                };
            }
        },
        ...afterBatchTests(origin),
        {
            name: 'redeploy',
            prep: async () => {
                execSync(`dfx deploy --upgrade-unchanged`, {
                    stdio: 'inherit'
                });
            }
        },
        {
            name: '/init-state false',
            test: async () => {
                const response = await fetch(`${origin}/init-state`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === false
                };
            }
        },
        {
            name: '/post-upgrade-state true',
            test: async () => {
                const response = await fetch(`${origin}/post-upgrade-state`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === true
                };
            }
        },
        ...afterBatchTests(origin)
    ];
}

function afterBatchTests(origin: string): Test[] {
    return [
        {
            name: '/users not empty',
            test: async () => {
                const response = await fetch(`${origin}/users`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.length === 1_000
                };
            }
        },
        {
            name: '/users/count 1_000',
            test: async () => {
                const response = await fetch(`${origin}/users/count`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 1_000
                };
            }
        },
        {
            name: '/users/1000 not null',
            test: async () => {
                const response = await fetch(`${origin}/users/1000`);
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 1000 &&
                        typeof responseJson.username === 'string' &&
                        typeof responseJson.age === 'number'
                };
            }
        }
    ];
}
