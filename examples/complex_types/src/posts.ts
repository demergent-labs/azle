import { nat32, query, text, update, Vec } from 'azle';
import { Post } from './candid_types';
import { getReactionFromStateReaction } from './reactions';
import { state, StatePost, StateThread, StateUser } from './state';
import { getThreadFromStateThread } from './threads';
import { getUserFromStateUser } from './users';

export const createPost = update(
    [text, text, text, nat32],
    Post,
    (authorId, text, threadId, joinDepth) => {
        const id = Object.keys(state.posts).length.toString();

        const statePost: StatePost = {
            id,
            authorId,
            reactionIds: [],
            text,
            threadId
        };
        const updatedStateAuthor = getUpdatedStateAuthor(
            authorId,
            statePost.id
        );
        const updatedStateThread = getUpdatedStateThread(
            threadId,
            statePost.id
        );

        state.posts[id] = statePost;
        state.users[authorId] = updatedStateAuthor;
        state.threads[threadId] = updatedStateThread;

        const post = getPostFromStatePost(statePost, joinDepth);

        return post;
    }
);

export const getAllPosts = query([nat32], Vec(Post), (joinDepth) => {
    return Object.values(state.posts).map((statePost) =>
        getPostFromStatePost(statePost, joinDepth)
    );
});

export function getPostFromStatePost(
    statePost: StatePost,
    joinDepth: nat32
): typeof Post {
    const stateAuthor = state.users[statePost.authorId];
    const author = getUserFromStateUser(stateAuthor, joinDepth);

    const stateThread = state.threads[statePost.threadId];
    const thread = getThreadFromStateThread(stateThread, joinDepth);

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
            .map((reactionId) => state.reactions[reactionId])
            .map((stateReaction) =>
                getReactionFromStateReaction(stateReaction, joinDepth - 1)
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

function getUpdatedStateAuthor(authorId: string, postId: string): StateUser {
    const stateAuthor = state.users[authorId];
    const updatedStateAuthor: StateUser = {
        ...stateAuthor,
        postIds: [...stateAuthor.postIds, postId]
    };

    return updatedStateAuthor;
}

function getUpdatedStateThread(threadId: string, postId: string): StateThread {
    const stateThread = state.threads[threadId];
    const updatedStateThread: StateThread = {
        ...stateThread,
        postIds: [...stateThread.postIds, postId]
    };

    return updatedStateThread;
}
