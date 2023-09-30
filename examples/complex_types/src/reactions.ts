import { nat32, query, text, update, Vec } from 'azle';
import { Reaction, ReactionType } from './candid_types';
import { getPostFromStatePost } from './posts';
import { state, StatePost, StateReaction, StateUser } from './state';
import { getUserFromStateUser } from './users';

export const createReaction = update(
    [text, text, ReactionType, nat32],
    Reaction,
    (authorId, postId, reactionType, joinDepth) => {
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
);

export const getAllReactions = query([nat32], Vec(Reaction), (joinDepth) => {
    return Object.values(state.reactions).map((stateReaction) =>
        getReactionFromStateReaction(stateReaction, joinDepth)
    );
});

export function getReactionFromStateReaction(
    stateReaction: StateReaction,
    joinDepth: nat32
): typeof Reaction {
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

function getUpdatedStateAuthor(
    authorId: string,
    reactionId: string
): StateUser {
    const stateAuthor = state.users[authorId];
    const updatedStateAuthor: StateUser = {
        ...stateAuthor,
        reactionIds: [...stateAuthor.reactionIds, reactionId]
    };

    return updatedStateAuthor;
}

function getUpdatedStatePost(postId: string, reactionId: string): StatePost {
    const statePost = state.posts[postId];
    const updatedStatePost: StatePost = {
        ...statePost,
        reactionIds: [...statePost.reactionIds, reactionId]
    };

    return updatedStatePost;
}
