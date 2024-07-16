import { describe } from '@jest/globals';
import { expect, it, please, Test } from 'azle/test';
import { execSync } from 'child_process';

const USERS_BATCH_AMOUNT = 499;
const POSTS_BATCH_AMOUNT = 299;

const UUID_V4_PATTERN =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('/init-called true', async () => {
            const response = await fetch(`${origin}/init-called`);
            const responseJson = await response.json();

            expect(responseJson).toBe(true);
        });

        it('/post-upgrade-called false', async () => {
            const response = await fetch(`${origin}/post-upgrade-called`);
            const responseJson = await response.json();

            expect(responseJson).toBe(false);
        });

        describe(
            'user tests before batch create',
            usersTestsBeforeBatch(origin)
        );

        describe(
            'posts tests before batch create',
            postsTestsBeforeBatch(origin)
        );

        it(`/users/batch/${USERS_BATCH_AMOUNT}`, async () => {
            const response = await fetch(
                `${origin}/users/batch/${USERS_BATCH_AMOUNT}`,
                {
                    method: 'POST'
                }
            );
            const responseJson = await response.json();

            expect(responseJson.Success).toBe(
                `${USERS_BATCH_AMOUNT} users created`
            );
        }, 10_000);

        it(`/posts/batch/${POSTS_BATCH_AMOUNT}`, async () => {
            const response = await fetch(
                `${origin}/posts/batch/${POSTS_BATCH_AMOUNT}`,
                {
                    method: 'POST'
                }
            );
            const responseJson = await response.json();

            expect(responseJson.Success).toBe(
                `${POSTS_BATCH_AMOUNT} posts created`
            );
        }, 20_000);

        describe('user tests after batch create', usersTestsAfterBatch(origin));

        describe(
            'posts tests before batch create',
            postsTestsAfterBatch(origin)
        );

        please('redeploy', async () => {
            execSync(`dfx deploy --upgrade-unchanged`, {
                stdio: 'inherit'
            });
        });

        it('/init-called false', async () => {
            const response = await fetch(`${origin}/init-called`);
            const responseJson = await response.json();

            expect(responseJson).toBe(false);
        });

        it('/post-upgrade-called true', async () => {
            const response = await fetch(`${origin}/post-upgrade-called`);
            const responseJson = await response.json();

            expect(responseJson).toBe(true);
        });

        describe(
            'user tests after batch create and redeploy',
            usersTestsAfterBatch(origin)
        );

        describe(
            'posts tests after batch create and redeploy',
            postsTestsAfterBatch(origin)
        );

        it('/users delete', async () => {
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

            expect(deleteUserResponseJson).toBe(createUserResponseJson.id);
        }, 10_000);

        it('/posts delete', async () => {
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

            expect(deletePostResponseJson).toBe(createPostResponseJson.id);
        });
    };
}

function usersTestsBeforeBatch(origin: string): Test {
    return () => {
        it('/users empty', async () => {
            const response = await fetch(`${origin}/users`);
            const responseJson = await response.json();

            expect(responseJson).toHaveLength(0);
        });

        it('/users/count 0', async () => {
            const response = await fetch(`${origin}/users/count`);
            const responseJson = await response.json();

            expect(responseJson).toBe(0);
        });

        it('/users/1 null', async () => {
            const response = await fetch(`${origin}/users/1`);
            const responseJson = await response.json();

            expect(responseJson).toBeNull();
        });

        it('/users post 1', async () => {
            const response = await fetch(`${origin}/users`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    username: 'lastmjs',
                    age: 33
                })
            });
            const responseJson = await response.json();

            expect(responseJson).toEqual({
                id: 1,
                username: 'lastmjs',
                age: 33
            });
        });

        it('/users put 1', async () => {
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

            expect(responseJson).toEqual({
                id: 1,
                username: 'lastmjs_updated',
                age: 34
            });
        });

        it('/users patch 1', async () => {
            const response = await fetch(`${origin}/users`, {
                method: 'PUT',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    id: 1,
                    age: 35
                })
            });
            const responseJson = await response.json();

            expect(responseJson).toEqual({
                id: 1,
                username: 'lastmjs_updated',
                age: 35
            });
        });

        it('/users not empty', async () => {
            const response = await fetch(`${origin}/users`);
            const responseJson = await response.json();

            expect(responseJson).toHaveLength(1);
        });

        it('/users/count 1', async () => {
            const response = await fetch(`${origin}/users/count`);
            const responseJson = await response.json();

            expect(responseJson).toBe(1);
        });

        it('/users/1 not null', async () => {
            const response = await fetch(`${origin}/users/1`);
            const responseJson = await response.json();

            expect(responseJson).toEqual({
                id: 1,
                username: 'lastmjs_updated',
                age: 35
            });
        });
    };
}

