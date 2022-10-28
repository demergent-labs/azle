import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Box {
    id: string;
    username: string;
    threads: Array<{
        id: string;
        title: string;
        author: Box;
        posts: Array<Post>;
    }>;
    posts: Array<Post>;
    reactions: Array<{
        id: string;
        reaction_type:
            | { Fire: null }
            | { ThumbsDown: null }
            | { ThumbsUp: null };
        post: Post;
        author: Box;
    }>;
}
export interface Post {
    id: string;
    text: string;
    author: {
        id: string;
        username: string;
        threads: Array<{
            id: string;
            title: string;
            author: Box;
            posts: Array<Post>;
        }>;
        posts: Array<Post>;
        reactions: Array<{
            id: string;
            reaction_type:
                | { Fire: null }
                | { ThumbsDown: null }
                | { ThumbsUp: null };
            post: Post;
            author: Box;
        }>;
    };
    thread: {
        id: string;
        title: string;
        author: Box;
        posts: Array<Post>;
    };
    reactions: Array<{
        id: string;
        reaction_type:
            | { Fire: null }
            | { ThumbsDown: null }
            | { ThumbsUp: null };
        post: Post;
        author: Box;
    }>;
}
export interface Reaction {
    id: string;
    reaction_type: ReactionType;
    post: Post;
    author: Box;
}
export type ReactionType =
    | { Fire: null }
    | { ThumbsDown: null }
    | { ThumbsUp: null };
export interface Thread {
    id: string;
    title: string;
    author: Box;
    posts: Array<Post>;
}
export interface User {
    id: string;
    username: string;
    threads: Array<Thread>;
    posts: Array<Post>;
    reactions: Array<Reaction>;
}
export interface _SERVICE {
    create_post: ActorMethod<[string, string, string, number], Post>;
    create_reaction: ActorMethod<
        [string, string, ReactionType, number],
        Reaction
    >;
    create_thread: ActorMethod<[string, string, number], Thread>;
    create_user: ActorMethod<[string, number], User>;
    get_all_posts: ActorMethod<[number], Array<Post>>;
    get_all_reactions: ActorMethod<[number], Array<Reaction>>;
    get_all_threads: ActorMethod<[number], Array<Thread>>;
    get_all_users: ActorMethod<[number], Array<User>>;
}
