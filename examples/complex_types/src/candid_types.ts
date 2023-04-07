// TODO it would be cool to add timestamps

import { Record, Variant, Vec } from 'azle';

export type Post = Record<{
    id: string;
    author: User;
    reactions: Vec<Reaction>;
    text: string;
    thread: Thread;
}>;

export type Reaction = Record<{
    id: string;
    author: User;
    post: Post;
    reactionType: ReactionType;
}>;

export type ReactionType = Variant<{
    Fire: null;
    ThumbsUp: null;
    ThumbsDown: null;
}>;

export type Thread = Record<{
    id: string;
    author: User;
    posts: Vec<Post>;
    title: string;
}>;

export type User = Record<{
    id: string;
    posts: Vec<Post>;
    reactions: Vec<Reaction>;
    threads: Vec<Thread>;
    username: string;
}>;
