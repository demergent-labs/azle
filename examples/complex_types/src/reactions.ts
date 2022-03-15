import {
    Query,
    Update,
    u32
} from 'azle';
import {
    Reaction,
    Reactions,
    ReactionType
} from './candid_types';
import { getPostFromStatePost } from './posts';
import {
    state,
    StateReaction
} from './state';
import { getUserFromStateUser } from './users';

export function createReaction(
    authorId: string,
    postId: string,
    reactionType: ReactionType,
    joinDepth: u32
): Update<Reaction> {
    const id = Object.keys(state.posts).length.toString();

    const stateReaction = {
        id,
        authorId,
        postId,
        reactionType
    };

    state.reactions[id] = stateReaction;

    const reaction = getReactionFromStateReaction(stateReaction, joinDepth);

    return reaction;
}

export function getAllReactions(joinDepth: u32): Query<Reactions> {
    return Object
        .values(state.reactions)
        .map((stateReaction) => getReactionFromStateReaction(stateReaction, joinDepth));
}

export function getReactionFromStateReaction(
    stateReaction: StateReaction,
    joinDepth: u32
): Reaction {
    const stateAuthor = state.users[stateReaction.authorId];
    const author = getUserFromStateUser(stateAuthor, joinDepth);

    const statePost = state.posts[stateReaction.postId];
    const post = getPostFromStatePost(statePost, joinDepth);

    return {
        id: stateReaction.id,
        author,
        post,
        reactionType: stateReaction.reactionType
    };
}