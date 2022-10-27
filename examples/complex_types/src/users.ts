import { nat32, Query, Update } from 'azle';
import { User } from './candid_types';
import { get_post_from_state_post } from './posts';
import { get_reaction_from_state_reaction } from './reactions';
import { state, StateUser } from './state';
import { get_thread_from_state_thread } from './threads';

export function create_user(username: string, join_depth: nat32): Update<User> {
    const id = Object.keys(state.users).length.toString();

    const state_user = {
        id,
        post_ids: [],
        reaction_ids: [],
        thread_ids: [],
        username
    };

    state.users[id] = state_user;

    const user = get_user_from_state_user(state_user, join_depth);

    return user;
}

export function get_all_users(join_depth: nat32): Query<User[]> {
    return Object.values(state.users).map((state_user) =>
        get_user_from_state_user(state_user, join_depth)
    );
}

export function get_user_from_state_user(
    state_user: StateUser,
    join_depth: nat32
): User {
    if (join_depth === 0) {
        return {
            id: state_user.id,
            posts: [],
            reactions: [],
            threads: [],
            username: state_user.username
        };
    } else {
        const posts = state_user.post_ids
            .map((post_id) => state.posts[post_id])
            .map((state_post) =>
                get_post_from_state_post(state_post, join_depth - 1)
            );

        const reactions = state_user.reaction_ids
            .map((reaction_id) => state.reactions[reaction_id])
            .map((state_reaction) =>
                get_reaction_from_state_reaction(state_reaction, join_depth - 1)
            );

        const threads = state_user.thread_ids
            .map((thread_id) => state.threads[thread_id])
            .map((state_thread) =>
                get_thread_from_state_thread(state_thread, join_depth - 1)
            );

        return {
            id: state_user.id,
            posts,
            reactions,
            threads,
            username: state_user.username
        };
    }
}
