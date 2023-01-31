export { create_post, get_all_posts } from './posts';
export { create_reaction, get_all_reactions } from './reactions';
export { create_thread, get_all_threads } from './threads';
export { create_user, get_all_users } from './users';

// class API

import { nat32, query, update } from 'azle';
import { Post, Reaction, ReactionType, Thread, User } from './candid_types';
import { create_post, get_all_posts } from './posts';
import { create_reaction, get_all_reactions } from './reactions';
import { create_thread, get_all_threads } from './threads';
import { create_user, get_all_users } from './users';

export default class {
    @update
    create_post: (
        author_id: string,
        text: string,
        thread_id: string,
        join_depth: nat32
    ) => Post = create_post;

    @query
    get_all_posts: (join_depth: nat32) => Post[] = get_all_posts;

    @update
    create_reaction: (
        author_id: string,
        post_id: string,
        reaction_type: ReactionType,
        join_depth: nat32
    ) => Reaction = create_reaction;

    @query
    get_all_reactions: (join_depth: nat32) => Reaction[] = get_all_reactions;

    @update
    create_thread: (
        title: string,
        author_id: string,
        join_depth: nat32
    ) => Thread = create_thread;

    @query
    get_all_threads: (join_depth: nat32) => Thread[] = get_all_threads;

    @update
    create_user: (username: string, join_depth: nat32) => User = create_user;

    @query
    get_all_users: (join_depth: nat32) => User[] = get_all_users;
}
