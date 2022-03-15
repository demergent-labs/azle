// TODO get rid of the need for the Candid type
// TODO get rid of the need for explicit array type aliases

// TODO it would be cool to add timestamps

import {
    Candid,
    Enum // TODO variant might be nicer here
} from 'azle';

export type Post = Candid<{
    id: string;
    author: User;
    text: string;
    thread: Thread;
}>;
export type Posts = Candid<Post[]>;

export type Reaction = Candid<{
    id: string;
    author: User;
    post: Post;
    reactionType: ReactionType;
}>;
export type Reactions = Candid<Reaction[]>;
export type ReactionType = Candid<Enum<{
    fire?: null,
    thumbsUp?: null,
    thumbsDown?: null
}>>;

export type Thread = Candid<{
    id: string;
    author: User;
    posts: Posts;
    title: string;
}>;
export type Threads = Candid<Thread[]>;

export type User = Candid<{
    id: string;
    posts: Posts;
    reactions: Reactions;
    threads: Threads;
    username: string;
}>;
export type Users = Candid<User[]>;