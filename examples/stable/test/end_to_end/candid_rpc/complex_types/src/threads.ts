import { IDL, query, update } from 'azle';

import { Thread } from './candid_types';
import { getPostFromStatePost } from './posts';
import { state, StateThread, StateUser } from './state';
import { getUserFromStateUser } from './users';

export class Threads {
    @update([IDL.Text, IDL.Text, IDL.Nat32], Thread)
    createThread(title: string, authorId: string, joinDepth: number): Thread {
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

    @query([IDL.Nat32], IDL.Vec(Thread))
    getAllThreads(joinDepth: number): Thread[] {
        return Object.values(state.threads).map((stateThread) =>
            getThreadFromStateThread(stateThread!, joinDepth)
        );
    }
}

export function getThreadFromStateThread(
    stateThread: StateThread,
    joinDepth: number
): Thread {
    const stateAuthor = state.users[stateThread.authorId];

    if (stateAuthor === undefined) {
        throw new Error('Author not found');
    }

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
            .map((statePost) =>
                getPostFromStatePost(statePost!, joinDepth - 1)
            );

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

    if (stateAuthor === undefined) {
        throw new Error('Author not found');
    }

    const updatedStateAuthor: StateUser = {
        ...stateAuthor,
        threadIds: [...stateAuthor.threadIds, threadId]
    };

    return updatedStateAuthor;
}
