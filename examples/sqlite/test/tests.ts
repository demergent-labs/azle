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
        ...usersTestsBeforeBatch(origin),
        ...postsTestsBeforeBatch(origin),
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
        {
            name: '/posts/batch/499',
            test: async () => {
                const response = await fetch(`${origin}/posts/batch/499`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok: responseJson.Success === '499 posts created'
                };
            }
        },
        ...usersTestsAfterBatch(origin),
        ...postsTestsAfterBatch(origin),
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
        ...usersTestsAfterBatch(origin),
        ...postsTestsAfterBatch(origin)
    ];
}

function usersTestsBeforeBatch(origin: string): Test[] {
    return [
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
        }
    ];
}

function postsTestsBeforeBatch(origin: string): Test[] {
    return [
        {
            name: '/posts empty',
            test: async () => {
                const response = await fetch(`${origin}/posts`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.length === 0
                };
            }
        },
        {
            name: '/posts/count 0',
            test: async () => {
                const response = await fetch(`${origin}/posts/count`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 0
                };
            }
        },
        {
            name: '/posts/1 null',
            test: async () => {
                const response = await fetch(`${origin}/posts/1`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === null
                };
            }
        },
        {
            name: '/posts post 1',
            test: async () => {
                const response = await fetch(`${origin}/posts`, {
                    method: 'POST',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        title: 'Post 1',
                        body: 'It is a very intriguing post yes'
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 1
                };
            }
        },
        {
            name: '/posts not empty',
            test: async () => {
                const response = await fetch(`${origin}/posts`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.length === 1
                };
            }
        },
        {
            name: '/posts/count 1',
            test: async () => {
                const response = await fetch(`${origin}/posts/count`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 1
                };
            }
        },
        {
            name: '/posts/1 not null',
            test: async () => {
                const response = await fetch(`${origin}/posts/1`);
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 1 &&
                        responseJson.title === 'Post 1' &&
                        responseJson.body ===
                            'It is a very intriguing post yes' &&
                        responseJson.user.id === 2 &&
                        responseJson.user.username.startsWith('lastmjs') &&
                        responseJson.user.age === 33
                };
            }
        }
    ];
}

function usersTestsAfterBatch(origin: string): Test[] {
    return [
        {
            name: '/users not empty',
            test: async () => {
                const response = await fetch(`${origin}/users`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.length === 1_500
                };
            }
        },
        {
            name: '/users/count 1_500',
            test: async () => {
                const response = await fetch(`${origin}/users/count`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 1_500
                };
            }
        },
        {
            name: '/users/1500 not null',
            test: async () => {
                const response = await fetch(`${origin}/users/1500`);
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 1_500 &&
                        typeof responseJson.username === 'string' &&
                        typeof responseJson.age === 'number'
                };
            }
        }
    ];
}

function postsTestsAfterBatch(origin: string): Test[] {
    return [
        {
            name: '/posts not empty',
            test: async () => {
                const response = await fetch(`${origin}/posts?limit=400`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.length === 400
                };
            }
        },
        {
            name: '/posts/count 500',
            test: async () => {
                const response = await fetch(`${origin}/posts/count`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 500
                };
            }
        },
        {
            name: '/posts/500 not null',
            test: async () => {
                const response = await fetch(`${origin}/posts/500`);
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 500 &&
                        typeof responseJson.title === 'string' &&
                        typeof responseJson.body === 'string'
                };
            }
        }
    ];
}
