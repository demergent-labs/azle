import Canister from '.';
import { Post } from './candid_types';
import { getReactionFromStateReaction } from './reactions';
import { StatePost, StateThread, StateUser } from './state';
import { getThreadFromStateThread } from './threads';
import { getUserFromStateUser } from './users';

export function createPost(
    canister: Canister,
    authorId: string,
    text: string,
    threadId: string,
    joinDepth: number
): Post {
    const id = Object.keys(canister.state.posts).length.toString();

    const statePost: StatePost = {
        id,
        authorId,
        reactionIds: [],
        text,
        threadId
    };
    const updatedStateAuthor = getUpdatedStateAuthor(
        canister,
        authorId,
        statePost.id
    );
    const updatedStateThread = getUpdatedStateThread(
        canister,
        threadId,
        statePost.id
    );

    canister.state.posts[id] = statePost;
    canister.state.users[authorId] = updatedStateAuthor;
    canister.state.threads[threadId] = updatedStateThread;

    const post = getPostFromStatePost(canister, statePost, joinDepth);

    return post;
}

export function getAllPosts(canister: Canister, joinDepth: number): Post[] {
    return Object.values(canister.state.posts).map((statePost) =>
        getPostFromStatePost(canister, statePost!, joinDepth)
    );
}

export function getPostFromStatePost(
    canister: Canister,
    statePost: StatePost,
    joinDepth: number
): Post {
    const stateAuthor = canister.state.users[statePost.authorId];

    if (stateAuthor === undefined) {
        throw new Error('Author not found');
    }

    const author = getUserFromStateUser(canister, stateAuthor, joinDepth);

    const stateThread = canister.state.threads[statePost.threadId];

    if (stateThread === undefined) {
        throw new Error('Thread not found');
    }

    const thread = getThreadFromStateThread(canister, stateThread, joinDepth);

    if (joinDepth === 0) {
        return {
            id: statePost.id,
            author,
            reactions: [],
            text: statePost.text,
            thread
        };
    } else {
        const reactions = statePost.reactionIds
            .map((reactionId) => canister.state.reactions[reactionId])
            .map((stateReaction) =>
                getReactionFromStateReaction(
                    canister,
                    stateReaction!,
                    joinDepth - 1
                )
            );

        return {
            id: statePost.id,
            author,
            reactions,
            text: statePost.text,
            thread
        };
    }
}

function getUpdatedStateAuthor(
    canister: Canister,
    authorId: string,
    postId: string
): StateUser {
    const stateAuthor = canister.state.users[authorId];

    if (stateAuthor === undefined) {
        throw new Error('Author not found');
    }

    const updatedStateAuthor: StateUser = {
        ...stateAuthor,
        postIds: [...stateAuthor.postIds, postId]
    };

    return updatedStateAuthor;
}

function getUpdatedStateThread(
    canister: Canister,
    threadId: string,
    postId: string
): StateThread {
    const stateThread = canister.state.threads[threadId];

    if (stateThread === undefined) {
        throw new Error('Thread not found');
    }

    const updatedStateThread: StateThread = {
        ...stateThread,
        postIds: [...stateThread.postIds, postId]
    };

    return updatedStateThread;
}
