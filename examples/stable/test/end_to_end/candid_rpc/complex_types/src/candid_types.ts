import { IDL } from 'azle';

export const ReactionType = IDL.Variant({
    Fire: IDL.Null,
    ThumbsUp: IDL.Null,
    ThumbsDown: IDL.Null
});
export type ReactionType =
    | { Fire: null }
    | { ThumbsUp: null }
    | { ThumbsDown: null };

export const User = IDL.Rec();
export const Post = IDL.Rec();
export const Thread = IDL.Rec();
export const Reaction = IDL.Rec();

User.fill(
    IDL.Record({
        id: IDL.Text,
        posts: IDL.Vec(Post),
        reactions: IDL.Vec(Reaction),
        threads: IDL.Vec(Thread),
        username: IDL.Text
    })
);
export type User = {
    id: string;
    posts: Post[];
    reactions: Reaction[];
    threads: Thread[];
    username: string;
};

Post.fill(
    IDL.Record({
        id: IDL.Text,
        author: User,
        reactions: IDL.Vec(Reaction),
        text: IDL.Text,
        thread: Thread
    })
);
export type Post = {
    id: string;
    author: User;
    reactions: Reaction[];
    text: string;
    thread: Thread;
};

Thread.fill(
    IDL.Record({
        id: IDL.Text,
        author: User,
        posts: IDL.Vec(Post),
        title: IDL.Text
    })
);
export type Thread = {
    id: string;
    author: User;
    posts: Post[];
    title: string;
};

Reaction.fill(
    IDL.Record({
        id: IDL.Text,
        author: User,
        post: Post,
        reactionType: ReactionType
    })
);
export type Reaction = {
    id: string;
    author: User;
    post: Post;
    reactionType: ReactionType;
};
