// TODO it would be cool to add timestamps

import { Variant } from 'azle';

export type Post = {
    id: string;
    author: User;
    reactions: Reaction[];
    text: string;
    thread: Thread;
};

export type Reaction = {
    id: string;
    author: User;
    post: Post;
    reactionType: ReactionType;
};

export type ReactionType = Variant<{
    fire?: null;
    thumbsUp?: null;
    thumbsDown?: null;
}>;

export type Thread = {
    id: string;
    author: User;
    posts: Post[];
    title: string;
};

export type User = {
    id: string;
    posts: Post[];
    reactions: Reaction[];
    threads: Thread[];
    username: string;
};
