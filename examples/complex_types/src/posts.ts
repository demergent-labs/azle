import { nat32, $query, $update } from 'azle';
import { Post } from './candid_types';
import { get_reaction_from_state_reaction } from './reactions';
import { state, StatePost, StateThread, StateUser } from './state';
import { get_thread_from_state_thread } from './threads';
import { get_user_from_state_user } from './users';

$update;
export function create_post(
    author_id: string,
    text: string,
    thread_id: string,
    join_depth: nat32
): Post {
    const id = Object.keys(state.posts).length.toString();

    const state_post: StatePost = {
        id,
        author_id,
        reaction_ids: [],
        text,
        thread_id
    };
    const updated_state_author = get_updated_state_author(
        author_id,
        state_post.id
    );
    const updated_state_thread = get_updated_state_thread(
        thread_id,
        state_post.id
    );

    state.posts[id] = state_post;
    state.users[author_id] = updated_state_author;
    state.threads[thread_id] = updated_state_thread;

    const post = get_post_from_state_post(state_post, join_depth);

    return post;
}

$query;
export function get_all_posts(join_depth: nat32): Post[] {
    return Object.values(state.posts).map((state_post) =>
        get_post_from_state_post(state_post, join_depth)
    );
}

export function get_post_from_state_post(
    state_post: StatePost,
    join_depth: nat32
): Post {
    const state_author = state.users[state_post.author_id];
    const author = get_user_from_state_user(state_author, join_depth);

    const state_thread = state.threads[state_post.thread_id];
    const thread = get_thread_from_state_thread(state_thread, join_depth);

    if (join_depth === 0) {
        return {
            id: state_post.id,
            author,
            reactions: [],
            text: state_post.text,
            thread
        };
    } else {
        const reactions = state_post.reaction_ids
            .map((reaction_id) => state.reactions[reaction_id])
            .map((state_reaction) =>
                get_reaction_from_state_reaction(state_reaction, join_depth - 1)
            );

        return {
            id: state_post.id,
            author,
            reactions,
            text: state_post.text,
            thread
        };
    }
}

function get_updated_state_author(
    author_id: string,
    post_id: string
): StateUser {
    const state_author = state.users[author_id];
    const updated_state_author: StateUser = {
        ...state_author,
        post_ids: [...state_author.post_ids, post_id]
    };

    return updated_state_author;
}

function get_updated_state_thread(
    thread_id: string,
    post_id: string
): StateThread {
    const state_thread = state.threads[thread_id];
    const updated_state_thread: StateThread = {
        ...state_thread,
        post_ids: [...state_thread.post_ids, post_id]
    };

    return updated_state_thread;
}
