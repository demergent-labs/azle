import { nat32, $query, $update } from 'azle';
import { Reaction, ReactionType } from './candid_types';
import { get_post_from_state_post } from './posts';
import { state, StatePost, StateReaction, StateUser } from './state';
import { get_user_from_state_user } from './users';

$update;
export function create_reaction(
    author_id: string,
    post_id: string,
    reaction_type: ReactionType,
    join_depth: nat32
): Reaction {
    const id = Object.keys(state.reactions).length.toString();

    const state_reaction: StateReaction = {
        id,
        author_id,
        post_id,
        reaction_type
    };
    const updated_state_author = get_updated_state_author(
        author_id,
        state_reaction.id
    );
    const updated_state_post = get_updated_state_post(
        post_id,
        state_reaction.id
    );

    state.reactions[id] = state_reaction;
    state.users[author_id] = updated_state_author;
    state.posts[post_id] = updated_state_post;

    const reaction = get_reaction_from_state_reaction(
        state_reaction,
        join_depth
    );

    return reaction;
}

$query;
export function get_all_reactions(join_depth: nat32): Reaction[] {
    return Object.values(state.reactions).map((state_reaction) =>
        get_reaction_from_state_reaction(state_reaction, join_depth)
    );
}

export function get_reaction_from_state_reaction(
    state_reaction: StateReaction,
    join_depth: nat32
): Reaction {
    const state_author = state.users[state_reaction.author_id];
    const author = get_user_from_state_user(state_author, join_depth);

    const state_post = state.posts[state_reaction.post_id];
    const post = get_post_from_state_post(state_post, join_depth);

    return {
        id: state_reaction.id,
        author,
        post,
        reaction_type: state_reaction.reaction_type
    };
}

function get_updated_state_author(
    author_id: string,
    reaction_id: string
): StateUser {
    const state_author = state.users[author_id];
    const updated_state_author: StateUser = {
        ...state_author,
        reaction_ids: [...state_author.reaction_ids, reaction_id]
    };

    return updated_state_author;
}

function get_updated_state_post(
    post_id: string,
    reaction_id: string
): StatePost {
    const state_post = state.posts[post_id];
    const updated_state_post: StatePost = {
        ...state_post,
        reaction_ids: [...state_post.reaction_ids, reaction_id]
    };

    return updated_state_post;
}
