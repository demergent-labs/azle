import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

import { Post, Reaction, Thread, User } from '../src/candid_types';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/complex_types/complex_types.did.d';

const USER: User = {
    id: '0',
    username: 'user1',
    threads: [],
    posts: [],
    reactions: []
};

const THREAD: Thread = {
    author: USER,
    id: '0',
    posts: [],
    title: 'test thread'
};

const POST: Post = {
    id: '0',
    author: USER,
    reactions: [],
    text: 'this is a post',
    thread: THREAD
};

const REACTION: Reaction = {
    author: USER,
    id: '0',
    post: POST,
    reactionType: { ThumbsUp: null }
};

export function getTests(complexTypesCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('verifies that there are no stored complex variables yet', async () => {
            const posts = await complexTypesCanister.getAllPosts(0);
            const reactions = await complexTypesCanister.getAllReactions(0);
            const threads = await complexTypesCanister.getAllThreads(0);
            const users = await complexTypesCanister.getAllUsers(0);

            expect(posts).toHaveLength(0);
            expect(reactions).toHaveLength(0);
            expect(threads).toHaveLength(0);
            expect(users).toHaveLength(0);
        });

        it('creates and stores a user with a complex type', async () => {
            const user = await complexTypesCanister.createUser(
                USER.username,
                0
            );
            const thread = await complexTypesCanister.createThread(
                THREAD.title,
                user.id,
                0
            );
            const post = await complexTypesCanister.createPost(
                user.id,
                POST.text,
                thread.id,
                0
            );
            const reaction = await complexTypesCanister.createReaction(
                user.id,
                post.id,
                REACTION.reactionType,
                0
            );

            expect(user).toStrictEqual(USER);
            expect(thread).toStrictEqual(THREAD);
            expect(post).toStrictEqual(POST);
            expect(reaction).toStrictEqual(REACTION);
        }, 100_000);

        it('recalls the stored complex values', async () => {
            const posts = await complexTypesCanister.getAllPosts(0);
            const reactions = await complexTypesCanister.getAllReactions(0);
            const threads = await complexTypesCanister.getAllThreads(0);
            const users = await complexTypesCanister.getAllUsers(0);

            // NOTE: These only work because the joinDepth is set to 0. If the
            // join depth is any higher then we will get some self referencing
            // objects that are challenging to test.
            expect(posts).toStrictEqual([POST]);
            expect(reactions).toStrictEqual([REACTION]);
            expect(threads).toStrictEqual([THREAD]);
            expect(users).toStrictEqual([USER]);
        });
    };
}
