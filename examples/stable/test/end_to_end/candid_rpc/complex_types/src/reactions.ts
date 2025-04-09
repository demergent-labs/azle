import { IDL, query, update } from 'azle';

import { Reaction, ReactionType } from './candid_types';
import { getPostFromStatePost } from './posts';
import { state, StatePost, StateReaction, StateUser } from './state';
import { getUserFromStateUser } from './users';

export class Reactions {
    @update([IDL.Text, IDL.Text, ReactionType, IDL.Nat32], Reaction)
    createReaction(
        authorId: string,
        postId: string,
        reactionType: ReactionType,
        joinDepth: number
    ): Reaction {
        const id = Object.keys(state.reactions).length.toString();

        const stateReaction: StateReaction = {
            id,
            authorId,
            postId,
            reactionType
        };
        const updatedStateAuthor = getUpdatedStateAuthor(
            authorId,
            stateReaction.id
        );
        const updatedStatePost = getUpdatedStatePost(postId, stateReaction.id);

        state.reactions[id] = stateReaction;
        state.users[authorId] = updatedStateAuthor;
        state.posts[postId] = updatedStatePost;

        const reaction = getReactionFromStateReaction(stateReaction, joinDepth);

        return reaction;
    }

    @query([IDL.Nat32], IDL.Vec(Reaction))
    getAllReactions(joinDepth: number): Reaction[] {
        return Object.values(state.reactions).map((stateReaction) =>
            getReactionFromStateReaction(stateReaction!, joinDepth)
        );
    }
}

export function getReactionFromStateReaction(
    stateReaction: StateReaction,
    joinDepth: number
): Reaction {
    const stateAuthor = state.users[stateReaction.authorId];

    if (stateAuthor === undefined) {
        throw new Error('Author not found');
    }

    const author = getUserFromStateUser(stateAuthor, joinDepth);

    const statePost = state.posts[stateReaction.postId];

    if (statePost === undefined) {
        throw new Error('Post not found');
    }

    const post = getPostFromStatePost(statePost, joinDepth);

    return {
        id: stateReaction.id,
        author,
        post,
        reactionType: stateReaction.reactionType
    };
}

function getUpdatedStateAuthor(
    authorId: string,
    reactionId: string
): StateUser {
    const stateAuthor = state.users[authorId];

    if (stateAuthor === undefined) {
        throw new Error('Author not found');
    }

    const updatedStateAuthor: StateUser = {
        ...stateAuthor,
        reactionIds: [...stateAuthor.reactionIds, reactionId]
    };

    return updatedStateAuthor;
}

function getUpdatedStatePost(postId: string, reactionId: string): StatePost {
    const statePost = state.posts[postId];

    if (statePost === undefined) {
        throw new Error('Post not found');
    }

    const updatedStatePost: StatePost = {
        ...statePost,
        reactionIds: [...statePost.reactionIds, reactionId]
    };

    return updatedStatePost;
}
