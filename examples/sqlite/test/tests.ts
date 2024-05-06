import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';
import { execSync } from 'child_process';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/init-called true',
            test: async () => {
                const response = await fetch(`${origin}/init-called`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === true
                };
            }
        },
        {
            name: '/post-upgrade-called false',
            test: async () => {
                const response = await fetch(`${origin}/post-upgrade-called`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === false
                };
            }
        },
        ...usersTestsBeforeBatch(origin),
        ...postsTestsBeforeBatch(origin),
        {
            name: '/users/batch/499',
            test: async () => {
                const response = await fetch(`${origin}/users/batch/499`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok: responseJson.Success === '499 users created'
                };
            }
        },
        {
            name: '/posts/batch/299',
            test: async () => {
                const response = await fetch(`${origin}/posts/batch/299`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok: responseJson.Success === '299 posts created'
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
            name: '/init-called false',
            test: async () => {
                const response = await fetch(`${origin}/init-called`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === false
                };
            }
        },
        {
            name: '/post-upgrade-called true',
            test: async () => {
                const response = await fetch(`${origin}/post-upgrade-called`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === true
                };
            }
        },
        ...usersTestsAfterBatch(origin),
        ...postsTestsAfterBatch(origin),
        {
            name: '/users delete',
            test: async () => {
                const createUserResponse = await fetch(`${origin}/users`, {
                    method: 'POST',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        username: 'lastmjs_about_to_delete',
                        age: 33
                    })
                });
                const createUserResponseJson = await createUserResponse.json();

                const deleteUserResponse = await fetch(`${origin}/users`, {
                    method: 'DELETE',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        id: createUserResponseJson.id
                    })
                });
                const deleteUserResponseJson = await deleteUserResponse.json();

                return {
                    Ok: deleteUserResponseJson === createUserResponseJson.id
                };
            }
        },
        {
            name: '/posts delete',
            test: async () => {
                const createPostResponse = await fetch(`${origin}/posts`, {
                    method: 'POST',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        title: 'Post about to be deleted',
                        body: 'Body will be deleted with post'
                    })
                });
                const createPostResponseJson = await createPostResponse.json();

                const deletePostResponse = await fetch(`${origin}/posts`, {
                    method: 'DELETE',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        id: createPostResponseJson.id
                    })
                });
                const deletePostResponseJson = await deletePostResponse.json();

                return {
                    Ok: deletePostResponseJson === createPostResponseJson.id
                };
            }
        }
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
                    Ok:
                        responseJson.id === 1 &&
                        responseJson.username === 'lastmjs' &&
                        responseJson.age === 33
                };
            }
        },
        {
            name: '/users put 1',
            test: async () => {
                const response = await fetch(`${origin}/users`, {
                    method: 'PUT',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        id: 1,
                        username: 'lastmjs_updated',
                        age: 34
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 1 &&
                        responseJson.username === 'lastmjs_updated' &&
                        responseJson.age === 34
                };
            }
        },
        {
            name: '/users patch 1',
            test: async () => {
                const response = await fetch(`${origin}/users`, {
                    method: 'PUT',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        id: 1,
                        age: 35
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 1 &&
                        responseJson.username === 'lastmjs_updated' &&
                        responseJson.age === 35
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
                        responseJson.username === 'lastmjs_updated' &&
                        responseJson.age === 35
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
                    Ok:
                        responseJson.id === 1 &&
                        responseJson.title === 'Post 1' &&
                        responseJson.body ===
                            'It is a very intriguing post yes' &&
                        responseJson.user.id === 2 &&
                        typeof responseJson.user.username === 'string' &&
                        typeof responseJson.user.age === 'number'
                };
            }
        },
        {
            name: '/posts put 1',
            test: async () => {
                const response = await fetch(`${origin}/posts`, {
                    method: 'PUT',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        id: 1,
                        user_id: 1,
                        title: 'Post 1 title has changed',
                        body: 'Post 1 body has changed'
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 1 &&
                        responseJson.title === 'Post 1 title has changed' &&
                        responseJson.body === 'Post 1 body has changed' &&
                        responseJson.user.id === 1 &&
                        responseJson.user.username === 'lastmjs_updated' &&
                        responseJson.user.age === 35
                };
            }
        },
        {
            name: '/posts patch 1',
            test: async () => {
                const response = await fetch(`${origin}/posts`, {
                    method: 'PUT',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        id: 1,
                        title: 'Post 1 title has changed again'
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 1 &&
                        responseJson.title ===
                            'Post 1 title has changed again' &&
                        responseJson.body === 'Post 1 body has changed' &&
                        responseJson.user.id === 1 &&
                        responseJson.user.username === 'lastmjs_updated' &&
                        responseJson.user.age === 35
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
                        responseJson.title ===
                            'Post 1 title has changed again' &&
                        responseJson.body === 'Post 1 body has changed' &&
                        responseJson.user.id === 1 &&
                        responseJson.user.username === 'lastmjs_updated' &&
                        responseJson.user.age === 35
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
                    Ok: responseJson.length === 800
                };
            }
        },
        {
            name: '/users/count 800',
            test: async () => {
                const response = await fetch(`${origin}/users/count`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 800
                };
            }
        },
        {
            name: '/users/800 not null',
            test: async () => {
                const response = await fetch(`${origin}/users/800`);
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 800 &&
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
                const response = await fetch(`${origin}/posts?limit=200`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.length === 200
                };
            }
        },
        {
            name: '/posts/count 300',
            test: async () => {
                const response = await fetch(`${origin}/posts/count`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson === 300
                };
            }
        },
        {
            name: '/posts/300 not null',
            test: async () => {
                const response = await fetch(`${origin}/posts/300`);
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.id === 300 &&
                        typeof responseJson.title === 'string' &&
                        typeof responseJson.body === 'string' &&
                        typeof responseJson.user.id === 'number' &&
                        typeof responseJson.user.username === 'string' &&
                        typeof responseJson.user.age === 'number'
                };
            }
        }
    ];
}
