import type { Principal } from '@dfinity/principal';
export interface Post {
    id: string;
    text: string;
    author: User;
    thread: Thread;
    reactions: Array<Reaction>;
}
export interface Reaction {
    id: string;
    post: Post;
    author: User;
    reactionType: ReactionType;
}
export type ReactionType =
    | { thumbsDown: null }
    | { fire: null }
    | { thumbsUp: null };
export interface Thread {
    id: string;
    title: string;
    author: User;
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
    createPost: (
        arg_0: string,
        arg_1: string,
        arg_2: string,
        arg_3: number
    ) => Promise<Post>;
    createReaction: (
        arg_0: string,
        arg_1: string,
        arg_2: ReactionType,
        arg_3: number
    ) => Promise<Reaction>;
    createThread: (
        arg_0: string,
        arg_1: string,
        arg_2: number
    ) => Promise<Thread>;
    createUser: (arg_0: string, arg_1: number) => Promise<User>;
    getAllPosts: (arg_0: number) => Promise<Array<Post>>;
    getAllReactions: (arg_0: number) => Promise<Array<Reaction>>;
    getAllThreads: (arg_0: number) => Promise<Array<Thread>>;
    getAllUsers: (arg_0: number) => Promise<Array<User>>;
}
