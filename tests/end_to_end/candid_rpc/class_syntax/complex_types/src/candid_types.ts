import { IDL, query, update } from 'azle';

export const ReactionType = Variant({
    Fire: Null,
    ThumbsUp: Null,
    ThumbsDown: Null
});
export type ReactionType = typeof ReactionType.tsType;

export const User = Recursive(() =>
    Record({
        id: IDL.Text,
        posts: IDL.Vec(Post),
        reactions: IDL.Vec(Reaction),
        threads: IDL.Vec(Thread),
        username: IDL.Text
    })
);
export type User = typeof User.tsType;

export const Post = Recursive(() =>
    Record({
        id: IDL.Text,
        author: User,
        reactions: IDL.Vec(Reaction),
        text: IDL.Text,
        thread: Thread
    })
);
export type Post = typeof Post.tsType;

export const Thread = Record({
    id: IDL.Text,
    author: User,
    posts: IDL.Vec(Post),
    title: IDL.Text
});
export type Thread = typeof Thread.tsType;

export const Reaction = Record({
    id: IDL.Text,
    author: User,
    post: Post,
    reactionType: ReactionType
});
export type Reaction = typeof Reaction.tsType;
