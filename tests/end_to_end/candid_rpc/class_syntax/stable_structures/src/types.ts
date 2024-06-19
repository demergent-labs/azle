import { Func, Null, Record, text, Variant, Vec } from 'azle';

export const BlogPost = Record({
    title: text
});
export type BlogPost = typeof BlogPost.tsType;

export const Reaction = Variant({
    Happy: Null,
    Sad: Null
});
export type Reaction = typeof Reaction.tsType;

export const User = Record({
    username: text,
    posts: Vec(BlogPost)
});
export type User = typeof User.tsType;

export const Callback = Func([BlogPost], Reaction, 'update');
export type Callback = typeof Callback.tsType;
