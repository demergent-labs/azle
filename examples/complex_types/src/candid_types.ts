import { Record, Null, text, Variant, Vec, Recursive } from 'azle';

export const ReactionType = Variant({
    Fire: Null,
    ThumbsUp: Null,
    ThumbsDown: Null
});

export const User = Recursive(() =>
    Record({
        id: text,
        posts: Vec(Post),
        reactions: Vec(Reaction),
        threads: Vec(Thread),
        username: text
    })
);

export const Post = Recursive(() =>
    Record({
        id: text,
        author: User,
        reactions: Vec(Reaction),
        text: text,
        thread: Thread
    })
);

export const Thread = Record({
    id: text,
    author: User,
    posts: Vec(Post),
    title: text
});

export const Reaction = Record({
    id: text,
    author: User,
    post: Post,
    reactionType: ReactionType
});
