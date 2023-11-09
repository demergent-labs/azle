import { Record, Null, text, Variant, Vec, Recursive } from 'azle';

export const ReactionType = Variant({
    Fire: Null,
    ThumbsUp: Null,
    ThumbsDown: Null
});
export type ReactionType = typeof ReactionType.tsType;

export const User = Recursive(() =>
    Record({
        id: text,
        posts: Vec(Post),
        reactions: Vec(Reaction),
        threads: Vec(Thread),
        username: text
    })
);
export type User = typeof User.tsType;

export const Post = Recursive(() =>
    Record({
        id: text,
        author: User,
        reactions: Vec(Reaction),
        text: text,
        thread: Thread
    })
);
export type Post = typeof Post.tsType;

export const Thread = Record({
    id: text,
    author: User,
    posts: Vec(Post),
    title: text
});
export type Thread = typeof Thread.tsType;

export const Reaction = Record({
    id: text,
    author: User,
    post: Post,
    reactionType: ReactionType
});
export type Reaction = typeof Reaction.tsType;