function postsTestsBeforeBatch(origin: string): Test {
    return () => {
        it('/posts empty', async () => {
            const response = await fetch(`${origin}/posts`);
            const responseJson = await response.json();

            expect(responseJson).toHaveLength(0);
        });

        it('/posts/count 0', async () => {
            const response = await fetch(`${origin}/posts/count`);
            const responseJson = await response.json();

            expect(responseJson).toBe(0);
        });

        it('/posts/1 null', async () => {
            const response = await fetch(`${origin}/posts/1`);
            const responseJson = await response.json();

            expect(responseJson).toBeNull();
        });

        it('/posts post 1', async () => {
            const response = await fetch(`${origin}/posts`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    title: 'Post 1',
                    body: 'It is a very intriguing post yes'
                })
            });
            const responseJson = await response.json();

            const expectedResult = {
                id: 1,
                title: 'Post 1',
                body: 'It is a very intriguing post yes',
                user: {
                    age: 33,
                    username: expect.stringMatching(
                        `^lastmjs${UUID_V4_PATTERN.source}$`
                    ),
                    id: 2
                }
            };

            expect(responseJson).toEqual(expectedResult);
        });

        it('/posts put 1', async () => {
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

            const expectedResult = {
                id: 1,
                title: 'Post 1 title has changed',
                body: 'Post 1 body has changed',
                user: {
                    id: 1,
                    username: 'lastmjs_updated',
                    age: 35
                }
            };

            expect(responseJson).toEqual(expectedResult);
        });

        it('/posts patch 1', async () => {
            const response = await fetch(`${origin}/posts`, {
                method: 'PUT',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    id: 1,
                    title: 'Post 1 title has changed again'
                })
            });
            const responseJson = await response.json();

            const expectedResult = {
                id: 1,
                title: 'Post 1 title has changed again',
                body: 'Post 1 body has changed',
                user: {
                    id: 1,
                    username: 'lastmjs_updated',
                    age: 35
                }
            };

            expect(responseJson).toEqual(expectedResult);
        });

        it('/posts not empty', async () => {
            const response = await fetch(`${origin}/posts`);
            const responseJson = await response.json();

            expect(responseJson).toHaveLength(1);
        });

        it('/posts/count 1', async () => {
            const response = await fetch(`${origin}/posts/count`);
            const responseJson = await response.json();

            expect(responseJson).toBe(1);
        });

        it('/posts/1 not null', async () => {
            const response = await fetch(`${origin}/posts/1`);
            const responseJson = await response.json();

            const expectedResult = {
                id: 1,
                title: 'Post 1 title has changed again',
                body: 'Post 1 body has changed',
                user: {
                    id: 1,
                    username: 'lastmjs_updated',
                    age: 35
                }
            };

            expect(responseJson).toEqual(expectedResult);
        });
    };
}

function usersTestsAfterBatch(origin: string): Test {
    const totalNumUsers = USERS_BATCH_AMOUNT + 1 + POSTS_BATCH_AMOUNT + 1;
    const maxBatchAge = POSTS_BATCH_AMOUNT - 1;

    return () => {
        it('/users not empty', async () => {
            const response = await fetch(`${origin}/users`);
            const responseJson = await response.json();

            expect(responseJson.length).toBe(totalNumUsers);
        });

        it(`/users/count ${totalNumUsers}`, async () => {
            const response = await fetch(`${origin}/users/count`);
            const responseJson = await response.json();

            expect(responseJson).toBe(totalNumUsers);
        });

        it(`/users/${totalNumUsers} not null`, async () => {
            const response = await fetch(`${origin}/users/${totalNumUsers}`);
            const responseJson = await response.json();

            expect(responseJson).toEqual({
                id: totalNumUsers,
                username: expect.stringMatching(
                    new RegExp(`^lastmjs${UUID_V4_PATTERN.source}$`)
                ),
                age: maxBatchAge
            });
        });
    };
}

function postsTestsAfterBatch(origin: string): Test {
    const totalNumPosts = POSTS_BATCH_AMOUNT + 1;
    const limit = totalNumPosts - 99; // to not hit the instruction limit
    const totalNumUsers = USERS_BATCH_AMOUNT + 1 + POSTS_BATCH_AMOUNT + 1;
    const maxBatchAge = POSTS_BATCH_AMOUNT - 1;

    return () => {
        it('/posts not empty', async () => {
            const response = await fetch(`${origin}/posts?limit=${limit}`);
            const responseJson = await response.json();

            expect(responseJson.length).toBe(limit);
        });

        it(`/posts/count ${totalNumPosts}`, async () => {
            const response = await fetch(`${origin}/posts/count`);
            const responseJson = await response.json();

            expect(responseJson).toBe(totalNumPosts);
        });

        it(`/posts/${totalNumPosts} not null`, async () => {
            const response = await fetch(`${origin}/posts/${totalNumPosts}`);
            const responseJson = await response.json();

            expect(responseJson).toEqual({
                id: totalNumPosts,
                title: expect.stringMatching(
                    new RegExp(`^Post ${UUID_V4_PATTERN.source}$`)
                ),
                body: expect.stringMatching(
                    new RegExp(
                        `^${UUID_V4_PATTERN.source}${UUID_V4_PATTERN.source}${UUID_V4_PATTERN.source}${UUID_V4_PATTERN.source}$`
                    )
                ),
                user: expect.objectContaining({
                    id: totalNumUsers,
                    age: maxBatchAge,
                    username: expect.stringMatching(
                        new RegExp(`^lastmjs${UUID_V4_PATTERN.source}$`)
                    )
                })
            });
        });
    };
}
