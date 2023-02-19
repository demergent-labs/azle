import { nat32, $query, $update } from 'azle';
import { Thread } from './candid_types';
import { get_post_from_state_post } from './posts';
import { state, StateThread, StateUser } from './state';
import { get_user_from_state_user } from './users';

$update;
export function create_thread(
    title: string,
    author_id: string,
    join_depth: nat32
): Thread {
    const id = Object.keys(state.threads).length.toString();

    const state_thread: StateThread = {
        id,
        author_id,
        post_ids: [],
        title
    };
    const updated_state_author = get_updated_state_author(
        author_id,
        state_thread.id
    );

    state.threads[id] = state_thread;
    state.users[author_id] = updated_state_author;

    const thread = get_thread_from_state_thread(state_thread, join_depth);

    return thread;
}

$query;
export function get_all_threads(join_depth: nat32): Thread[] {
    return Object.values(state.threads).map((state_thread) =>
        get_thread_from_state_thread(state_thread, join_depth)
    );
}

export function get_thread_from_state_thread(
    state_thread: StateThread,
    join_depth: nat32
): Thread {
    const state_author = state.users[state_thread.author_id];
    const author = get_user_from_state_user(state_author, join_depth);

    if (join_depth === 0) {
        return {
            id: state_thread.id,
            author,
            posts: [],
            title: state_thread.title
        };
    } else {
        const posts = state_thread.post_ids
            .map((post_id) => state.posts[post_id])
            .map((state_post) =>
                get_post_from_state_post(state_post, join_depth - 1)
            );

        return {
            id: state_thread.id,
            author,
            posts,
            title: state_thread.title
        };
    }
}

function get_updated_state_author(
    author_id: string,
    thread_id: string
): StateUser {
    const state_author = state.users[author_id];
    const updated_state_author: StateUser = {
        ...state_author,
        thread_ids: [...state_author.thread_ids, thread_id]
    };

    return updated_state_author;
}
