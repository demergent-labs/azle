import { nat32, query, text, update, Vec } from 'azle';
import { Thread } from './candid_types';
import { getPostFromStatePost } from './posts';
import { state, StateThread, StateUser } from './state';
import { getUserFromStateUser } from './users';

export const createThread = update(
    [text, text, nat32],
    Thread,
    (title, authorId, joinDepth) => {
        const id = Object.keys(state.threads).length.toString();

        const stateThread: StateThread = {
            id,
            authorId,
            postIds: [],
            title
        };
        const updatedStateAuthor = getUpdatedStateAuthor(
            authorId,
            stateThread.id
        );

        state.threads[id] = stateThread;
        state.users[authorId] = updatedStateAuthor;

        const thread = getThreadFromStateThread(stateThread, joinDepth);

        return thread;
    }
);

export const getAllThreads = query([nat32], Vec(Thread), (joinDepth) => {
    return Object.values(state.threads).map((stateThread) =>
        getThreadFromStateThread(stateThread, joinDepth)
    );
});

export function getThreadFromStateThread(
    stateThread: StateThread,
    joinDepth: nat32
): typeof Thread {
    const stateAuthor = state.users[stateThread.authorId];
    const author = getUserFromStateUser(stateAuthor, joinDepth);

    if (joinDepth === 0) {
        return {
            id: stateThread.id,
            author,
            posts: [],
            title: stateThread.title
        };
    } else {
        const posts = stateThread.postIds
            .map((postId) => state.posts[postId])
            .map((statePost) => getPostFromStatePost(statePost, joinDepth - 1));

        return {
            id: stateThread.id,
            author,
            posts,
            title: stateThread.title
        };
    }
}

function getUpdatedStateAuthor(authorId: string, threadId: string): StateUser {
    const stateAuthor = state.users[authorId];
    const updatedStateAuthor: StateUser = {
        ...stateAuthor,
        threadIds: [...stateAuthor.threadIds, threadId]
    };

    return updatedStateAuthor;
}
