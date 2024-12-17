import { User } from './candid_types';
import { getPostFromStatePost } from './posts';
import { getReactionFromStateReaction } from './reactions';
import { state, StateUser } from './state';
import { getThreadFromStateThread } from './threads';

export function createUser(username: string, joinDepth: number): User {
    const id = Object.keys(state.users).length.toString();

    const stateUser: StateUser = {
        id,
        postIds: [],
        reactionIds: [],
        threadIds: [],
        username
    };

    state.users[id] = stateUser;

    const user = getUserFromStateUser(stateUser, joinDepth);

    return user;
}

export function getAllUsers(joinDepth: number): User[] {
    return Object.values(state.users).map((stateUser) =>
        getUserFromStateUser(stateUser!, joinDepth)
    );
}

export function getUserFromStateUser(
    stateUser: StateUser,
    joinDepth: number
): User {
    if (joinDepth === 0) {
        return {
            id: stateUser.id,
            posts: [],
            reactions: [],
            threads: [],
            username: stateUser.username
        };
    } else {
        const posts = stateUser.postIds
            .map((postId) => state.posts[postId])
            .map((statePost) =>
                getPostFromStatePost(statePost!, joinDepth - 1)
            );

        const reactions = stateUser.reactionIds
            .map((reactionId) => state.reactions[reactionId])
            .map((stateReaction) =>
                getReactionFromStateReaction(stateReaction!, joinDepth - 1)
            );

        const threads = stateUser.threadIds
            .map((threadId) => state.threads[threadId])
            .map((stateThread) =>
                getThreadFromStateThread(stateThread!, joinDepth - 1)
            );

        return {
            id: stateUser.id,
            posts,
            reactions,
            threads,
            username: stateUser.username
        };
    }
}
