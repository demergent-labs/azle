import Canister from '.';
import { Reaction, ReactionType } from './candid_types';
import { getPostFromStatePost } from './posts';
import { StatePost, StateReaction, StateUser } from './state';
import { getUserFromStateUser } from './users';

export function createReaction(
    canister: Canister,
    authorId: string,
    postId: string,
    reactionType: ReactionType,
    joinDepth: number
): Reaction {
    const id = Object.keys(canister.state.reactions).length.toString();

    const stateReaction: StateReaction = {
        id,
        authorId,
        postId,
        reactionType
    };
    const updatedStateAuthor = getUpdatedStateAuthor(
        canister,
        authorId,
        stateReaction.id
    );
    const updatedStatePost = getUpdatedStatePost(
        canister,
        postId,
        stateReaction.id
    );

    canister.state.reactions[id] = stateReaction;
    canister.state.users[authorId] = updatedStateAuthor;
    canister.state.posts[postId] = updatedStatePost;

    const reaction = getReactionFromStateReaction(
        canister,
        stateReaction,
        joinDepth
    );

    return reaction;
}

export function getAllReactions(
    canister: Canister,
    joinDepth: number
): Reaction[] {
    return Object.values(canister.state.reactions).map((stateReaction) =>
        getReactionFromStateReaction(canister, stateReaction!, joinDepth)
    );
}

export function getReactionFromStateReaction(
    canister: Canister,
    stateReaction: StateReaction,
    joinDepth: number
): Reaction {
    const stateAuthor = canister.state.users[stateReaction.authorId];

    if (stateAuthor === undefined) {
        throw new Error('Author not found');
    }

    const author = getUserFromStateUser(canister, stateAuthor, joinDepth);

    const statePost = canister.state.posts[stateReaction.postId];

    if (statePost === undefined) {
        throw new Error('Post not found');
    }

    const post = getPostFromStatePost(canister, statePost, joinDepth);

    return {
        id: stateReaction.id,
        author,
        post,
        reactionType: stateReaction.reactionType
    };
}

function getUpdatedStateAuthor(
    canister: Canister,
    authorId: string,
    reactionId: string
): StateUser {
    const stateAuthor = canister.state.users[authorId];

    if (stateAuthor === undefined) {
        throw new Error('Author not found');
    }

    const updatedStateAuthor: StateUser = {
        ...stateAuthor,
        reactionIds: [...stateAuthor.reactionIds, reactionId]
    };

    return updatedStateAuthor;
}

function getUpdatedStatePost(
    canister: Canister,
    postId: string,
    reactionId: string
): StatePost {
    const statePost = canister.state.posts[postId];

    if (statePost === undefined) {
        throw new Error('Post not found');
    }

    const updatedStatePost: StatePost = {
        ...statePost,
        reactionIds: [...statePost.reactionIds, reactionId]
    };

    return updatedStatePost;
}
