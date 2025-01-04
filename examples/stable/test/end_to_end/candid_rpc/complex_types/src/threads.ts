import Canister from '.';
import { Thread } from './candid_types';
import { getPostFromStatePost } from './posts';
import { StateThread, StateUser } from './state';
import { getUserFromStateUser } from './users';

export function createThread(
    canister: Canister,
    title: string,
    authorId: string,
    joinDepth: number
): Thread {
    const id = Object.keys(canister.state.threads).length.toString();

    const stateThread: StateThread = {
        id,
        authorId,
        postIds: [],
        title
    };
    const updatedStateAuthor = getUpdatedStateAuthor(
        canister,
        authorId,
        stateThread.id
    );

    canister.state.threads[id] = stateThread;
    canister.state.users[authorId] = updatedStateAuthor;

    const thread = getThreadFromStateThread(canister, stateThread, joinDepth);

    return thread;
}

export function getAllThreads(canister: Canister, joinDepth: number): Thread[] {
    return Object.values(canister.state.threads).map((stateThread) =>
        getThreadFromStateThread(canister, stateThread!, joinDepth)
    );
}

export function getThreadFromStateThread(
    canister: Canister,
    stateThread: StateThread,
    joinDepth: number
): Thread {
    const stateAuthor = canister.state.users[stateThread.authorId];

    if (stateAuthor === undefined) {
        throw new Error('Author not found');
    }

    const author = getUserFromStateUser(canister, stateAuthor, joinDepth);

    if (joinDepth === 0) {
        return {
            id: stateThread.id,
            author,
            posts: [],
            title: stateThread.title
        };
    } else {
        const posts = stateThread.postIds
            .map((postId) => canister.state.posts[postId])
            .map((statePost) =>
                getPostFromStatePost(canister, statePost!, joinDepth - 1)
            );

        return {
            id: stateThread.id,
            author,
            posts,
            title: stateThread.title
        };
    }
}

function getUpdatedStateAuthor(
    canister: Canister,
    authorId: string,
    threadId: string
): StateUser {
    const stateAuthor = canister.state.users[authorId];

    if (stateAuthor === undefined) {
        throw new Error('Author not found');
    }

    const updatedStateAuthor: StateUser = {
        ...stateAuthor,
        threadIds: [...stateAuthor.threadIds, threadId]
    };

    return updatedStateAuthor;
}
