import Canister from '.';
import { User } from './candid_types';
import { getPostFromStatePost } from './posts';
import { getReactionFromStateReaction } from './reactions';
import { StateUser } from './state';
import { getThreadFromStateThread } from './threads';

export function createUser(
    canister: Canister,
    username: string,
    joinDepth: number
): User {
    const id = Object.keys(canister.state.users).length.toString();

    const stateUser: StateUser = {
        id,
        postIds: [],
        reactionIds: [],
        threadIds: [],
        username
    };

    canister.state.users[id] = stateUser;

    const user = getUserFromStateUser(canister, stateUser, joinDepth);

    return user;
}

export function getAllUsers(canister: Canister, joinDepth: number): User[] {
    return Object.values(canister.state.users).map((stateUser) =>
        getUserFromStateUser(canister, stateUser!, joinDepth)
    );
}

export function getUserFromStateUser(
    canister: Canister,
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
            .map((postId) => canister.state.posts[postId])
            .map((statePost) =>
                getPostFromStatePost(canister, statePost!, joinDepth - 1)
            );

        const reactions = stateUser.reactionIds
            .map((reactionId) => canister.state.reactions[reactionId])
            .map((stateReaction) =>
                getReactionFromStateReaction(
                    canister,
                    stateReaction!,
                    joinDepth - 1
                )
            );

        const threads = stateUser.threadIds
            .map((threadId) => canister.state.threads[threadId])
            .map((stateThread) =>
                getThreadFromStateThread(canister, stateThread!, joinDepth - 1)
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
